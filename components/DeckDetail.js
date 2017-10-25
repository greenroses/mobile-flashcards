import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import AddCard from './AddCard'
import QuizStack from './QuizStack'
import getDeck from '../utils/api'
import { connect } from 'react-redux'


const DetailHome = ({ navigation, screenProps }) => (
  <View style={styles.container}>
    <Text>{screenProps.deckTitle}</Text>
    <Text>{screenProps.num} cards</Text>
    {/*<Text>{getDeck(screenProps.deckTitle).questions.length}</Text> this does not work*/}
    <TouchableOpacity onPress={() => navigation.navigate('AddCard', {deckTitle: screenProps.deckTitle})}>
      <Text>Add Card</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('QuizStack', {deckTitle: screenProps.deckTitle})}>
      <Text>Start Quiz</Text>
    </TouchableOpacity>
  </View>
)

const Stack = StackNavigator({
  Home: {
    screen: DetailHome,
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  QuizStack: {
    screen: QuizStack,
    navigationOptions: {
      title: 'Quiz'
    }
  }
})


class DeckDetail extends Component {
  static  navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
      title: deckTitle
    }
  }

  render() {
    return (
        <Stack screenProps={{deckTitle: this.props.navigation.state.params.deckTitle, num: this.props.decks.filter(item => item.title==(this.props.navigation.state.params.deckTitle))[0].questions.length}}/>
    )
  }
}

/*  num: this.props.navigation.state.params.num}}/>   */
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
)(DeckDetail)
