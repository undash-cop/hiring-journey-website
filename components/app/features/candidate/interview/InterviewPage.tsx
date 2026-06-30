import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInterviewQuestions,
  getInterviewSessions,
  submitInterviewFeedback,
  createInterviewSession,
} from '../../../services/api';
import { Card, Button, Select, Badge, LoadingCard } from '../../../components/ui';
import { PageEmptyState, PageErrorState } from '../../../components/QueryStateViews';
import { useToast } from '../../../contexts/ToastContext';
import { queryKeys } from '@/lib/query-keys';
import { analytics } from '@/lib/analytics';

type FeedbackState = {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
};

export default function InterviewPage() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [type, setType] = useState<'hr' | 'technical'>('hr');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sessionScores, setSessionScores] = useState<number[]>([]);

  const {
    data: questions = [],
    isLoading: questionsLoading,
    isError: questionsError,
    error: questionsErrorObj,
  } = useQuery({
    queryKey: [...queryKeys.interviewQuestions, type],
    queryFn: () => getInterviewQuestions(type),
  });

  const {
    data: sessionsData,
    isLoading: sessionsLoading,
    isError: sessionsError,
  } = useQuery({
    queryKey: queryKeys.interviewSessions,
    queryFn: getInterviewSessions,
  });

  const feedbackMutation = useMutation({
    mutationFn: submitInterviewFeedback,
    onSuccess: (result) => {
      analytics.mockInterviewFeedback(type, result.score);
      setFeedback(result);
      setSessionScores((prev) => [...prev, result.score]);
    },
    onError: (err: unknown) => {
      const status =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { status?: number } }).response?.status
          : undefined;
      showToast(
        status === 402
          ? 'Not enough credits for interview prep. Visit Credits to review your balance.'
          : 'Failed to get feedback. Please try again.',
        'error',
      );
    },
  });

  const saveSessionMutation = useMutation({
    mutationFn: createInterviewSession,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.interviewSessions });
      void queryClient.invalidateQueries({ queryKey: queryKeys.creditUsage });
    },
  });

  const handleSubmit = () => {
    if (!answer.trim()) {
      showToast('Please enter an answer before submitting', 'error');
      return;
    }
    feedbackMutation.mutate({
      interviewType: type,
      question: questions[currentQuestion] ?? '',
      answer,
    });
  };

  const finishSession = async (scores: number[]) => {
    if (scores.length === 0) return;
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    await saveSessionMutation.mutateAsync({
      interviewType: type,
      score: averageScore,
      questionsAnswered: scores.length,
    });
    showToast('Interview session saved!', 'success');
    setSessionStarted(false);
    setCurrentQuestion(0);
    setAnswer('');
    setFeedback(null);
    setSessionScores([]);
  };

  if (questionsLoading || sessionsLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Interview Prep</h1>
          <p className="section-subtitle">Practice with AI-powered interview questions</p>
        </div>
        <LoadingCard />
      </div>
    );
  }

  if (questionsError || sessionsError) {
    return (
      <PageErrorState
        title="Failed to load interview prep"
        message={
          questionsErrorObj instanceof Error
            ? questionsErrorObj.message
            : 'Please try again later'
        }
        onRetry={() => {
          void queryClient.invalidateQueries({ queryKey: queryKeys.interviewQuestions });
          void queryClient.invalidateQueries({ queryKey: queryKeys.interviewSessions });
        }}
      />
    );
  }

  const sessionHistory = sessionsData?.items ?? [];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="section-title">Interview Prep</h1>
        <p className="section-subtitle">Practice with AI-powered interview questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <Select
                label="Interview Type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value as 'hr' | 'technical');
                  setCurrentQuestion(0);
                  setAnswer('');
                  setFeedback(null);
                  setSessionStarted(false);
                  setSessionScores([]);
                }}
                options={[
                  { value: 'hr', label: 'HR Interview' },
                  { value: 'technical', label: 'Technical Interview' },
                ]}
              />
              <Button variant="outline" onClick={() => setShowHistory(!showHistory)}>
                {showHistory ? 'Hide' : 'Show'} History
              </Button>
            </div>
            {!sessionStarted ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start a mock interview session to practice {type === 'hr' ? 'HR' : 'Technical'} questions
                </p>
                <Button
                  onClick={() => {
                    analytics.mockInterviewStart(type);
                    setSessionStarted(true);
                  }}
                  disabled={questions.length === 0}
                >
                  Start Mock Interview Session
                </Button>
              </div>
            ) : questions.length === 0 ? (
              <PageEmptyState
                title="No questions available"
                description="Try switching interview type or try again later."
              />
            ) : (
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Question {currentQuestion + 1} of {questions.length}
                    </h2>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-lg text-gray-900 dark:text-gray-100 mb-4">
                    {questions[currentQuestion]}
                  </p>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {feedback && (
                  <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                        AI Feedback
                      </span>
                      <Badge variant="info">Score: {feedback.score}/100</Badge>
                    </div>
                    <p className="text-sm text-primary-800 dark:text-primary-200 mb-3">
                      {feedback.feedback}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      <div>
                        <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">
                          Strengths:
                        </p>
                        <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300">
                          {feedback.strengths.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">
                          Improvements:
                        </p>
                        <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300">
                          {feedback.improvements.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1);
                        setAnswer('');
                        setFeedback(null);
                      }
                    }}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  {currentQuestion < questions.length - 1 ? (
                    <Button
                      onClick={() => {
                        if (!feedback) {
                          handleSubmit();
                          return;
                        }
                        setCurrentQuestion(currentQuestion + 1);
                        setAnswer('');
                        setFeedback(null);
                      }}
                      isLoading={feedbackMutation.isPending}
                      className="flex-1"
                    >
                      {feedback ? 'Next Question' : 'Submit & Next'}
                    </Button>
                  ) : (
                    <Button
                      onClick={async () => {
                        if (!feedback) {
                          handleSubmit();
                          return;
                        }
                        const scores = sessionScores;
                        await finishSession(scores);
                      }}
                      isLoading={feedbackMutation.isPending || saveSessionMutation.isPending}
                      className="flex-1"
                    >
                      {feedback ? 'Finish Session' : 'Submit Answer'}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Practice Stats</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {sessionsData?.totalSessions ?? 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {sessionsData?.averageScore ?? 0}
                </p>
              </div>
            </div>
          </Card>

          {showHistory && (
            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Session History</h3>
              {sessionHistory.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">No sessions yet.</p>
              ) : (
                <div className="space-y-3">
                  {sessionHistory.map((session) => (
                    <div
                      key={session.id}
                      className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant={session.type === 'hr' ? 'info' : 'warning'}>
                          {session.type === 'hr' ? 'HR' : 'Technical'}
                        </Badge>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {session.score}/100
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {session.questionsAnswered} questions •{' '}
                        {new Date(session.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
