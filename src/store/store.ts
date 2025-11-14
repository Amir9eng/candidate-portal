import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import employeesReducer from './employeesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

