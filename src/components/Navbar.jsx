import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Navbar = ({ pdfName, currentPage, numPages, onFileChange, onDownload }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          onChange={onFileChange}
          accept="application/pdf"
          className="hidden"
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload">
          <Button variant="outline" asChild>
            <span>{pdfName ? 'Change PDF' : 'Upload PDF'}</span>
          </Button>
        </label>
        {pdfName && (
          <span className="text-sm font-medium text-gray-700">
            {pdfName}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {pdfName && numPages > 0 && (
          <>
            <div className="text-sm text-gray-600">
              Page {currentPage} of {numPages}
            </div>
            <Button onClick={onDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
