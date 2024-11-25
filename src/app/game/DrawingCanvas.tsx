"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface DrawingCanvasProps {
  currentColor: string;
  currentSize: number;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
}

export default function DrawingCanvas({
  currentColor,
  currentSize,
  onColorChange,
  onSizeChange,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;

      const context = canvas.getContext("2d");
      if (context) {
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = currentColor;
        context.lineWidth = currentSize;
        contextRef.current = context;
      }
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = currentColor;
      contextRef.current.lineWidth = currentSize;
    }
  }, [currentColor, currentSize]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      contextRef.current?.beginPath();
      contextRef.current?.moveTo(x, y);
      isDrawingRef.current = true;
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      contextRef.current?.lineTo(x, y);
      contextRef.current?.stroke();
    }
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Drawing Canvas</h2>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="w-full h-64 border border-gray-300 rounded"
      />
      <div className="mt-2 space-y-2">
        <div className="flex space-x-2">
          <Button
            onClick={() => onColorChange("#000000")}
            className="w-8 h-8 bg-black"
          />
          <Button
            onClick={() => onColorChange("#FF0000")}
            className="w-8 h-8 bg-red-500"
          />
          <Button
            onClick={() => onColorChange("#00FF00")}
            className="w-8 h-8 bg-green-500"
          />
          <Button
            onClick={() => onColorChange("#0000FF")}
            className="w-8 h-8 bg-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => onSizeChange(2)} className="w-8 h-8">
            S
          </Button>
          <Button onClick={() => onSizeChange(5)} className="w-8 h-8">
            M
          </Button>
          <Button onClick={() => onSizeChange(10)} className="w-8 h-8">
            L
          </Button>
        </div>
        <Button onClick={clearCanvas} className="w-full">
          Clear Canvas
        </Button>
      </div>
    </div>
  );
}