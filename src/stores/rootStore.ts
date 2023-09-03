// rootStore.ts
import { createContext, useContext } from 'react';
import { ComicStore, AuthStore } from '.';


export class RootStore {
  authStore: AuthStore;
  comicStore: ComicStore

  constructor() {
    this.authStore = new AuthStore();
    this.comicStore = new ComicStore();
  }
}

export const RootStoreContext = createContext(new RootStore());

export const useRootStore = () => useContext(RootStoreContext);
