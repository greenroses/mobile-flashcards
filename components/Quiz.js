import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import QuizResult from './QuizResult'


class Quiz extends Component {

  state = {
    title: '',
    questions: [],
    index: 0,
    total: 0,
    score: 0,
    showingAnswer: false,
    buttonText: 'answer',
    currentSentence:'',
  }

  componentDidMount() {
    const title = this.props.screenProps.deckTitle
    this.setState({title: title})
    console.log(title)
    console.log(this.props.decks)
    console.log(this.props.decks.filter(item => item.title==title))
    console.log(this.props.decks.filter(item => item.title==title)[0])
    const questions = this.props.decks.filter(item => item.title==title)[0].questions
    this.setState({questions: questions})
    this.setState({total: questions.length})
    this.setState({currentSentence: questions[this.state.index].question})
  }

  switch = () => {
    if (this.state.showingAnswer == false) {
      this.setState({
        currentSentence: this.state.questions[this.state.index].answer,
        showingAnswer: true,
        buttonText: 'question',
      })
    }
    else {
      this.setState({
        currentSentence: this.state.questions[this.state.index].question,
        showingAnswer: false,
        buttonText: 'answer',
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
        buttonText: 'answer',
        currentSentence: this.state.questions[index].question,
      })
    }
    else {
      /* route to QuizResult page*/
      this.props.navigation.navigate(
        'QuizResult',
        { deckTitle: this.state.title, score: score}  /* somehow score: this.state.score does not reflect the latest score */
      )

    }
  }

  incorrectAnswer = () => {
    let score = this.state.score
    let index = this.state.index + 1
    if (index < this.state.total) {
      this.setState({ index: index })
      this.setState({
        showingAnswer: false,
        buttonText: 'answer',
        currentSentence: this.state.questions[index].question,
      })
    }
    else {
      /* route to QuizResult page*/

      this.props.navigation.navigate(
          'QuizResult',
          { deckTitle: this.state.title, score: score}
        )
    }
  }


  render() {

    return (
      <View>
        <Text>QUIZ</Text>
        <Text>Score {this.state.score}</Text>
        <Text>{this.state.total - this.state.index}/{this.state.total}</Text>
        <Text>{this.state.currentSentence}</Text>
        <TouchableOpacity onPress={this.switch}>
          <Text>{this.state.buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.correctAnswer}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.incorrectAnswer}>
          <Text>Incorrect</Text>
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
)(Quiz)
