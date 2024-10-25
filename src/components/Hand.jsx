import React from "react"
import Card from "./Card"

function Hand({ player, hand, cardRevealIndex, startRevealIndex, cardsDrawn }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2 text-white">{player}</h2>
      <div className="flex space-x-4">
        {hand.map((card, index) => (
          <div
            key={index}
            className={`transform transition-transform duration-500 ${
              cardsDrawn && cardRevealIndex >= startRevealIndex + index
                ? "rotate-y-180"
                : ""
            }`}
          >
            <Card
              drawnCard={
                cardsDrawn && cardRevealIndex >= startRevealIndex + index
                  ? card
                  : null
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hand
