import React from "react"

function Card({ drawnCard }) {
  return (
    <div className="w-32 h-48 perspective">
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${
          drawnCard ? "flip-card" : ""
        }`}
      >
        <div
          className={`absolute w-full h-full bg-white rounded-lg flex flex-col items-center justify-center transform rotate-y-180`}
        >
          {drawnCard && (
            <>
              <div className={`text-3xl ${drawnCard.color}`}>
                {drawnCard.card}
              </div>
              <div className={`text-3xl ${drawnCard.color}`}>
                {drawnCard.suit}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
