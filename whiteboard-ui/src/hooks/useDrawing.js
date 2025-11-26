import { useCallback, useRef, useState } from "react";

export const useDrawing = (canvasRef, onDraw) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPointRef = useRef(null);

  const getMousePosition = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, [canvasRef]);

  const startDrawing = useCallback((event) => {
    const point = getMousePosition(event);
    lastPointRef.current = point;
    setIsDrawing(true);
    if (onDraw) {
      onDraw({ type: "start", ...point });
    }
  }, [getMousePosition, onDraw]);

  const draw = useCallback((event) => {
    if (!isDrawing) return;
    
    const currentPoint = getMousePosition(event);
    const lastPoint = lastPointRef.current;

    if (lastPoint && onDraw) {
      onDraw({
        type: "draw",
        from: lastPoint,
        to: currentPoint,
      });
    }

    lastPointRef.current = currentPoint;
  }, [isDrawing, getMousePosition, onDraw]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    lastPointRef.current = null;
    if (onDraw) {
      onDraw({ type: "stop" });
    }
  }, [onDraw]);

  return {
    isDrawing,
    startDrawing,
    draw,
    stopDrawing,
  };
};

