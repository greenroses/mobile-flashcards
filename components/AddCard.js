import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { saveDeckTitle, getDeck, addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'

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
)(AddCard)
