import React, { useEffect, useRef, useState } from "react";

const Canvas = ({ width = 1000, height = 1000 }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Basic styles
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    setCtx(ctx);
  }, [canvasRef, width, height]);

  const getMousePosition = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handleMouseDown = (event) => {
    if (!ctx) return;
    const { x, y } = getMousePosition(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleMouseMove = (event) => {
    if (!ctx || !isDrawing) return;
    const { x, y } = getMousePosition(event);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  return (
    <div className="flex-1 w-[50%] h-">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 rounded-md shadow-lg bg-white"
        style={{ width: `${width}px`, height: `${height}px` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default Canvas;
