import { useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const useTasks = () => {
  const { state, dispatch } = useContext(TaskContext);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
     // console.log("-",data)
      dispatch({ type: 'SET_TASKS', payload: data });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async newTask => {
    try {
      const { data } = await createTask(newTask);
      dispatch({ type: 'ADD_TASK', payload: data });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
     //   console.log("id, updatedTask",id, updatedTask)
      const { data } = await updateTask(id, updatedTask);
     // console.log("data",data)
      dispatch({ type: 'UPDATE_TASK', payload: data });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const removeTask = async id => {
    try {
      await deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Cargar tareas al inicializar
  }, []);

  return {
    tasks: state.tasks,
    addTask,
    editTask,
    removeTask,
  };
};

export default useTasks;
