'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import choicesReducer from '@/slices/choicesSlice';
import type { PersistConfig } from 'redux-persist';

/* root reducer */
const rootReducer = combineReducers({
  choices: choicesReducer,
});

/* tipo dello state */
type RootReducerState = ReturnType<typeof rootReducer>;

/* persist config */
const persistConfig: PersistConfig<RootReducerState> = {
  key: 'root',
  storage: storageSession,
  blacklist: [],
};

/* persisted reducer */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* store */
export const store = configureStore({
  reducer: persistedReducer,
});

/* persistor */
export const persistor = persistStore(store);

/* tipi standard */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
