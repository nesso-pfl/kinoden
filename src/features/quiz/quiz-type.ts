export const quizTypes = ["normal", "endless", "checked-only"] as const;

export type QuizType = (typeof quizTypes)[number];
