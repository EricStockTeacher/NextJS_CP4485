"use client"
import {useState, useEffect, useReducer} from 'react'
import GameButton from "@/app/components/gameButton.js"

export default function Play() {
  const [ compMove, setCompMove ] = useState("")
  const [ result, setResult] = useState("")
  const [dogImage, setDogImage] = useState("");
  const [dogCount, setDogCount] = useReducer((dogCount) => dogCount + 1, 0);



  //add code to grab weather data and pull down from an api
  //const response = await fetch("https://dog.ceo/api/breeds/image/random");
  //const data = await response.json();
  //console.log(data);

  const requestOptions = {
  method: "GET",
  redirect: "follow"
};

useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        setDogImage(result.message);
    })
     .catch((error) => console.error(error))
}, [dogCount] );
 
  
  //let compMove = "";
  //let result = "";
  

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
            <GameButton getResult = {getResult} move={"rock"}></GameButton>
            <GameButton getResult = {getResult} move={"paper"} ></GameButton>
            <GameButton getResult = {getResult} move={"scissors"} ></GameButton>
        </div>
        {dogImage && (
            <img src={dogImage} />
        )}
        {(compMove || result) && (
            <div className="mt-4 w-full bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-2">
                <h3 id="computer" className="text-lg text-gray-700">{compMove}</h3>
                <h3 id="result" className="text-2xl font-bold text-blue-700">{result}</h3>
            </div>
        )}
       <button
                onClick={ () => setDogCount()}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-colors w-32"
    >Update Dog</button>
    <h2>The dog count is {dogCount} </h2>
    </div>
  );
}
