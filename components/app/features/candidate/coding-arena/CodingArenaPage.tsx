import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCodingChallenges } from '../../../services/api';
import { Card, Button, Badge, Select } from '../../../components/ui';
import type { CodingChallenge } from '../../../types';

export default function CodingArenaPage() {
  const [difficulty, setDifficulty] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');

  const { data: challenges, isLoading } = useQuery({
    queryKey: ['coding-challenges'],
    queryFn: getCodingChallenges,
  });

  const filteredChallenges = challenges?.filter((challenge: CodingChallenge) => {
    if (difficulty !== 'all' && challenge.difficulty !== difficulty) return false;
    if (category !== 'all' && challenge.category !== category) return false;
    return true;
  });

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
              <Button size="sm">Start Challenge</Button>
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
    </div>
  );
}
