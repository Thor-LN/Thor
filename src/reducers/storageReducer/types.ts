export enum StorageTypes {
  SET_STORAGE = '@storage/SET_STORAGE',
}

export type StorageState = Record<string, any>;

export interface StorageActions {
  type: StorageTypes;
  storage: Record<string, any>;
}
