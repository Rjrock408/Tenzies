import React from "react"
import Die from "./Componenets/Die";
import ReactDOM from "react-dom/client"
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  
  const [dice, setDice] = React.useState(allNewDice)
  const [tenzies, setTenzis] = React.useState(false)
  const [count, setCount] = React.useState(0)
  // storing number of times clicked data in local storage
  React.useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count))
    },[count])

  const numberOfClick = localStorage.getItem('count')

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstHeld = dice[0].value
    const allSameValue = dice.every(die => die.value === firstHeld)
    if(allSameValue && allHeld) {
      setTenzis(true)
    }
  }, [dice])

  // generate an array of numbers 1 - 6 with individual ids
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false
      }
  }
  //generate array of 10 elements in which the random array contaning 1- 6 is pushed
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }
// Roll the non held dice untill the last tile and player won
  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
        die:
        generateNewDie()
      }))
    } else {
      setTenzis(false)
      setDice(allNewDice)
    }
  }
  function yourScore() {
    return numberOfClick;
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  function clickCount(){
    setCount(count + 1)
    console.log(count)
  }

  function countAndRoll(){
    clickCount()
    rollDice()
  }
  // passing props to the die element
  const diceElement = dice.map(die => (
  <Die 
  value={die.value} 
  key={die.id} 
  isHeld={die.isHeld} 
  holdDice={() => holdDice(die.id)}
  />))

  return (
        <main>
          {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
          <h1 className="winner">{ tenzies && "You Won"}</h1>
          <h1 className="title">Tenzies</h1>
          <p className="sub-text">Roll untill all the dices are same. Click the dice to freeze it at current value between rolls</p>
          <div className="dice-container">
          {diceElement}
          </div>
          <button className="roll-button" onClick={countAndRoll}>{tenzies ? "New Game" : "Roll"}</button>
          
        </main>
        
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(root);