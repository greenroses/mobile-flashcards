import { AsyncStorage } from 'react-native'




export function getDecks () {
  let allData = [];
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        let key = store[i][0];
        let value = store[i][1];
        /* console.log('parsedvalue', JSON.parse(value)) */
        allData.push(JSON.parse(value))
        /* console.log('key', key) */
        /* console.log('value', value) */
        /* console.log('allData', allData) */
      })
    })
  })
  console.log('allData', allData)
  /*console.log('allData length', allData.length)*/
  return allData
}


export function getDeck (id) { /* Note! getDeck only returns the question array of the item */
  AsyncStorage.getItem(id).then((results) => {
    const data = JSON.parse(results)
    let arr = data['questions']
    console.log('arr in getDeck', arr)
    return arr
  })
}

export function saveDeckTitle (title) {
  return AsyncStorage.setItem(title, JSON.stringify({
    title: title,
    questions: []
  }))
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(title).then((results) => {
    const data = JSON.parse(results)
    let arr = data['questions']
    arr.push(card)
    AsyncStorage.mergeItem(title, JSON.stringify({
      'questions': arr
    }))
    console.log(AsyncStorage.getItem(title))
  })
}
