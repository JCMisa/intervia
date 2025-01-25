import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.85,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

export const chatSession = model.startChat({
  generationConfig,
  safetySettings,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Job title: Software Engineer, \nIndustry: Information Technology, \nJob description: Responsible for designing, developing, and maintaining software applications. Collaborates with cross-functional teams to deliver high-quality solutions. Participates in code reviews and ensures adherence to best practices.\nSkills: Proficiency in JavaScript, Python, and C++. Experience with React.js and Node.js. Strong problem-solving skills and familiarity with Agile methodologies.\nExperience level: midLevel\nKey competencies: Software development, debugging, teamwork, communication, and project management.\nEducational Background: Bachelor’s Degree in Computer Science or related field.\n\nbased on those information, I want you to generate a json with properties named jobTitle, industry, jobDescription, skills, experienceLevel, keyCompetencies, education, and questionsList which is an array of 5 objects in which each object has properties named question, answer, options which is an array of strings, and explanation which is the explanation to the correct answer.\n\nMake the response in a JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "jobTitle": "Software Engineer",\n  "industry": "Information Technology",\n  "jobDescription": "Responsible for designing, developing, and maintaining software applications. Collaborates with cross-functional teams to deliver high-quality solutions. Participates in code reviews and ensures adherence to best practices.",\n  "skills": "Proficiency in JavaScript, Python, and C++. Experience with React.js and Node.js. Strong problem-solving skills and familiarity with Agile methodologies.",\n  "experienceLevel": "midLevel",\n  "keyCompetencies": "Software development, debugging, teamwork, communication, and project management",\n  "education": "Bachelor’s Degree in Computer Science or related field",\n  "questionsList": [\n    {\n      "question": "What is the primary difference between Node.js and React.js?",\n      "answer": "Node.js is a server-side JavaScript runtime environment, while React.js is a JavaScript library for building user interfaces.",\n      "options": [\n        "Node.js is a frontend framework, and React.js is a backend framework.",\n        "Node.js is a server-side JavaScript runtime environment, while React.js is a JavaScript library for building user interfaces.",\n        "They are both frontend frameworks with similar functionalities.",\n        "Node.js is used for databases, while React.js is used for styling."\n      ],\n      "explanation": "Node.js allows you to run JavaScript on the server, handling backend logic and database interactions. React.js focuses on building interactive and dynamic user interfaces for web applications."\n    },\n    {\n      "question": "Explain the concept of Agile methodologies in software development.",\n      "answer": "Agile methodologies are iterative and incremental approaches that emphasize flexibility, collaboration, and customer feedback throughout the development process.",\n      "options": [\n        "Agile methodologies are rigid and follow a strict waterfall approach.",\n        "Agile methodologies are iterative and incremental approaches that emphasize flexibility, collaboration, and customer feedback throughout the development process.",\n        "Agile methodologies are primarily used for large, long-term projects.",\n        "Agile methodologies do not require frequent communication between developers and clients."\n      ],\n      "explanation": "Agile promotes short development cycles (sprints), frequent communication, and adaptation to changing requirements.  Examples include Scrum and Kanban."\n    },\n    {\n      "question": "Describe a situation where you had to debug a complex software issue. What steps did you take to resolve it?",\n      "answer": "In a previous project, our application experienced intermittent crashes. I systematically used logging and debugging tools to identify the source of the error. I also utilized code review to find the root cause.",\n      "options": [\n        "I ignored the issue, hoping it would resolve itself.",\n        "I blamed a colleague.",\n        "I systematically used logging and debugging tools to identify the source of the error. I also utilized code review to find the root cause.",\n        "I rewrote the entire application."\n      ],\n      "explanation": "This answer demonstrates problem-solving skills and a methodical approach to debugging.  Effective debugging requires systematic investigation and the use of appropriate tools."\n    },\n    {\n      "question": "How do you ensure code quality in your projects?",\n      "answer": "I utilize code reviews, automated testing (unit and integration), and adhere to coding style guides to ensure code quality and maintainability.",\n      "options": [\n        "I rely solely on automated testing.",\n        "I don\'t worry about code quality; it\'s the client\'s responsibility.",\n        "I utilize code reviews, automated testing (unit and integration), and adhere to coding style guides to ensure code quality and maintainability.",\n        "I only test my code manually."\n      ],\n      "explanation": "This showcases understanding of best practices for maintaining code quality.  Combination of automated and manual methods is ideal."\n    },\n    {\n      "question": "What is your experience with version control systems like Git?",\n      "answer": "I have extensive experience with Git, including branching, merging, resolving conflicts, and using platforms like GitHub or GitLab.",\n      "options": [\n        "I have never used version control.",\n        "I have some basic experience with Git.",\n        "I have extensive experience with Git, including branching, merging, resolving conflicts, and using platforms like GitHub or GitLab.",\n        "I prefer to use a different version control system."\n      ],\n      "explanation": "Git is a standard in software development; demonstrating proficiency is crucial.  The answer highlights key aspects of Git usage."\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});
