import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const CoverLetterDisplay = ({resume}) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      overflowY: "hidden",
      height: "170vh",
    },
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onFileChange = (url) => {
    setFile(url);
  };

  useEffect(() => {
    onFileChange(
      resume ||
      "https://ppioneerbucket.s3.amazonaws.com/aefaf/resume/94d1ab502f60e43c5698eec250f49640.pdf"
    );
  }, []);

  return (
    <div style={styles.container}>
      {file && (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} style={styles.page} scale={1.5} />
        </Document>
      )}
    </div>
  );
};

export default CoverLetterDisplay;
