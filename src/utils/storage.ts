import { createLocalforage, createStorage } from '@sa/utils';
import type { Local, Session } from '@/types/storage';

const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || '';

export const localStg = createStorage<Local>('local', storagePrefix);

export const sessionStg = createStorage<Session>('session', storagePrefix);

export const localforage = createLocalforage<Local>('local');
