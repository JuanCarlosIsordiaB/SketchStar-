"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DrawingCanvas from "./DrawingCanvas";

export default function GameSimulation() {
  const [playerName, setPlayerName] = useState("Player 1");
  const [prompt, setPrompt] = useState("Draw a cat");
  const [timeLeft, setTimeLeft] = useState(60);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentSize, setCurrentSize] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      setChatMessages((prevMessages) => [...prevMessages, `You: ${userMessage}`]);
      setUserMessage("");

      // Simulate a response
      setTimeout(() => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          "System: Nice try! Keep guessing.",
        ]);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">SketchStar Game</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Game Info</h2>
            <p>
              <strong>Player:</strong> {playerName}
            </p>
            <p>
              <strong>Prompt:</strong> {prompt}
            </p>
            <p>
              <strong>Time Left:</strong> {timeLeft} seconds
            </p>
          </div>

          <DrawingCanvas
            currentColor={currentColor}
            currentSize={currentSize}
            onColorChange={setCurrentColor}
            onSizeChange={setCurrentSize}
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Chat</h2>
          <div className="h-64 overflow-y-auto mb-4 p-2 bg-white rounded">
            {chatMessages.map((message, index) => (
              <p key={index} className="mb-1">
                {message}
              </p>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your guess..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
