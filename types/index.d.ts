declare type UserType = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  role: string;
  isPro: boolean;
  stripeConnectId: string;
  credits: number;
  createdAt: string;
};

declare type FormDataType = {
  jobTitle: string;
  industry: string;
  jobDescription: string;
  skills: string;
  experienceLevel: string;
  keyCompetencies: string;
  education: string;
};

declare type InterviewType = {
  id: string;
  interviewId: string;
  userId: string;
  createdBy: string;
  jobTitle: string;
  industry: string;
  jobDescription: string;
  skills: string;
  experienceLevel: string;
  keyCompetencies: string;
  education: string;
  interviewData: InterviewData;
  createdAt: string;
};

declare type InterviewData = {
  jobTitle: string;
  industry: string;
  jobDescription: string;
  skills: string;
  experienceLevel: string;
  keyCompetencies: string;
  education: string;
  questionsList: [
    {
      question: string;
      answer: string;
      explanation: string;
      options: string[];
    }
  ];
};

declare type QuestionListType = {
  question: string;
  answer: string;
  explanation: string;
  options: string[];
};
