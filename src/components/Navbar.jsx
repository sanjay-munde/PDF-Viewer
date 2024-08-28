import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = ({ pdfName, currentPage, numPages, onFileChange }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Input
          type="file"
          onChange={onFileChange}
          accept="application/pdf"
          className="hidden"
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload">
          <Button variant="outline" as="span">
            {pdfName ? 'Change PDF' : 'Upload PDF'}
          </Button>
        </label>
        {pdfName && (
          <span className="text-sm font-medium text-gray-700">
            {pdfName}
          </span>
        )}
      </div>
      {numPages && (
        <div className="text-sm text-gray-600">
          Page {currentPage} of {numPages}
        </div>
      )}
    </nav>
  );
};

export default Navbar;