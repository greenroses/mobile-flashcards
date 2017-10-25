import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView  } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { getDecks } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { loadDecks } from '../actions'
import { black, white, purple } from '../utils/colors'


class Decks extends Component {

 componentDidMount() {
   let allData = [];
   AsyncStorage.getAllKeys((err, keys) => {
     AsyncStorage.multiGet(keys, (err, stores) => {
       stores.map((result, i, store) => {
         let key = store[i][0];
         let value = store[i][1];
         /* console.log('parsedvalue', JSON.parse(value)) */
         allData.push(JSON.parse(value));
         /* console.log('key', key) */
         /* console.log('value', value) */
         /* console.log('allData', allData) */
         /*this.setState({decks: allData});*/

         this.props.dispatch(loadDecks(allData));
       })
     })
   })
 }


  render() {

    return (
      <View style={styles.container}>
        <ScrollView >
          {this.props.decks.map((item) => (
            <View style={styles.deckContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                  'DeckDetail',
                  { deckTitle: item.title, num: item.questions.length}
                )}
              >
                <Text style={styles.deckTitleText}>{item.title}</Text>
              </TouchableOpacity>
              <Text style={styles.cardNumText}>{item.questions.length} cards</Text>
            </View>
          ))}
        </ScrollView>
      </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  deckTitleText: {
    fontSize: 22,
    textAlign: 'center'
  },
  cardNumText: {
    fontSize: 15,
    textAlign: 'center'
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
)(Decks)
