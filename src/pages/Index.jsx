import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PDFSidebar from '../components/PDFSidebar';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Index = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pdfName, setPdfName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const mainContentRef = useRef(null);

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

  const scrollToPage = (pageNumber) => {
    const pageElement = document.getElementById(`page_${pageNumber}`);
    if (pageElement && mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: pageElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        const { scrollTop, clientHeight } = mainContentRef.current;
        const pageElements = document.querySelectorAll('[id^="page_"]');
        for (let i = 0; i < pageElements.length; i++) {
          const element = pageElements[i];
          if (element.offsetTop >= scrollTop && element.offsetTop < scrollTop + clientHeight) {
            setCurrentPage(i + 1);
            break;
          }
        }
      }
    };

    const contentElement = mainContentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {pdfFile && (
        <PDFSidebar file={pdfFile} numPages={numPages} onPageClick={scrollToPage} />
      )}
      <div className="flex-1 p-8 overflow-hidden relative">
        <input
          type="file"
          onChange={onFileChange}
          accept="application/pdf"
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className="block w-full text-center text-5xl font-bold mb-4 cursor-pointer text-blue-600 hover:text-blue-800"
        >
          {pdfName || 'Click here to upload a PDF'}
        </label>
        {pdfFile && (
          <>
            <div className="absolute top-2 left-2 bg-white p-2 rounded shadow text-sm">
              <p>{pdfName}</p>
              <p>Page {currentPage} of {numPages}</p>
            </div>
            <div className="border rounded-lg overflow-hidden bg-white shadow-lg mt-12">
              <div ref={mainContentRef} className="overflow-y-auto h-[calc(100vh-250px)]">
                <Document
                  file={pdfFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="flex flex-col items-center"
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <div id={`page_${index + 1}`} key={`page_${index + 1}`} className="mb-8">
                      <Page
                        pageNumber={index + 1}
                        width={Math.min(800, window.innerWidth * 0.6)}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                      />
                    </div>
                  ))}
                </Document>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
