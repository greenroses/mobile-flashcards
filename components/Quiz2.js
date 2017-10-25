import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { getDailyReminderValue, clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { black, white, purple, green, red } from '../utils/colors'


class Quiz2 extends Component {

  state = {
    title: '',
    questions: [],
    index: 0,
    total: 0,
    score: 0,
    showingAnswer: false,
    buttonText: 'Answer',
    currentSentence:'',
    showResult: false,
  }

  componentDidMount() {
    const title = this.props.screenProps.deckTitle
    this.setState({title: title})
    const questions = this.props.decks.filter(item => item.title==title)[0].questions
    this.setState({questions: questions})
    this.setState({total: questions.length})
    if ( questions.length != 0 ) {
      this.setState({currentSentence: questions[this.state.index].question})
    }
    else { /* if no question, display result directly */
      this.setState({showResult: true})
    }
  }

  switch = () => {
    if (this.state.showingAnswer == false) {
      this.setState({
        currentSentence: this.state.questions[this.state.index].answer,
        showingAnswer: true,
        buttonText: 'Question',
      })
    }
    else {
      this.setState({
        currentSentence: this.state.questions[this.state.index].question,
        showingAnswer: false,
        buttonText: 'Answer',
      })
    }
  }


  correctAnswer = () => {
    let score = this.state.score + 1
    this.setState({ score: score })
    /* move on to next question if there is any */
    /* if no more questions, show the score and option to go back or quiz again */
    let index = this.state.index + 1
    if (index < this.state.total) {
      this.setState({ index: index })
      this.setState({
        showingAnswer: false,
        buttonText: 'Answer',
        currentSentence: this.state.questions[index].question,
      })
    }
    else { /* quiz completed, display the score etc */
      this.setState({showResult: true})
      clearLocalNotification().then(setLocalNotification)
    }
  }

  incorrectAnswer = () => {
    let score = this.state.score
    let index = this.state.index + 1
    if (index < this.state.total) {
      this.setState({ index: index })
      this.setState({
        showingAnswer: false,
        buttonText: 'Answer',
        currentSentence: this.state.questions[index].question,
      })
    }
    else {
      this.setState({showResult: true})
      clearLocalNotification().then(setLocalNotification)
    }
  }

  restartQuiz = () => {
    if ( this.state.questions.length != 0 ) {
      this.setState({
          index: 0,
          score: 0,
          showingAnswer: false,
          buttonText: 'Answer',
          showResult: false,
          currentSentence: this.state.questions[0].question,
        })
      let testnum = this.state.index
      let score = this.state.score
    } else {
      /* do nothing */
    }
  }

  /* go back to DeckDetail page */
  backtoDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back()) /* somehow back({key: 'AddCard'}) does not work*/
  }

  /* use conditional rendering to display quiz and result */
  render() {

    return (
      <View style={styles.container}>
        {this.state.showResult ? (
          <View style={styles.deckContainer}>
            <Text style={styles.largeText}>Score: {this.state.score}</Text>
            <TouchableOpacity
              style={styles.iosBtn}
              onPress={this.restartQuiz}>
              <Text style={styles.btnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iosBtn}
              onPress={this.backtoDeck}>
              <Text style={styles.btnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.smallText}>{this.state.total - this.state.index}/{this.state.total}</Text>
            <View style={styles.deckContainer}>
              <Text style={styles.largeText}>{this.state.currentSentence}</Text>
            </View>
            <View style={styles.switchContainer}>
              <TouchableOpacity
                onPress={this.switch}>
                <Text style={styles.redText}>{this.state.buttonText}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.correctBtn}
              onPress={this.correctAnswer}>
              <Text style={styles.btnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.incorrectBtn}
              onPress={this.incorrectAnswer}>
              <Text style={styles.btnText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 10,
    marginTop:50,
  },
  switchContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 50,
  },
  largeText: {
    fontSize: 30,
    textAlign: 'center'
  },
  smallText: {
    fontSize: 20,
    textAlign: 'center'
  },
  redText: {
    fontSize: 15,
    textAlign: 'center',
    color: red,
  },
  correctBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
  },
  incorrectBtn: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
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
)(Quiz2)
