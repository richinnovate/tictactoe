 // array that displays a variable state as an array with three spaces across and down. Represents both rows and columns
const state = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
// defines the variable x with a value of 1
const X = 1
// defies the variable o with a value of 2
const O = 2
// defies the cellValues as an object with key value pairs ex. o is the key and the empty string is the value associated with that key
const cellValues = { 0: '', 1: 'X', 2: 'O' }
// defines the global variable playertTurn and initialized it to x that can be accessed anywhere in the program and r3ferences whose turn it is
let playerTurn = X
let winner = false
// drawBoard is a function (=>) that contains a for loop. This for loop draws the board. j represents the columns, i represents rows. The first part is the initializer, the second time is the condition and the third part is the afterthought or incrementer
const drawBoard = () => {
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
// the variable col is equal to row i column j like x and y coordinates
      const col = state[i][j]
// selects against a css selector in this case refers to the table and table rows the nth child of i+1 and the table data nth child j+1. (represents which cell we are in on the table/tic tac toe board).
      const cell = document.querySelector(`table tr:nth-child(${i + 1}) td:nth-child(${j + 1}).clicked`
      )
// the text.content will become the value stored in each cell which is refered by the coloumn value. If column = 0 we get back an empty string. If col = 1 we get back and x. If the col = 2 we get back an o.
      cell.textContent = cellValues[col]
    }
  }
// the message that is below our board will be set to whose turn it curretly is using string interpolstion on the cell values based on the player turns.
  document.querySelector('.message').textContent = `It's ${cellValues[playerTurn]}'s turn.`

  if (winner) {
    let hiddenModal = document.querySelector('.modal.hidden')
    if (hiddenModal) {
      hiddenModal.className = 'modal'
    }
  }
}
// play functions that we pass in a row or column and a player when we call it. Based on the row and column we know exactly where thw x and y coordinates are set to where that player is
const play = (row, col) => {
  if (state[row][col] === 0) {
   state[row][col] = playerTurn
   if (checkForWinner()) {
     winner = true
     drawBoard()
     console.log(playerTurn + 'Wins!')
   }
   else playerTurn = playerTurn === X ? O : X
 }
}
const checkForWinner = () => {
  let arr = [
   [state[0][0], state[0][1], state[0][2]],
   [state[1][0], state[1][1], state[1][2]],
   [state[2][0], state[2][1], state[2][2]],
   [state[0][0], state[1][0], state[2][0]],
   [state[0][1], state[1][1], state[2][1]],
   [state[0][2], state[1][2], state[2][2]],
   [state[0][0], state[1][1], state[2][2]],
   [state[0][2], state[1][1], state[2][0]]
 ]

  for (let i = 0; i < arr.length; i++) {
  let won = arr[i].every(function (m) { return m === playerTurn })
    if(won) { return true }
  }
}
// inititialize the first function we call when the DOM is loaded
const init = () => {
// look through the table rows
  const rows = document.querySelectorAll('tr')
  for (let i = 0; i < rows.length; i++) {
// loop through table data(cells)
    const cols = rows[i].querySelectorAll('td')
    for (let j = 0; j < cols.length; j++) {

// establishes that we can click on the table data in the current cell
      cols[j].addEventListener('click', () => {
        play(i, j)
// draws x or o in each cell and changes the player's turn
        drawBoard()

      })
    }
  }
  drawBoard()
}

document.addEventListener('DOMContentLoaded', init)
