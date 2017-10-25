import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { saveDeckTitle, getDeck, getDecks } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { newDeck } from '../actions'


class NewDeck extends Component {
  state = {
    title: '',
  }

  submit = () => {
    const title = this.state.title
    saveDeckTitle(title)
    AsyncStorage.getAllKeys((err, keys) => {
      console.log(keys)
    })

    this.props.dispatch(newDeck(title))

    this.props.navigation.navigate(
      'DeckDetail',
      { deckTitle: this.state.title}
    )

    this.setState({title: ''})

  }


  render() {

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder='Deck title...'
        />
        <TouchableOpacity
          onPress={this.submit}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
)(NewDeck)
