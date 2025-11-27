import React, { useEffect, useRef, useState } from "react";
import { useDrawing } from "../../hooks/useDrawing";
import { useSocketDrawing } from "../../hooks/useSocketDrawing";
import {
  setupCanvas,
  drawStart,
  drawMove,
  drawEnd,
} from "../../utils/canvasUtils";

const Canvas = ({ width = 1000, height = 1000 }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = setupCanvas(canvas, width, height);
    setCtx(context);
  }, [width, height]);

  // Socket drawing integration
  const { handleDraw: handleSocketDraw } = useSocketDrawing(ctx);

  // Local drawing logic
  const handleLocalDraw = (drawData) => {
    if (!ctx) return;

    switch (drawData.type) {
      case "start":
        drawStart(ctx, drawData.x, drawData.y);
        break;
      case "draw":
        drawMove(ctx, drawData.to.x, drawData.to.y);
        break;
      case "stop":
        drawEnd(ctx);
        break;
      default:
        break;
    }
  };

  // Combined draw handler
  const handleDraw = (drawData) => {
    handleLocalDraw(drawData);
    handleSocketDraw(drawData);
  };

  // Drawing hooks
  const { startDrawing, draw, stopDrawing } = useDrawing(canvasRef, handleDraw);

  return (
    <div className="flex-1 w-[50%] h-full p-4">
      <canvas
        ref={canvasRef}
        className="border-2 border-sunset-secondary/40 rounded-xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-200"
        style={{ width: `${width}px`, height: `${height}px` }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Canvas;
