import React from 'react';
import { Document, Page } from 'react-pdf';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PDFSidebar = ({ file, pages, onPageClick, onDragEnd, onDeletePage }) => {
  return (
    <div className="w-64 h-screen overflow-y-auto bg-gray-100 p-4 border-r">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="pdf-pages">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Document file={file}>
                {pages.map((page, index) => (
                  <Draggable key={`thumb_${page}`} draggableId={`thumb_${page}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-4 cursor-pointer"
                        onClick={() => onPageClick(page)}
                      >
                        <div className="relative">
                          <Page
                            pageNumber={page}
                            width={200}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 w-6 h-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeletePage(index);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-center text-sm mt-1">
                          Page {index + 1}
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Document>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PDFSidebar;
