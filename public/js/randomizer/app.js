//Fisher-Yates Shuffle : https://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle (array) {
  let i = 0
    , j = 0
    , temp = null

  for ( let i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

window.shuffle = shuffle;
