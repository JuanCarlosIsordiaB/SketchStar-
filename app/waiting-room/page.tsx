import { Suspense } from 'react'
import WaitingRoomContent from './waiting-room-content'

export default function WaitingRoom() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Waiting Room</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <WaitingRoomContent />
      </Suspense>
    </div>
  )
}

