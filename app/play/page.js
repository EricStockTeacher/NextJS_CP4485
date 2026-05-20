"use client"
import {useState} from 'react'

export default function Play() {

  const [ compMove, setCompMove ] = useState("")
  const [ result, setResult] = useState("")
  

  const getResult = async (playerMove) => {

    //fetch api call to the backend
    let response = await fetch("/api", {
        method: "POST",
        headers: { "content-type":"application/json"},
        body: JSON.stringify({"move": playerMove})
    })

    let data = await response.json();

    console.log(data);

    setCompMove("Computer move is " + data.computerMove)
    setResult("Result is "+ data.result)

  }

  return (
    <div>
        <h2>Welcome to the Rock Paper Scissors Game page, get ready to play</h2>
        <button onClick={ () => getResult("rock")   }>Rock</button>
        <button onClick={ () => getResult("paper")   }>Paper</button>
        <button onClick={ () => getResult("scissors")   }>Scissors</button>
        <div>
            <h3 id="computer">{compMove}</h3>
            <h3 id="result">{result}</h3>
        </div>
    </div>
  );
}
