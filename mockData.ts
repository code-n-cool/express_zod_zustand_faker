import { faker } from '@faker-js/faker';
import { createStore } from 'zustand/vanilla';

export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
}

export const generateUsers = (count: number): User[] =>
  Array.from({ length: count }, (): User => ({
    id: faker.number.int(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.paragraph(),
  }));

export const userStore = createStore<{ users: User[] }>(() => ({
  users: [],
}));
