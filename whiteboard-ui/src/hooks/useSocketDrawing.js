import { useEffect, useCallback } from "react";
import { useSocket, useSocketState } from "../contexts/SocketContext";
import { SOCKET_EVENTS } from "../constants/socketEvents";
import { drawStart, drawMove, drawEnd } from "../utils/canvasUtils";

export const useSocketDrawing = (ctx) => {
  const { emit, on, off } = useSocket();
  const { isConnected } = useSocketState();

  const handleDraw = useCallback(
    (drawData) => {
      if (!isConnected) return;
      switch (drawData.type) {
        case "start":
          emit(SOCKET_EVENTS.DRAW_START, {
            x: drawData.x,
            y: drawData.y,
            timestamp: Date.now(),
          });
          break;
        case "draw":
          emit(SOCKET_EVENTS.DRAW_MOVE, {
            from: drawData.from,
            to: drawData.to,
            timestamp: Date.now(),
          });
          break;
        case "stop":
          emit(SOCKET_EVENTS.DRAW_END, {
            timestamp: Date.now(),
          });
          break;
        default:
          break;
      }
    },
    [isConnected, emit]
  );

  // Listen for drawing events from other users
  useEffect(() => {
    if (!ctx) return;

    const handleDrawStart = (data) => {
      drawStart(ctx, data.x, data.y);
    };

    const handleDrawMove = (data) => {
      drawMove(ctx, data.to.x, data.to.y);
    };

    const handleDrawEnd = () => {
      drawEnd(ctx);
    };

    // Register event listeners
    on(SOCKET_EVENTS.DRAW_RECEIVE_START, handleDrawStart);
    on(SOCKET_EVENTS.DRAW_RECEIVE_MOVE, handleDrawMove);
    on(SOCKET_EVENTS.DRAW_RECEIVE_END, handleDrawEnd);

    // Cleanup
    return () => {
      off(SOCKET_EVENTS.DRAW_RECEIVE_START, handleDrawStart);
      off(SOCKET_EVENTS.DRAW_RECEIVE_MOVE, handleDrawMove);
      off(SOCKET_EVENTS.DRAW_RECEIVE_END, handleDrawEnd);
    };
  }, [ctx, on, off]);

  return { handleDraw };
};
