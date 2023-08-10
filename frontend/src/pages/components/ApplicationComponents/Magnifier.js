import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";

const Magnifier = ({ position, size, zoomLevel }) => {
  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [pdfContainerReady, setPdfContainerReady] = useState(false);

  const imageSize = 100; // The original image size (assuming 100x100)
  const lensSize = size * zoomLevel; // Adjust the lens size based on zoomLevel
  const backgroundSize = `${imageSize / zoomLevel}px ${imageSize / zoomLevel}px`;

  const styles = {
    container: {
      position: "absolute",
      width: `${lensSize}px`,
      height: `${lensSize}px`,
      borderRadius: "50%",
      border: "2px solid rgba(0, 0, 0, 0.5)",
      backgroundSize: backgroundSize,
      backgroundImage: snapshotUrl ? `url(${snapshotUrl})` : "none",
      pointerEvents: "none",
      transform: `scale(${zoomLevel})`,
      transformOrigin: "center",
      zIndex: 9999, // Set the z-index to a higher value to make sure it's on top
      // Calculate the relative position within the PDF content based on zoomLevel
      top: position.y * zoomLevel - lensSize / 2,
      left: position.x * zoomLevel - lensSize / 2,
    },
  };

  useEffect(() => {
    // Check if the pdfContainer is available in the DOM
    const pdfContainer = document.getElementById("pdf-container");
    if (pdfContainer) {
      setPdfContainerReady(true);
    }
  }, []);

  useEffect(() => {
    if (pdfContainerReady) {
      // Create a reference to the element containing the PDF content
      const pdfContainer = document.getElementById("pdf-container");

      // Calculate the relative position within the PDF content based on zoomLevel
      const x = (position.x - pdfContainer.offsetLeft) * zoomLevel;
      const y = (position.y - pdfContainer.offsetTop) * zoomLevel;

      // Use html2canvas to capture the content under the magnifier
      html2canvas(pdfContainer, {
        width: lensSize,
        height: lensSize,
        x: x,
        y: y,
        scale: zoomLevel,
        useCORS: true,
        backgroundColor: null,
      }).then((canvas) => {
        setSnapshotUrl(canvas.toDataURL());
      });
    }
  }, [pdfContainerReady, position, size, zoomLevel, lensSize]);

  return <div style={styles.container}></div>;
};

export default Magnifier;
