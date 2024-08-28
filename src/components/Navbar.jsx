import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Merge } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ pdfName, currentPage, numPages, onFileChange, onSave, onSaveAs, onMerge, showUploadButton, onTitleChange }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(pdfName);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setEditedTitle(pdfName);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    onTitleChange(editedTitle);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-center space-x-4">
            {showUploadButton && (
              <>
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
              </>
            )}
            <div className="flex flex-col">
              {pdfName && (
                isEditingTitle ? (
                  <Input
                    value={editedTitle}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="text-sm font-medium text-gray-700 w-48"
                    autoFocus
                  />
                ) : (
                  <span
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={handleTitleClick}
                  >
                    {pdfName}
                  </span>
                )
              )}
              {pdfName && numPages > 0 && (
                <div className="text-xs text-gray-600">
                  Page {currentPage} of {numPages}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {pdfName && numPages > 0 && (
            <>
              <input
                type="file"
                onChange={onMerge}
                accept="application/pdf"
                className="hidden"
                id="pdf-merge"
              />
              <label htmlFor="pdf-merge">
                <Button variant="outline" asChild>
                  <span><Merge className="mr-2 h-4 w-4" />Merge PDF</span>
                </Button>
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Save PDF
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={onSave}>Save</DropdownMenuItem>
                  <DropdownMenuItem onClick={onSaveAs}>Save As</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
