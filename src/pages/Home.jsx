import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import LogoutButton from '../components/LogoutButton';
import NewTaskForm from '../components/NewTaskForm';
import SearchInput from '../components/SearchInput';
import useTasks from '../hooks/useTasks';
import { FaSignOutAlt, FaPlus } from 'react-icons/fa';
import { MdFilterList } from 'react-icons/md';

const Home = () => {
  const { tasks } = useTasks(); 
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const openAddModal = () => {
    setIsAdding(true);
  };

  const closeAddModal = () => {
    setIsAdding(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsDropdownOpen(false); // Cierra el dropdown después de seleccionar
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Actualiza el término de búsqueda
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed) ||
      filter === 'all';

    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;


  return (
    <div className="p-4 container mx-auto">
      {/* Navbar */}
      <div className="flex flex-row justify-between items-center mb-4  md:space-y-0">
        <h1 className="text-2xl font-bold">Lista de Tareas</h1>
        <SearchInput className="hidden lg:block" onSearch={handleSearch} />
        <div className="flex flex-wrap items-center space-x-2">
          {/* Dropdown para Filtros */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
            >
              <MdFilterList className="mr-0 md:mr-2 inline" size={20} />
              <span className="hidden md:inline">Filtrar</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded w-48 z-10">
                <ul>
                  <li>
                    <button
                      onClick={() => handleFilterChange('all')}
                      className={`block w-full px-4 py-2 text-left ${
                        filter === 'all' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      Todas ({totalTasks})
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFilterChange('completed')}
                      className={`block w-full px-4 py-2 text-left ${
                        filter === 'completed' ? 'bg-green-500 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      Completadas ({completedTasks})
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFilterChange('pending')}
                      className={`block w-full px-4 py-2 text-left ${
                        filter === 'pending' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      Pendientes ({pendingTasks})
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Botón para nueva tarea */}
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <FaPlus className="mr-0 md:mr-2 inline" size={20} />
            <span className="hidden md:inline">Nueva Tarea</span>
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* Search On mnobile */}
       <SearchInput className="block lg:hidden mb-4" onSearch={handleSearch} />
      {/* Lista de Tareas */}
      <TaskList tasks={filteredTasks} />

      {/* Modal para Nueva Tarea */}
      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Agregar Nueva Tarea</h2>
            <NewTaskForm onClose={closeAddModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
