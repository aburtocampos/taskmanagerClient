import React, { useState, useEffect } from 'react';
import useTasks from '../hooks/useTasks';
import { MdCancel } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';

const EditTaskForm = ({ task, onClose }) => {
  const { editTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setCompleted(task.completed || false);
    }
  }, [task]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!title.trim()) {
      setError('El título es obligatorio.');
      return;
    }

    try {
      await editTask(task._id, { title, description, completed });
      setError('');
      onClose(); // Cierra el modal
    } catch (err) {
      console.error('Error al editar la tarea:', err);
      setError('Hubo un problema al editar la tarea.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingresa el título"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Ingresa una descripción"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm font-medium text-gray-700">
          Marcar como Completada
        </label>
      </div>
      <div className="flex justify-between space-x-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          <MdCancel className="mr-2 inline" size={20} /> Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaSave className="mr-2 inline" size={20} /> Guardar
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
