import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import Magnifier from "./Magnifier";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Button from "@mui/material/Button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PDFviewer = () => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [magnifierSize, setMagnifierSize] = useState(100);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      overflowY: "hidden",
      height: "calc(100vh - 100px)", // Adjust the height to account for the buttons' height
      position: "relative",
      marginTop: "20px", // Add margin at the top
    },
    pdfContainer: {
      position: "relative", // Add position relative to allow absolute positioning of magnifier
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "16px",
    },
    button: {
      background: "#A259FF",
      width: "150px",
      height: "46px",
      borderRadius: "20px",
      color: "white",
      marginTop: "30px",
      marginLeft: "40px",
      fontFamily: "Work Sans",
      fontSize: "16px",
      marginRight: "8px",
    },
  };

  useEffect(() => {
    const pdfUrl =
      "https://ppioneerbucket.s3.amazonaws.com/four/resume/c183af38452c277d09332246225d13d5.pdf";
    setFile(pdfUrl);
  }, []);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMagnifierPosition({ x, y });
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
    setMagnifierSize((prevSize) => prevSize + 10);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
    setMagnifierSize((prevSize) => Math.max(prevSize - 10, 50));
  };

  return (
    <div style={styles.container} onMouseMove={handleMouseMove}>
      <div style={styles.buttonGroup}>
        <Button variant="contained" color="primary" onClick={handleZoomIn} style={styles.button}>
          Zoom In
        </Button>
        <Button variant="contained" color="primary" onClick={handleZoomOut} style={styles.button}>
          Zoom Out
        </Button>
        <a href={file} download>
          <Button variant="contained" color="primary" style={styles.button}>
            Download
          </Button>
        </a>
      </div>
      {file && (
        <div style={styles.pdfContainer} id="pdf-container"> {/* This is the parent container for the PDF content */}
          <Document file={file} onLoadSuccess={handleDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              onMouseMove={handleMouseMove}
              renderMode="canvas"
              scale={zoomLevel}
              style={{ width: "100%" }} // Update the styles for the Page component
            />
          </Document>
        </div>
      )}
      <Magnifier position={magnifierPosition} size={magnifierSize} zoomLevel={zoomLevel} />
    </div>
  );
};

export default PDFviewer;
