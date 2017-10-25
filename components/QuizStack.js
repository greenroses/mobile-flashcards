import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import Quiz from './Quiz'
import QuizResult from './QuizResult'



const Stack = StackNavigator({
  Home: {
    screen: Quiz,
  },
  QuizResult: {
    screen: QuizResult,
  },
})

export default class QuizStack extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>

        <Stack screenProps={{deckTitle: this.props.navigation.state.params.deckTitle}}/>
      </View>
    )
  }
}
