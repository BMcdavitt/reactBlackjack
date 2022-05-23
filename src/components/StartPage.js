import React from "react";

export default function StartPage(props) {

    function dealGame() {
        props.deal()
    }

    function quitGame() {
        props.quit()
    }
    
    return(
        <div className="StartPage">
            <h2>Let's Play Blackjack</h2>
            <div className="startButtons">
                <button onClick={dealGame}>Deal a New Game</button>
                <button onClick={quitGame}> I Quit</button>
            </div>
        </div>
    )
}