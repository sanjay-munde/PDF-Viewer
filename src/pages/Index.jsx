import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PDFSidebar from '../components/PDFSidebar';
import Navbar from '../components/Navbar';

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
      setCurrentPage(1); // Reset to first page when new file is uploaded
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
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.clientHeight;
          if (scrollTop >= elementTop - clientHeight / 2 && scrollTop < elementBottom - clientHeight / 2) {
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
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar pdfName={pdfName} currentPage={currentPage} numPages={numPages} onFileChange={onFileChange} />
      <div className="flex flex-1 overflow-hidden">
        {pdfFile && (
          <PDFSidebar file={pdfFile} numPages={numPages} onPageClick={scrollToPage} />
        )}
        <div className="flex-1 p-4 overflow-hidden relative">
          {pdfFile && (
            <div className="border rounded-lg overflow-hidden bg-white shadow-lg h-full">
              <div ref={mainContentRef} className="overflow-y-auto h-full">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
