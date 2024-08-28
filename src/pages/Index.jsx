import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Index = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(URL.createObjectURL(file));
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">PDF Uploader and Viewer</h1>
      <div className="mb-6">
        <input
          type="file"
          onChange={onFileChange}
          accept="application/pdf"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {pdfFile && (
        <div className="flex border rounded-lg overflow-hidden bg-white shadow-lg">
          <div className="w-1/4 border-r overflow-y-auto h-[calc(100vh-200px)]">
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`thumb_${index + 1}`}
                  className={`cursor-pointer p-2 ${currentPage === index + 1 ? 'bg-blue-100' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  <Page
                    pageNumber={index + 1}
                    width={150}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
            </Document>
          </div>
          <div className="w-3/4 overflow-y-auto h-[calc(100vh-200px)]">
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex flex-col items-center"
            >
              <Page
                pageNumber={currentPage}
                width={Math.min(800, window.innerWidth * 0.6)}
              />
            </Document>
            <p className="text-center mt-4">
              Page {currentPage} of {numPages}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
