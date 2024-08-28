import React from 'react';
import { Document, Page } from 'react-pdf';

const PDFSidebar = ({ file, numPages, onPageClick }) => {
  return (
    <div className="w-64 h-screen overflow-y-auto bg-gray-100 p-4 border-r">
      <Document file={file}>
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`thumb_${index + 1}`} className="mb-4 cursor-pointer" onClick={() => onPageClick(index + 1)}>
            <Page
              pageNumber={index + 1}
              width={200}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            <p className="text-center text-sm mt-1">Page {index + 1}</p>
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PDFSidebar;