import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import QuizStack  from './QuizStack'
import Quiz from './Quiz'
import { MyQuizStack } from './QuizStack'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'


class QuizResult extends Component {

  toDeck = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Main',
      params: { deckTitle: this.props.navigation.state.params.deckTitle },
      action: NavigationActions.navigate({ routeName: 'DeckDetail'})
    }))
  }


  render() {

    return (

      <View>
        <Text>quiz result</Text>
        <Text>Number of questions answered correctly: {this.props.navigation.state.params.score}</Text>

        <TouchableOpacity onPress={() => this.props.navigation.navigate(
          'Quiz',
          { deckTitle: this.props.navigation.state.params.deckTitle}
        )}>
          <Text>Restart Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.toDeck()}>
          <Text>Back to Deck</Text>
        </TouchableOpacity>
      </View>


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
