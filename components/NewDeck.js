import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { saveDeckTitle, getDeck, getDecks } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { newDeck } from '../actions'
import { black, white, purple } from '../utils/colors'



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
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>What is the title of your new deck?</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder='Deck title...'
        />
        <TouchableOpacity
          style={styles.iosBtn}
          onPress={this.submit}
          disabled={!this.state.title}  /* disable button when input is empty to avoid error */
        >
          <Text style={styles.btnText}>Submit</Text>
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
    backgroundColor: 'white'
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  infoText: {
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderRadius: 7,
    margin: 20,
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
)(NewDeck)
