'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

interface Player {
  name: string;
  score: number;
}

export default function GameOver() {
  const [players, setPlayers] = useState<Player[]>([])
  const router = useRouter()

  useEffect(() => {
    // Simulate fetching game results
    setPlayers([
      { name: 'You', score: 1200 },
      { name: 'Player 2', score: 950 },
      { name: 'Player 3', score: 1100 },
      { name: 'Player 4', score: 800 },
    ])
  }, [])

  const handlePlayAgain = () => {
    router.push('/create-room')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Game Over</h1>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Final Scores:</h2>
        <ul className="mb-8 space-y-2">
          {players.sort((a, b) => b.score - a.score).map((player, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{player.name}</span>
              <span className="font-semibold">{player.score} points</span>
            </li>
          ))}
        </ul>
        <Button onClick={handlePlayAgain} className="w-full">
          Play Again
        </Button>
      </div>
    </div>
  )
}

