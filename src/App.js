import React from "react";
import './style.css';

import StartPage from "./components/StartPage.js"
import QuitPage from "./components/QuitPage.js"
import PlayPage from "./components/PlayPage.js"


export default function App() {

    let [gameState, updateGameState] = React.useState("Start")

    let displayPage = ""

    function dealNewGame() {
        updateGameState("Play")

    }

    function leaveTheGame() {
        updateGameState("Quit")

    }

    function backToStart() {
        updateGameState("Start")
    }

    if(gameState === "Start") {
        displayPage = <StartPage deal={dealNewGame} quit={leaveTheGame}/>
    }
    else if(gameState === "Quit") {
        displayPage = <QuitPage return={backToStart}/>
    }
    else if (gameState === "Play") {
        displayPage = <PlayPage />
    }

    return(
        <div className="App">
            {displayPage}       
        </div>
    )

}