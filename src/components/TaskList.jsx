import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';
import EditTaskForm from './EditTaskForm';
import TaskDetailModal from './TaskDetail';

const TaskList = ({ tasks }) => {
  const { editTask, removeTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null); 

  const toggleStatus = task => {
    editTask(task.taskId, { ...task, completed: !task.completed });
  };

  const openEditModal = task => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentTask(null);
  };

  const viewTask = task => {
    setViewingTask(task); // Establece la tarea que se está viendo
  };

  const closeDetailModal = () => {
    setViewingTask(null); // Cierra el modal de detalles
  };

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.taskId}
          task={task}
          onToggleStatus={toggleStatus}
          onEdit={openEditModal}
          onRemove={removeTask}
          onView={viewTask} // Pasar la función "Ver"
        />
      ))}

      {/* Modal para Editar Tarea */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Tarea</h2>
            <EditTaskForm task={currentTask} onClose={closeEditModal} />
          </div>
        </div>
      )}

      {/* Modal para Detalles de la Tarea */}
      {viewingTask && (
        <TaskDetailModal task={viewingTask} onClose={closeDetailModal} />
      )}
    </div>
  );
};

export default TaskList;