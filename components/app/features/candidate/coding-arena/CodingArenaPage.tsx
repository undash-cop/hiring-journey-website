import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCodingChallenge,
  getCodingChallenges,
  recordCodingAttempt,
  submitCodingSolution,
} from '../../../services/api';
import { Card, Button, Badge, Select, Modal } from '../../../components/ui';
import { useToast } from '../../../contexts/ToastContext';
import { queryKeys } from '@/lib/query-keys';
import { analytics } from '@/lib/analytics';
import type { CodingChallenge, CodingChallengeDetail, CodingSubmitResult } from '../../../types';

function ChallengeWorkspace({
  challenge,
  onClose,
}: {
  challenge: CodingChallengeDetail;
  onClose: () => void;
}) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [code, setCode] = useState(challenge.starterCode ?? '');
  const [submitResult, setSubmitResult] = useState<CodingSubmitResult | null>(null);

  const submitMutation = useMutation({
    mutationFn: (solution: string) => submitCodingSolution(challenge.id, solution),
    onSuccess: (result) => {
      setSubmitResult(result);
      void queryClient.invalidateQueries({ queryKey: queryKeys.codingChallenges });
      if (result.solved) {
        analytics.codingChallengeSolved(challenge.id);
        showToast('All tests passed — challenge solved!', 'success');
      } else {
        showToast(`${result.passed}/${result.total} tests passed. Keep refining your solution.`, 'info');
      }
    },
    onError: () => {
      showToast('Failed to run your solution. Please try again.', 'error');
    },
  });

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={challenge.title}
      size="xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => submitMutation.mutate(code)}
            isLoading={submitMutation.isPending}
            disabled={!code.trim()}
          >
            Run & Submit
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
          {challenge.description}
        </p>
        {challenge.functionName && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Implement <code className="font-mono">{challenge.functionName}(...)</code> in Python.
          </p>
        )}
        <div>
          <label htmlFor="coding-solution" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your solution
          </label>
          <textarea
            id="coding-solution"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            spellCheck={false}
            className="w-full font-mono text-xs px-3 py-2 bg-gray-950 text-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        {submitResult && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {submitResult.passed}/{submitResult.total} tests passed
              {submitResult.solved ? ' — solved!' : ''}
            </p>
            {submitResult.error && (
              <p className="text-xs text-red-600 dark:text-red-400">{submitResult.error}</p>
            )}
            <ul className="space-y-1">
              {submitResult.results.map((result) => (
                <li
                  key={result.case}
                  className={`text-xs rounded px-2 py-1 ${
                    result.pass
                      ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                      : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                  }`}
                >
                  Case {result.case}: {result.pass ? 'Pass' : 'Fail'}
                  {!result.pass && result.error && ` — ${result.error}`}
                  {!result.pass && !result.error && result.expected !== undefined && (
                    <> — expected {JSON.stringify(result.expected)}, got {JSON.stringify(result.actual)}</>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default function CodingArenaPage() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [difficulty, setDifficulty] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [activeChallengeId, setActiveChallengeId] = useState<number | null>(null);

  const { data: challenges, isLoading } = useQuery({
    queryKey: queryKeys.codingChallenges,
    queryFn: getCodingChallenges,
  });

  const { data: activeChallenge } = useQuery({
    queryKey: [...queryKeys.codingChallenges, 'detail', activeChallengeId],
    queryFn: () => getCodingChallenge(activeChallengeId!),
    enabled: activeChallengeId !== null,
  });

  const attemptMutation = useMutation({
    mutationFn: (challengeId: number) => recordCodingAttempt(challengeId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.codingChallenges });
      showToast('Attempt recorded — keep practicing!', 'success');
    },
    onError: () => {
      showToast('Failed to record attempt. Please try again.', 'error');
    },
  });

  const filteredChallenges = challenges?.filter((challenge: CodingChallenge) => {
    if (difficulty !== 'all' && challenge.difficulty !== difficulty) return false;
    if (category !== 'all' && challenge.category !== category) return false;
    return true;
  });

  const handleStartChallenge = (challenge: CodingChallenge) => {
    if (challenge.executable) {
      setActiveChallengeId(challenge.id);
      return;
    }
    attemptMutation.mutate(challenge.id);
  };

  const closeWorkspace = () => {
    setActiveChallengeId(null);
  };

  if (isLoading) {
    return <div className="p-4 sm:p-6">Loading...</div>;
  }

  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger',
  } as const;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Coding Arena</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Practice coding challenges and prepare for technical interviews</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          options={[
            { value: 'all', label: 'All Difficulties' },
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' },
          ]}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'arrays', label: 'Arrays' },
            { value: 'strings', label: 'Strings' },
            { value: 'algorithms', label: 'Algorithms' },
            { value: 'data-structures', label: 'Data Structures' },
            { value: 'system-design', label: 'System Design' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges?.map((challenge: CodingChallenge) => (
          <Card key={challenge.id} className="hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {challenge.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant={difficultyColors[challenge.difficulty]}>
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="info">{challenge.category}</Badge>
                  {challenge.executable && (
                    <Badge variant="default">Runnable</Badge>
                  )}
                  {challenge.solved && (
                    <Badge variant="success">Solved</Badge>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {challenge.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {challenge.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                size="sm"
                onClick={() => handleStartChallenge(challenge)}
                isLoading={attemptMutation.isPending && !challenge.executable}
              >
                {challenge.executable ? 'Open Workspace' : 'Start Challenge'}
              </Button>
            </div>
            {challenge.attempts > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Attempts: {challenge.attempts}
              </p>
            )}
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Progress Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {challenges?.filter((c: CodingChallenge) => c.solved).length || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Solved</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {challenges?.length || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Challenges</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {challenges?.reduce((acc: number, c: CodingChallenge) => acc + c.attempts, 0) || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Attempts</p>
          </div>
        </div>
      </Card>

      {activeChallenge && (
        <ChallengeWorkspace
          key={`${activeChallenge.id}-${activeChallenge.starterCode ?? ''}`}
          challenge={activeChallenge}
          onClose={closeWorkspace}
        />
      )}
    </div>
  );
}
