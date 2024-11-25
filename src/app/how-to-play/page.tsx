

export default function HowToPlay() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        How to Play SketchStar
      </h1>

      <div className="max-w-3xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Game Basics</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <strong>Join a Game:</strong> Click &quot;Play Now&quot; on the
              homepage to enter a game lobby.
            </li>
            <li>
              <strong>Drawing Round:</strong> One player is chosen to draw a
              given word while others guess.
            </li>
            <li>
              <strong>Guessing:</strong> Type your guesses in the chat. Be quick
              - faster guesses earn more points!
            </li>
            <li>
              <strong>Switching Roles:</strong> After each round, a new player
              becomes the artist.
            </li>
            <li>
              <strong>Scoring:</strong> Earn points for correct guesses and for
              others guessing your drawings.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tips for Success</h2>
          <ul className="list-disc list-inside space-y-4">
            <li>
              Use different colors and thicknesses to make your drawings clear.
            </li>
            <li>Start with the main features of the object when drawing.</li>
            <li>Look for context clues in the drawing when guessing.</li>
            <li>
              Don&apos;t give away the answer in chat if you&apos;re not
              drawing.
            </li>
            <li>
              Practice regularly to improve your drawing speed and accuracy.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Game Modes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Classic Mode</h3>
              <p>
                The standard game with rotating artists and multiple rounds.
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Speed Sketch</h3>
              <p>
                Rapid-fire rounds with shorter drawing times. Think and draw
                fast!
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Team Battle</h3>
              <p>Collaborate with teammates to outscore the opposing team.</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Custom Rooms</h3>
              <p>Create private rooms with friends and set your own rules.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
