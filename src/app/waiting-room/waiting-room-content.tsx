'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function WaitingRoomContent() {
  const [players, setPlayers] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomName = searchParams.get('room')
  const playerName = searchParams.get('player')

  useEffect(() => {
    // Simulate players joining the room
    const timer = setInterval(() => {
      if (players.length < 4) {
        setPlayers(prev => [...prev, `Player ${prev.length + 2}`])
      } else {
        clearInterval(timer)
      }
    }, 2000)

    return () => clearInterval(timer)
  }, [players])

  const handleStartGame = () => {
    // In a real application, you would start the game on the server here
    // For now, we'll just navigate to the game page
    router.push('/game')
  }

  return (
    <div className="max-w-md mx-auto">
      <p className="text-center mb-4">Room: {roomName}</p>
      <h2 className="text-xl font-semibold mb-2">Players:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>{playerName} (You)</li>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <p className="mb-4">Waiting for {Math.max(0, 4 - players.length - 1)} more player(s)...</p>
      <Button
        onClick={handleStartGame}
        disabled={players.length < 3}
        className="w-full"
      >
        Start Game
      </Button>
    </div>
  )
}

