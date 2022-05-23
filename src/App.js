import React from "react";

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

    if(gameState === "Start") {
        displayPage = <StartPage deal={dealNewGame} quit={leaveTheGame}/>
    }
    else if(gameState === "Quit") {
        displayPage = <QuitPage />
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