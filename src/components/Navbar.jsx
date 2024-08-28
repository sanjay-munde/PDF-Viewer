import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Merge, Pen, FileUp, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ pdfName, currentPage, numPages, onFileChange, onSave, onSaveAs, onMerge, showUploadButton, onTitleChange, isSidebarVisible, onToggleSidebar }) => {
  const showSidebarToggle = pdfName && numPages > 0;
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
    if (editedTitle.trim() !== '') {
      setIsEditingTitle(false);
      onTitleChange(editedTitle.trim());
    } else {
      setEditedTitle(pdfName);
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="mr-2"
            >
              {isSidebarVisible ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
            </Button>
          )}
          <div className="flex flex-col">
            {pdfName && (
              isEditingTitle ? (
                <Input
                  value={editedTitle}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  className="text-sm font-medium text-gray-700 w-48 h-6 px-1 py-0"
                  autoFocus
                />
              ) : (
                <div className="flex items-center group">
                  <span
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={handleTitleClick}
                  >
                    {pdfName}
                  </span>
                  <Pen className="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )
            )}
            {pdfName && numPages > 0 && (
              <div className="text-xs text-gray-600">
                Page {currentPage} of {numPages}
              </div>
            )}
          </div>
        </div>
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
              <span><FileUp className="mr-2 h-4 w-4" />{pdfName ? 'Change PDF' : 'Upload PDF'}</span>
            </Button>
          </label>
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
