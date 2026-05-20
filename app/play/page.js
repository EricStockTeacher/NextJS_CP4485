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
    <div className="flex flex-col items-center gap-8 w-full">
        <h2 className="text-2xl font-bold text-center">Welcome to the Rock Paper Scissors Game page, get ready to play</h2>
        <div className="flex flex-wrap justify-center gap-4">
            <button
                onClick={ () => getResult("rock") }
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors w-32"
            >✊ Rock</button>
            <button
                onClick={ () => getResult("paper") }
                className="px-6 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-colors w-32"
            >🖐 Paper</button>
            <button
                onClick={ () => getResult("scissors") }
                className="px-6 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold rounded-xl shadow-md transition-colors w-32"
            >✌ Scissors</button>
        </div>
        {(compMove || result) && (
            <div className="mt-4 w-full bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-2">
                <h3 id="computer" className="text-lg text-gray-700">{compMove}</h3>
                <h3 id="result" className="text-2xl font-bold text-blue-700">{result}</h3>
            </div>
        )}
    </div>
  );
}
