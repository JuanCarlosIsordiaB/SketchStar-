import { Suspense } from 'react'
import WaitingRoomContent from './waiting-room-content'

export default function WaitingRoom() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Waiting Room</h1>
      
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
      
      <Suspense fallback={<p>Loading...</p>}>
        <WaitingRoomContent />
      </Suspense>
    </div>
  )
}

