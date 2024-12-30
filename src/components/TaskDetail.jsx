import React from 'react';

const TaskDetailModal = ({ task, onClose }) => {
  if (!task) return null; // Si no hay tarea seleccionada, no renderizar nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Detalles de la Tarea</h2>
        <p>
          <strong>Título:</strong> {task.title}
        </p>
        <p>
          <strong>Descripción:</strong> {task.description || 'Sin descripción'}
        </p>
        <p>
          <strong>Estado:</strong> {task.completed ? 'Completada' : 'Pendiente'}
        </p>
        <p>
          <strong>Creada el:</strong>{' '}
          {new Date(task.createdAt).toLocaleString()}
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
