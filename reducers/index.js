import { LOAD_DECKS, NEW_DECK, ADD_CARD } from '../actions'


const initialDecksState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function decks (state = initialDecksState, action) {
  switch (action.type) {
    case LOAD_DECKS :
      var decks = {};
      for (let i in action.data) {
        decks[action.data[i].title] = action.data[i]
      }
      return decks

    case NEW_DECK :
      var newdeck = {};
      newdeck.title = action.title;
      newdeck.questions = [];
      return {
        ...state,
        [action.title]: newdeck
      }

    case ADD_CARD :
      if (!state[action.title]) return state
      var arr = state[action.title].questions;
      arr.push(action.card);
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: arr
        }
      }
    default :
      return state
  }
}

export default decks
