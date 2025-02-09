"use client"

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
export default function PDFViewer() {
    const [numPages, setNumPages] = useState<number>()
    const [pageNumber, setPageNumber] = useState<number>(1);
    
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages)
    }

    const handleRightButton = () => {
        if (pageNumber == numPages) {
            setPageNumber(numPages)
        } else {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
    }

    const handleLeftButton = () => {
        if (pageNumber == 1) {
            setPageNumber(1)
        } else {
            setPageNumber(prevPageNumber => prevPageNumber - 1)
        }
    }
    

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url,
    ).toString();
    return (
        <div className="h-full max-h-full">
            <Document file={"resources/sheet_music.pdf"} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} width={350}></Page>
            </Document>
            <div className="text-center">
                {pageNumber} of {numPages}
            </div>
            <div className="flex justify-around">
                <div onClick={handleLeftButton} className="text-5xl">
                    &#8592;
                </div>
                <div onClick={handleRightButton} className="text-5xl">
                    &#8594;
                </div>
            </div>
            
        </div>
    )
} 