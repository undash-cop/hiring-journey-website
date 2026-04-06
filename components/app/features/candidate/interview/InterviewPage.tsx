import { useState } from 'react';
import { Card, Button, Select, Badge } from '../../../components/ui';

const mockQuestions = {
  hr: [
    'Tell me about yourself.',
    'Why do you want to work here?',
    'What are your strengths and weaknesses?',
    'Where do you see yourself in 5 years?',
    'How do you handle stress and pressure?',
    'Describe a challenging situation you faced at work.',
  ],
  technical: [
    'Explain how React hooks work.',
    'What is the difference between let, const, and var?',
    'How would you optimize a slow database query?',
    'Explain the difference between REST and GraphQL.',
    'How does JavaScript event loop work?',
    'Explain the concept of closures in JavaScript.',
  ],
};

const mockFeedback = {
  score: 85,
  feedback: 'Great answer! You demonstrated strong technical knowledge. Consider providing more specific examples.',
  strengths: ['Clear explanation', 'Good technical depth'],
  improvements: ['Add more examples', 'Explain edge cases'],
};

const mockSessionHistory = [
  { id: 1, type: 'hr', score: 88, date: '2024-02-10', questionsAnswered: 6 },
  { id: 2, type: 'technical', score: 82, date: '2024-02-08', questionsAnswered: 5 },
  { id: 3, type: 'hr', score: 90, date: '2024-02-05', questionsAnswered: 6 },
];

export default function InterviewPage() {
  const [type, setType] = useState<'hr' | 'technical'>('hr');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const questions = mockQuestions[type];

  const handleSubmit = () => {
    setShowFeedback(true);
  };

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
                  setShowFeedback(false);
                  setSessionStarted(false);
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
                <Button onClick={() => setSessionStarted(true)}>
                  Start Mock Interview Session
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Question {currentQuestion + 1} of {questions.length}</h2>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-lg text-gray-900 dark:text-gray-100 mb-4">{questions[currentQuestion]}</p>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {showFeedback && (
                  <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-semibold text-primary-900 dark:text-primary-100">AI Feedback</span>
                      <Badge variant="info">Score: {mockFeedback.score}/100</Badge>
                    </div>
                    <p className="text-sm text-primary-800 dark:text-primary-200 mb-3">{mockFeedback.feedback}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      <div>
                        <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Strengths:</p>
                        <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300">
                          {mockFeedback.strengths.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">Improvements:</p>
                        <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300">
                          {mockFeedback.improvements.map((i, idx) => (
                            <li key={idx}>{i}</li>
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
                        setShowFeedback(false);
                      }
                    }}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  {currentQuestion < questions.length - 1 ? (
                    <Button
                      onClick={() => {
                        handleSubmit();
                        setTimeout(() => {
                          setCurrentQuestion(currentQuestion + 1);
                          setAnswer('');
                          setShowFeedback(false);
                        }, 2000);
                      }}
                      className="flex-1"
                    >
                      Submit & Next
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="flex-1">
                      Submit Answer
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
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{mockSessionHistory.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.round(mockSessionHistory.reduce((acc, s) => acc + s.score, 0) / mockSessionHistory.length)}
                </p>
              </div>
            </div>
          </Card>

          {showHistory && (
            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Session History</h3>
              <div className="space-y-3">
                {mockSessionHistory.map((session) => (
                  <div key={session.id} className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant={session.type === 'hr' ? 'info' : 'warning'}>
                        {session.type === 'hr' ? 'HR' : 'Technical'}
                      </Badge>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{session.score}/100</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {session.questionsAnswered} questions • {new Date(session.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
