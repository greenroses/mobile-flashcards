import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import AddCard from './AddCard'
import Quiz2 from './Quiz2'
import getDeck from '../utils/api'
import { connect } from 'react-redux'
import { black, white, purple } from '../utils/colors'


const DetailHome = ({ navigation, screenProps }) => (
  <View style={styles.container}>
    <View style={styles.deckContainer}>
      <Text style={styles.deckTitleText}>{screenProps.deckTitle}</Text>
      <Text style={styles.cardNumText}>{screenProps.num} cards</Text>
    </View>
    {/*<Text>{getDeck(screenProps.deckTitle).questions.length}</Text> this does not work*/}
    <TouchableOpacity
      style={styles.iosBtn}
      onPress={() => navigation.navigate('AddCard', {deckTitle: screenProps.deckTitle})}>
      <Text style={styles.btnText}>Add Card</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.iosBtn}
      onPress={() => navigation.navigate('QuizStack', {deckTitle: screenProps.deckTitle})}>
      <Text style={styles.btnText}>Start Quiz</Text>
    </TouchableOpacity>
  </View>
)

const Stack = StackNavigator({
  Home: {
    screen: DetailHome,
    navigationOptions: {
      header: null
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  QuizStack: {
    screen: Quiz2,
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 30,
  },
  deckTitleText: {
    fontSize: 30,
    textAlign: 'center'
  },
  cardNumText: {
    fontSize: 20,
    textAlign: 'center'
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
  },
  btnText: {
    color: white,
    fontSize: 15,
    textAlign: 'center',
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
