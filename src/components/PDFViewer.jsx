import React from 'react';
import { Document, Page } from 'react-pdf';

const PDFViewer = ({ pdfFile, pageOrder, onDocumentLoadSuccess }) => {
  return (
    <Document
      file={pdfFile}
      onLoadSuccess={onDocumentLoadSuccess}
      className="flex flex-col items-center"
    >
      {pageOrder.map((pageNumber, index) => (
        <div id={`page_${pageNumber}`} key={`page_${pageNumber}`} className="mb-8 max-w-full">
          <Page
            pageNumber={pageNumber}
            width={Math.min(window.innerWidth - 48, 800)} // Responsive width
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="max-w-full"
          />
        </div>
      ))}
    </Document>
  );
};

export default PDFViewer;