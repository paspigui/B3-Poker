export const cards = [7, 8, 9, 10, "J", "Q", "K", "A"]
export const suits = [
  { symbol: "♠", color: "text-black" },
  { symbol: "♣", color: "text-black" },
  { symbol: "♥", color: "text-red-600" },
  { symbol: "♦", color: "text-red-600" },
]

export const createDeck = () => {
  const deck = []
  for (const suit of suits) {
    for (const card of cards) {
      deck.push({ card, suit: suit.symbol, color: suit.color })
    }
  }
  return deck
}
