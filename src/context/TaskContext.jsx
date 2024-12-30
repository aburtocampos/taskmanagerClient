import React, { createContext, useReducer } from 'react';
import { setAuthToken } from '../services/api';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  user: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, hasMore: action.payload.length > 0 };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          //task.id === action.payload.id ? action.payload : task
          task.taskId === action.payload.taskId ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.taskId !== action.payload),
      };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, tasks: [], hasMore: true };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // obtener token de localstorage
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
