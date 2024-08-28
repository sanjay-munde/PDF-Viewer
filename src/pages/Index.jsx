import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Index = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
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
        className="block w-full text-center text-4xl font-bold mb-4 cursor-pointer text-blue-600 hover:text-blue-800"
      >
        {pdfName || 'Click here to upload a PDF'}
      </label>
      {pdfFile && (
        <>
          <h2 className="text-5xl font-bold mb-2 text-center">{pdfName}</h2>
          <p className="text-xl text-center mb-6">Total Pages: {numPages}</p>
          <div className="border rounded-lg overflow-hidden bg-white shadow-lg">
            <div className="overflow-y-auto h-[calc(100vh-250px)]">
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-col items-center"
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_${index + 1}`} className="mb-8">
                    <Page
                      pageNumber={index + 1}
                      width={Math.min(800, window.innerWidth * 0.8)}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                    />
                    <p className="text-center text-lg mt-2">Page {index + 1} of {numPages}</p>
                  </div>
                ))}
              </Document>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
