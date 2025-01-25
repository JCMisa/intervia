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
