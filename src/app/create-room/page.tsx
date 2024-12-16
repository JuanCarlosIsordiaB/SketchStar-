'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateRoom() {
  const [roomName, setRoomName] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [maxPlayers, setMaxPlayers] = useState(4)
  const router = useRouter()

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would create the room on the server here
    // For now, we'll just simulate it by navigating to the waiting room
    router.push(`/waiting-room?room=${roomName}&player=${playerName}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create a New Room</h1>
      <form onSubmit={handleCreateRoom} className="max-w-md mx-auto space-y-4">
        <div>
          <Label htmlFor="roomName">Room Name</Label>
          <Input
            id="roomName"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="playerName">Your Name</Label>
          <Input
            id="playerName"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="maxPlayers">Max Players</Label>
          <Input
            id="maxPlayers"
            type="number"
            min="2"
            max="8"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(Number(e.target.value))}
            required
          />
        </div>
        <Button type="submit" className="w-full">Create Room</Button>
      </form>
    </div>
  )
}

