export const NEW_DECK = 'NEW_DECK'
export const ADD_CARD = 'ADD_CARD'
export const LOAD_DECKS = 'LOAD_DECKS'

export function loadDecks( data ) {
  return {
    type: LOAD_DECKS,
    data
  }
}
export function newDeck (title) {
  return {
    type: NEW_DECK,
    title,
  }
}

export function addCard (title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  }
}
