import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import employeesReducer from './employeesSlice';

// Persist configuration for auth
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated'], // Only persist these fields
};

// Persist configuration for employees (optional - you can remove this if you don't want to persist employees)
const employeesPersistConfig = {
  key: 'employees',
  storage,
  whitelist: ['employees'], // Only persist the employees array
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedEmployeesReducer = persistReducer(employeesPersistConfig, employeesReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    employees: persistedEmployeesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

