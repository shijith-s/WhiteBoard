export const setupCanvas = (canvas, width, height, options = {}) => {
  if (!canvas) return null;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Set canvas dimensions
  canvas.width = width;
  canvas.height = height;

  // Apply default styles
  ctx.strokeStyle = options.strokeStyle || "black";
  ctx.lineWidth = options.lineWidth || 2;
  ctx.lineJoin = options.lineJoin || "round";
  ctx.lineCap = options.lineCap || "round";

  return ctx;
};

export const drawLine = (ctx, from, to, options = {}) => {
  if (!ctx) return;

  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);

  // Apply custom styles if provided
  if (options.strokeStyle) ctx.strokeStyle = options.strokeStyle;
  if (options.lineWidth) ctx.lineWidth = options.lineWidth;

  ctx.stroke();
};

export const clearCanvas = (ctx, width, height) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
};

// Shared drawing functions for both local and remote drawing
export const drawStart = (ctx, x, y) => {
  if (!ctx) return;
  ctx.beginPath();
  ctx.moveTo(x, y);
};

export const drawMove = (ctx, toX, toY) => {
  if (!ctx) return;
  ctx.lineTo(toX, toY);
  ctx.stroke();
};

export const drawEnd = (ctx) => {
  if (!ctx) return;
  ctx.closePath();
};
