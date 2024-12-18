import React, { useState } from 'react';
import { FileIcon } from 'lucide-react';

const DragDropArea = ({ onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileChange({ target: { files: [files[0]] } });
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-full border-4 border-dashed rounded-lg p-4 sm:p-8 mx-2 sm:mx-4 transition-colors ${
        isDragging ? 'border-purple-500 bg-purple-50' : 'border-purple-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <FileIcon className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mb-4" />
      <p className="text-lg sm:text-xl font-semibold text-purple-700 mb-2 text-center">Drag & Drop your PDF here</p>
      <p className="text-sm text-purple-500 mb-4">or</p>
      <label htmlFor="pdf-upload" className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:from-purple-600 hover:to-pink-600 transition-colors">
        Choose PDF
      </label>
      <input
        id="pdf-upload"
        type="file"
        onChange={onFileChange}
        accept="application/pdf"
        className="hidden"
      />
    </div>
  );
};

export default DragDropArea;