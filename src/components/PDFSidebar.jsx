import React from 'react';
import { Document, Page } from 'react-pdf';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PDFSidebar = ({ file, pages, onPageClick, onDragEnd }) => {
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
                        <Page
                          pageNumber={page}
                          width={200}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                        <p className="text-center text-sm mt-1">Page {index + 1} (Original: {page})</p>
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
