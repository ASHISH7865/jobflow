import { BoardData, Priority } from './types';

const mockContact = {
  name: 'Jane Smith',
  email: 'jane.smith@company.com',
  role: 'Technical Recruiter',
};

const createMockJob = (
  id: string,
  companyName: string,
  positionTitle: string,
  priority: Priority = 'medium'
) => ({
  id,
  companyName,
  positionTitle,
  status: 'new',
  priority,
  location: 'Remote',
  interviews: [],
  tasks: [],
  documents: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  recruiter: mockContact,
});

export const initialBoardData: BoardData = {
  columns: [
    {
      id: 'saved',
      name: 'Saved Jobs',
      items: [
        createMockJob('1', 'Google', 'Senior Frontend Developer', 'high'),
        createMockJob('2', 'Amazon', 'Full Stack Engineer', 'medium'),
      ],
    },
    {
      id: 'applied',
      name: 'Applied',
      items: [],
    },
    {
      id: 'phone-screen',
      name: 'Phone Screen',
      items: [],
    },
    {
      id: 'technical',
      name: 'Technical Interview',
      items: [],
    },
    {
      id: 'final',
      name: 'Final Round',
      items: [],
    },
    {
      id: 'offer',
      name: 'Offer',
      items: [],
    },
  ],
};