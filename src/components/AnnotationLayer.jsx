import React, { useState, useRef, useEffect } from 'react';

const AnnotationLayer = ({ pageNumber, width, height, annotations, onChange }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw existing annotations
    annotations.forEach(annotation => {
      ctx.beginPath();
      ctx.strokeStyle = annotation.color;
      ctx.lineWidth = annotation.borderWidth;
      ctx.globalAlpha = annotation.opacity;
      annotation.path.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x * width, point.y * height);
        } else {
          ctx.lineTo(point.x * width, point.y * height);
        }
      });
      ctx.stroke();
    });
  }, [annotations, width, height]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);
    setCurrentPath([{ x: offsetX / width, y: offsetY / height }]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentPath(prevPath => [...prevPath, { x: offsetX / width, y: offsetY / height }]);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const newAnnotation = {
        pageNumber,
        path: currentPath,
        color: 'red',
        opacity: 1,
        borderWidth: 2,
      };
      onChange([...annotations, newAnnotation]);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 z-10"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};

export default AnnotationLayer;