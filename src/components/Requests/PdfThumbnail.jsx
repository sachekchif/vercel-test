import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Spin } from "antd"; // Ant Design Spinner for loading state
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; // Optional: For annotations
import "react-pdf/dist/esm/Page/TextLayer.css"; // Optional: For text layer

// Set up the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfThumbnail = ({ pdfUrl, width = 100, height = 100 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    if (pdfUrl?.startsWith("data:application/pdf;base64,")) {
      // Convert base64 to Blob URL
      const url = base64ToBlobUrl(pdfUrl);
      if (url) {
        setBlobUrl(url);
      } else {
        setHasError(true);
      }
    } else if (pdfUrl?.startsWith("blob:")) {
      // Use the Blob URL directly
      setBlobUrl(pdfUrl);
    } else {
      // Invalid URL
      setHasError(true);
    }
  }, [pdfUrl]);

  const base64ToBlobUrl = (base64) => {
    try {
      if (!base64.startsWith("data:application/pdf;base64,")) {
        throw new Error("Invalid base64 PDF URL");
      }

      const base64Data = base64.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Failed to convert base64 to Blob URL:", error);
      return null;
    }
  };

  if (!blobUrl || hasError) {
    return <div>Invalid PDF URL</div>;
  }

  return (
    <div style={{ width, height, overflow: "hidden" }}>
      {isLoading && (
        <div
          style={{
            width,
            height,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="small" /> {/* Ant Design Spinner */}
        </div>
      )}
      <Document
        file={blobUrl}
        onLoadSuccess={() => setIsLoading(false)}
        onLoadError={(error) => {
          console.error("Failed to load PDF:", error);
          setIsLoading(false);
          setHasError(true);
        }}
      >
        <Page
          pageNumber={1}
          width={width}
          height={height}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};

export default PdfThumbnail;