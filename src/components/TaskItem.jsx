import React from 'react';
import { FaEdit, FaTrashAlt, FaCheck, FaTimes,FaEye  } from 'react-icons/fa';

const TaskItem = ({ task, onToggleStatus, onEdit, onRemove, onView }) => {
  return (
    <div className={`p-4 border rounded-md shadow-sm ${
        task.completed ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'
      }`}>
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-sm text-gray-500">
        {task.completed ? (
          <span className="flex items-center text-green-500">
            <FaCheck className="mr-2" /> Completada
          </span>
        ) : (
          <span className="flex items-center text-pink-500">
            <FaTimes className="mr-2" /> Pendiente
          </span>
        )}
      </p>
      <p className="text-sm text-gray-500">
        Creada el: {new Date(task.createdAt).toLocaleString()}
      </p>
      <div className="flex justify-end mt-2 gap-2">
        <button
          onClick={() => onToggleStatus(task)}
          className={`flex items-center px-4 py-2 text-sm text-white rounded-full ${
            task.completed
              ? 'bg-pink-600 outline-pink-500 hover:outline bg-pink-600 outline-offset-1'
              : 'bg-green-600 outline-green-500 hover:outline bg-green-600 outline-offset-1'
          }`}
        >
          {task.completed ? (
            <>
              <FaTimes className="mr-0 md:mr-2 inline" />
              <span className="hidden md:inline">Marcar como Pendiente</span>
            </>
          ) : (
            <>
              <FaCheck className="mr-0 md:mr-2 inline" />
              <span className="hidden md:inline">Marcar como Completada</span>
            </>
          )}
        </button>
        <button
          onClick={() => onView(task)}
          className="px-4 py-2 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700"
        >
          <FaEye className="mr-0 md:mr-2 inline" />
          <span className="hidden md:inline">Ver</span>
        </button>
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 text-sm text-white rounded-full bg-yellow-600 outline-yellow-500 hover:outline bg-yellow-600 outline-offset-1"
        >
          <FaEdit className="mr-0 md:mr-2 inline" />
          <span className="hidden md:inline">Editar</span>
        </button>
        <button
          onClick={() => onRemove(task.taskId)}
          className="px-4 py-2 text-sm bg-red-600 outline-red-500 text-white rounded-full hover:outline bg-red-600 outline-offset-1"
        >
          <FaTrashAlt className="mr-0 md:mr-2 inline" />
          <span className="hidden md:inline">Eliminar</span>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
