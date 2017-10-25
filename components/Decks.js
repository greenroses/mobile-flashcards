import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity  } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { getDecks } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { loadDecks } from '../actions'

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
        <Text>All Decks</Text>
        <View>
          {this.props.decks.map((item) => (
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                  'DeckDetail',
                  { deckTitle: item.title, num: item.questions.length}
                )}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
              <Text>{item.questions.length} cards</Text>
            </View>
          ))}
        </View>
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
)(Decks)
