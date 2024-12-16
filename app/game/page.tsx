'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function GameSimulation() {
  const [playerName, setPlayerName] = useState('Player 1')
  const [prompt, setPrompt] = useState('Draw a cat')
  const [timeLeft, setTimeLeft] = useState(60)
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [userMessage, setUserMessage] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#000000')
  const [currentSize, setCurrentSize] = useState(5)
  const [points, setPoints] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const router = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      canvas.style.width = `${canvas.offsetWidth}px`
      canvas.style.height = `${canvas.offsetHeight}px`

      const context = canvas.getContext('2d')
      if (context) {
        context.scale(2, 2)
        context.lineCap = 'round'
        context.strokeStyle = currentColor
        context.lineWidth = currentSize
        contextRef.current = context
      }
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1
        } else {
          clearInterval(timer)
          router.push('/game-over')
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      setChatMessages((prevMessages) => [...prevMessages, `You: ${userMessage}`])
      
      if (userMessage.toLowerCase() === 'cat') {
        const earnedPoints = Math.floor(timeLeft * 10)
        setPoints(points + earnedPoints)
        router.push(`/you-won?points=${earnedPoints}`)
      } else {
        // Simulate a response
        setTimeout(() => {
          setChatMessages((prevMessages) => [...prevMessages, 'System: Nice try! Keep guessing.'])
        }, 1000)
      }
      
      setUserMessage('')
    }
  }

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      contextRef.current?.beginPath()
      contextRef.current?.moveTo(x, y)
      setIsDrawing(true)
    }
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      contextRef.current?.lineTo(x, y)
      contextRef.current?.stroke()
    }
  }

  const stopDrawing = () => {
    contextRef.current?.closePath()
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = contextRef.current
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const changeColor = (color: string) => {
    setCurrentColor(color)
    if (contextRef.current) {
      contextRef.current.strokeStyle = color
    }
  }

  const changeBrushSize = (size: number) => {
    setCurrentSize(size)
    if (contextRef.current) {
      contextRef.current.lineWidth = size
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">SketchStar Game</h1>
      
      <section className="mb-8 bg-purple-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>You'll be given a prompt to draw (e.g., "Draw a cat").</li>
          <li>Use the drawing canvas to create your masterpiece within the time limit.</li>
          <li>Other players (simulated in this demo) will try to guess what you're drawing.</li>
          <li>If you're not the artist, type your guesses in the chat box.</li>
          <li>Earn points for correct guesses and for others guessing your drawings correctly.</li>
          <li>The game continues with players taking turns as the artist.</li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">Remember, have fun and be creative with your drawings!</p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Game Info</h2>
            <p><strong>Player:</strong> {playerName}</p>
            <p><strong>Prompt:</strong> {prompt}</p>
            <p><strong>Time Left:</strong> {timeLeft} seconds</p>
            <p><strong>Points:</strong> {points}</p>
          </div>
          
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
                <Button onClick={() => changeColor('#000000')} className="w-8 h-8 bg-black" />
                <Button onClick={() => changeColor('#FF0000')} className="w-8 h-8 bg-red-500" />
                <Button onClick={() => changeColor('#00FF00')} className="w-8 h-8 bg-green-500" />
                <Button onClick={() => changeColor('#0000FF')} className="w-8 h-8 bg-blue-500" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => changeBrushSize(2)} className="w-8 h-8">S</Button>
                <Button onClick={() => changeBrushSize(5)} className="w-8 h-8">M</Button>
                <Button onClick={() => changeBrushSize(10)} className="w-8 h-8">L</Button>
              </div>
              <Button onClick={clearCanvas} className="w-full">Clear Canvas</Button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Chat</h2>
          <div className="h-64 overflow-y-auto mb-4 p-2 bg-white rounded">
            {chatMessages.map((message, index) => (
              <p key={index} className="mb-1">{message}</p>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your guess..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>
      <Button onClick={() => router.push('/game-over')} className="mt-8 w-full">
        End Game
      </Button>
    </div>
  )
}

