import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to SketchStar</h1>
        <p className="text-xl mb-8">The ultimate online drawing game where creativity meets competition!</p>
        <Link href="/game" className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300">
          Play Now
        </Link>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Draw, Guess, Win!</h2>
          <p>SketchStar challenges your artistic skills and quick thinking. Draw pictures, guess others' creations, and climb the leaderboard!</p>
        </div>
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Game Screenshot Placeholder</span>
        </div>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="grid md:grid-cols-3 gap-4">
          <li className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Real-time Multiplayer</h3>
            <p>Play with friends or match with players worldwide</p>
          </li>
          <li className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Diverse Categories</h3>
            <p>From animals to famous landmarks, test your knowledge</p>
          </li>
          <li className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Leaderboards</h3>
            <p>Compete for the top spot and show off your skills</p>
          </li>
        </ul>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Sketch?</h2>
        <p className="mb-4">Join thousands of players and start your artistic journey today!</p>
        <Link href="/game" className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300">
          Play Now
        </Link>
      </section>
    </div>
  )
}

