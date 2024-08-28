import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Index = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfName, setPdfName] = useState('');

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(URL.createObjectURL(file));
      setPdfName(file.name);
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
      <input
        type="file"
        onChange={onFileChange}
        accept="application/pdf"
        className="hidden"
        id="pdf-upload"
      />
      <label
        htmlFor="pdf-upload"
        className="block w-full text-center text-2xl font-bold mb-4 cursor-pointer text-blue-600 hover:text-blue-800"
      >
        {pdfName || 'Click here to upload a PDF'}
      </label>
      {pdfFile && (
        <>
          <h2 className="text-4xl font-bold mb-2 text-center">{pdfName}</h2>
          <p className="text-xl text-center mb-6">Page {currentPage} of {numPages}</p>
          <div className="flex border rounded-lg overflow-hidden bg-white shadow-lg">
            <div className="w-1/6 border-r overflow-y-auto h-[calc(100vh-250px)]">
              <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                  <div
                    key={`thumb_${index + 1}`}
                    className={`cursor-pointer p-2 ${currentPage === index + 1 ? 'bg-blue-100' : ''}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    <div className="border border-gray-300 rounded overflow-hidden">
                      <Page
                        pageNumber={index + 1}
                        width={60}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </div>
                    <p className="text-center text-xs mt-1">Page {index + 1}</p>
                  </div>
                ))}
              </Document>
            </div>
            <div className="w-5/6 overflow-y-auto h-[calc(100vh-250px)]">
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-col items-center"
              >
                <Page
                  pageNumber={currentPage}
                  width={Math.min(800, window.innerWidth * 0.7)}
                />
              </Document>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
