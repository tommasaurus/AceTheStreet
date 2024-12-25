export interface Question {
  id: number;
  type: string;
  question: string;
  answer: string;
  completed: boolean;
  bookmarked: boolean;
}

export interface BankContent {
  bank: string;
  questions: Question[];
}

export interface CategoryContent {
  category: string;
  questions: Question[];
}

export type Content = BankContent | CategoryContent;

export type QuestionsData = {
  banks: {
    [key: string]: BankContent;
  };
  "m-and-i": {
    [key: string]: CategoryContent;
  };
};
