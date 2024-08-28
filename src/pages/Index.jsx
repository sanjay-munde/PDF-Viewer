import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
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
  const [pageOrder, setPageOrder] = useState([]);
  const mainContentRef = useRef(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfName(file.name);
      setCurrentPage(1);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageOrder(Array.from({ length: numPages }, (_, i) => i + 1));
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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newPageOrder = Array.from(pageOrder);
    const [reorderedItem] = newPageOrder.splice(result.source.index, 1);
    newPageOrder.splice(result.destination.index, 0, reorderedItem);

    setPageOrder(newPageOrder);
  };

  const onDownload = async () => {
    if (!pdfFile) return;

    try {
      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const newPdfDoc = await PDFDocument.create();

      for (const pageNum of pageOrder) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);
        newPdfDoc.addPage(copiedPage);
      }

      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `reordered_${pdfName}`;
      link.click();
    } catch (error) {
      console.error('Error reordering PDF:', error);
      alert('An error occurred while reordering the PDF. Please try again.');
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
            setCurrentPage(pageOrder[i]);
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
  }, [pageOrder]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar 
        pdfName={pdfName} 
        currentPage={currentPage} 
        numPages={numPages} 
        onFileChange={onFileChange}
        onDownload={onDownload}
      />
      <div className="flex flex-1 overflow-hidden">
        {pdfFile && (
          <PDFSidebar
            file={URL.createObjectURL(pdfFile)}
            pages={pageOrder}
            onPageClick={scrollToPage}
            onDragEnd={onDragEnd}
          />
        )}
        <div className="flex-1 p-4 overflow-hidden relative">
          {pdfFile && (
            <div className="border rounded-lg overflow-hidden bg-white shadow-lg h-full">
              <div ref={mainContentRef} className="overflow-y-auto h-full">
                <Document
                  file={URL.createObjectURL(pdfFile)}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="flex flex-col items-center"
                >
                  {pageOrder.map((pageNumber, index) => (
                    <div id={`page_${pageNumber}`} key={`page_${pageNumber}`} className="mb-8">
                      <Page
                        pageNumber={pageNumber}
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
