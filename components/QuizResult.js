import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import QuizStack  from './QuizStack'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import { connect } from 'react-redux'

const QuizResultHome = ({ navigation, screenProps }) => (
  <View>
    <Text>quiz result</Text>
    <Text>Number of questions answered correctly: {screenProps.score}</Text>

    <TouchableOpacity onPress={() => navigation.navigate(
      'QuizStack',
      { deckTitle: screenProps.deckTitle}
    )}>
      <Text>Restart Quiz</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate(
      'DeckDetail',
      { deckTitle: screenProps.deckTitle}
    )}>
      <Text>Back to Deck</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate(
      'AddCard',
      { deckTitle: screenProps.deckTitle}
    )}>
      <Text>add card test</Text>
    </TouchableOpacity>

  </View>
)


const ResultStack = StackNavigator({
  Home: {
    screen: QuizResultHome,
  },
  AddCard: {
    screen: AddCard,
  },

  QuizStack: {
    screen: QuizStack,
  },
  DeckDetail: {
    screen: DeckDetail,
  }
})



class QuizResult extends Component {
  render() {
    return (
        <ResultStack screenProps={{deckTitle: this.props.navigation.state.params.deckTitle, score: this.props.navigation.state.params.score}}/>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    margin: 50,
  }
})


function mapStateToProps (state) { /*must use state, not decks here, because decks undefined.*/

  return {
    decks: Object.keys(state).map((title) => (
      state[title]
    )),
  }
}
export default connect(
  mapStateToProps
)(QuizResult)
