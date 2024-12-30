import React, { useState } from 'react';

const SearchInput = ({ onSearch, className }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Emitir el término de búsqueda al padre
  };

  return (
    <div className={`mb-4 ${className || ''}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar por título o descripción..."
        className="w-full lg:w-96 p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchInput;
