import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { saveDeckTitle, getDeck, addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'
import { black, white, purple } from '../utils/colors'


class AddCard extends Component {

  state = {
    question: '',
    answer: '',
  }

  submit = () => {
    const card = {'question': this.state.question, 'answer': this.state.answer}
    /* const title = 'APPLE'*/
    const title = this.props.navigation.state.params.deckTitle
    addCardToDeck(title, card)
    /* getDeck(title) */
    /*console.log('getDeck in addCard', getDeck(title).length)*/ /*This does not work. error reported*/

    this.props.dispatch(addCard(title, card))
    console.log('use filter to get num',this.props.decks.filter(item => item.title==title)) /*array containing a single item object*/
    console.log('use filter to get num',this.props.decks.filter(item => item.title==title)[0].questions)/*get object out from array*/
    console.log('use filter to get num',this.props.decks.filter(item => item.title==title)[0].questions.length)

    this.setState({
      question: '',
      answer: '',
    })

    this.toHome()
  }

  toHome = () => {
    console.log('toHome called')
    this.props.navigation.dispatch(NavigationActions.back()) /* somehow back({key: 'AddCard'}) does not work*/
  }


  render() {

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          placeholder='Question...'
        />
        <TextInput
          style={styles.input}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
          placeholder='Answer...'
        />
        <TouchableOpacity
          style={styles.iosBtn}
          onPress={this.submit}
          disabled={(!this.state.question) || (!this.state.answer)}  /* disable button when input is empty */
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
    backgroundColor: 'white'
  },
  input: {
    width: 300,
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
    marginTop: 20,
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
)(AddCard)
