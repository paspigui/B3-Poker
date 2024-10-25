import React, { useState } from "react"
import Hand from "./components/Hand"
import Scoreboard from "./components/Scoreboard"
import { createDeck, cards } from "./utils/deck"

function App() {
  const [remainingDeck, setRemainingDeck] = useState(createDeck())
  const [playerHand, setPlayerHand] = useState([])
  const [computerHand, setComputerHand] = useState([])
  const [cardRevealIndex, setCardRevealIndex] = useState(-1)
  const [cardsDrawn, setCardsDrawn] = useState(false)
  const [playerWins, setPlayerWins] = useState(0)
  const [computerWins, setComputerWins] = useState(0)

  const drawCards = () => {
    if (remainingDeck.length < 8) {
      alert(
        "Il n'y a plus de cartes dans le deck ! Veuillez Appuyer sur le bouton Reset pour recommencer."
      )
    }

    const newPlayerHand = []
    const newComputerHand = []
    const newRemainingDeck = [...remainingDeck]

    for (let i = 0; i < 4; i++) {
      const playerCardIndex = Math.floor(
        Math.random() * newRemainingDeck.length
      )
      newPlayerHand.push(newRemainingDeck[playerCardIndex])
      newRemainingDeck.splice(playerCardIndex, 1)
    }

    for (let i = 0; i < 4; i++) {
      const computerCardIndex = Math.floor(
        Math.random() * newRemainingDeck.length
      )
      newComputerHand.push(newRemainingDeck[computerCardIndex])
      newRemainingDeck.splice(computerCardIndex, 1)
    }

    setPlayerHand(newPlayerHand)
    setComputerHand(newComputerHand)
    setRemainingDeck(newRemainingDeck)
    setCardRevealIndex(-1)
    setCardsDrawn(true)
  }

  const revealCards = () => {
    let index = 0

    const revealNextCard = () => {
      if (index < 8) {
        setCardRevealIndex(index)
        index++
        setTimeout(revealNextCard, 1000)
      } else {
        calculateWinner()
      }
    }

    revealNextCard()
  }

  const calculateWinner = () => {
    const playerHandResult = evaluateHand(playerHand)
    const computerHandResult = evaluateHand(computerHand)

    if (playerHandResult.rank > computerHandResult.rank) {
      setPlayerWins((prev) => prev + 1)
      alert("Le joueur a gagné ! Il a eu un(e) " + playerHandResult.name)
    } else if (computerHandResult.rank > playerHandResult.rank) {
      setComputerWins((prev) => prev + 1)
      alert("L'ordinateur a gagné ! Il a eu un(e) " + computerHandResult.name)
    } else if (computerHandResult.rank === playerHandResult.rank) {
      if (playerHandResult.rank === 0) {
        if (playerHandResult.highCard > computerHandResult.highCard) {
          setPlayerWins((prev) => prev + 1)
          alert(
            "Le joueur a gagné ! Il a eu la carte la plus haute: " +
              playerHandResult.highCard
          )
        } else if (computerHandResult.highCard > playerHandResult.highCard) {
          setComputerWins((prev) => prev + 1)
          alert(
            "L'ordinateur a gagné ! Il a eu la carte la plus haute: " +
              computerHandResult.highCard
          )
        } else {
          alert("Égalité !")
        }
      } else {
        alert("Égalité !")
      }
    }
  }

  const evaluateHand = (hand) => {
    const cardCount = {}
    hand.forEach((card) => {
      cardCount[card.card] = (cardCount[card.card] || 0) + 1
    })

    const pairs = Object.values(cardCount).filter((count) => count === 2).length
    const brelan = Object.values(cardCount).includes(3)
    const carre = Object.values(cardCount).includes(4)

    if (carre) {
      return { rank: 4, name: "carré" }
    } else if (brelan) {
      return { rank: 3, name: "brelan" }
    } else if (pairs === 2) {
      return { rank: 2, name: "double paire" }
    } else if (pairs === 1) {
      return { rank: 1, name: "paire" }
    } else {
      const highCard = Math.max(
        ...hand.map((card) =>
          typeof card.card === "number"
            ? card.card
            : cards.indexOf(card.card) + 7
        )
      )
      return { rank: 0, highCard: highCard }
    }
  }

  const resetGame = () => {
    setRemainingDeck(createDeck())
    setPlayerHand([])
    setComputerHand([])
    setCardRevealIndex(-1)
    setCardsDrawn(false)
    setPlayerWins(0)
    setComputerWins(0)
  }

  return (
    <div className="bg-green-700 h-screen">
      <h1 className="text-4xl font-bold text-center text-white">
        Simple Poker
      </h1>
      <div className="flex justify-between m-4 text-white">
        <Hand
          player="Me"
          hand={playerHand}
          cardRevealIndex={cardRevealIndex}
          startRevealIndex={0}
          cardsDrawn={cardsDrawn}
        />
        <Hand
          player="Computer"
          hand={computerHand}
          cardRevealIndex={cardRevealIndex}
          startRevealIndex={4}
          cardsDrawn={cardsDrawn}
        />
      </div>

      <Scoreboard playerWins={playerWins} computerWins={computerWins} />

      <div className="flex justify-center">
        <div className="flex justify-center space-x-4 mt-8">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={drawCards}
          >
            Draw Cards
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={revealCards}
            disabled={!cardsDrawn}
          >
            Reveal
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={resetGame}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
