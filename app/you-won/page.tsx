'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import confetti from 'canvas-confetti'

export default function YouWon() {
  const searchParams = useSearchParams()
  const points = searchParams.get('points') || '100'
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
  }, [])

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [showConfetti])

  const handlePlayAgain = () => {
    router.push('/create-room')
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-8 text-purple-600">You Won!</h1>
      <p className="text-2xl mb-4">Congratulations! You guessed correctly!</p>
      <p className="text-3xl font-bold mb-8">Points earned: {points}</p>
      <Button onClick={handlePlayAgain} className="text-lg px-6 py-3">
        Play Again
      </Button>
    </div>
  )
}

