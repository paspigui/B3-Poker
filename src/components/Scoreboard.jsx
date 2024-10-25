import React from "react"

const Scoreboard = ({ playerWins, computerWins }) => (
  <div className="flex justify-center mb-4">
    <div className="text-white">
      <p>Victoires du joueur : {playerWins}</p>
      <p>Victoires de l'ordinateur : {computerWins}</p>
    </div>
  </div>
)

export default Scoreboard
