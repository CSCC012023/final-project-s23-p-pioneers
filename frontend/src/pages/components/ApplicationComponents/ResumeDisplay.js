import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ResumeDisplay = ({resume}) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);
  console.log(resume)
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
      resume
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

export default ResumeDisplay;
