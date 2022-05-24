import React from "react";

import Hand from "./Hand.js"

export default function PlayPage() {

    const [gameState, updateGameState] = React.useState({
        dealerCards: [Math.floor(Math.random() * 13 + 1), Math.floor(Math.random() * 13 + 1)],
        playerCards: [Math.floor(Math.random() * 13 + 1), Math.floor(Math.random() * 13 + 1)],
        handState: "Play",
        bank: 1000,
        currentBet: 50
    })

    function dealACard(hand) {
        
        let newCard = Math.floor(Math.random() * 13 + 1)
        let newHand = [...hand, newCard]

        return(newHand)
    }

    function hit() {
        let newHand = dealACard(gameState.playerCards)
        let newBank = gameState.bank

        if (handValue(newHand) === 21) {
            let newDealerHand = completeDealerHand()
            newBank += gameState.currentBet

            updateGameState({...gameState, 
                    dealerCards: newDealerHand,
                    playerCards: newHand,
                    handState: "Blackjack",
                    bank: newBank})
        }
        else if (handValue(newHand) > 21) {

            newBank -= gameState.currentBet

            updateGameState({...gameState, 
                    playerCards: newHand,
                    handState: "Bust",
                    bank: newBank})
        }
        else {
            updateGameState({...gameState,
                    playerCards: newHand})
        }
    }
    
    function handValue(hand) {
        
        let handValue = 0
        let aceCount = 0

        for(let i = 0; i < hand.length; i++) {

            if(hand[i] > 10) {
                handValue += 10
            }
            else if(hand[i] === 1) {
                aceCount ++
            }
            else {
                handValue += hand[i]
            }
        }

        for(let i = 0; i < aceCount; i++)
        {
            if((handValue + 11) > 21) {
                handValue += 1
            }
            else {
                handValue += 11
            }
        }

        return handValue
    }

    function showHand(hand, key) {

        return(
            <div>
                <Hand thisHand={hand} handType={key} handState={gameState.handState} key={key}/>
            </div>
        )
    }

    function completeDealerHand() {

        let thisHand = gameState.dealerCards
        let i = thisHand.length

        while (handValue(thisHand) < 17) {
            thisHand[i++] = Math.floor(Math.random() * 13 + 1)
        }

        return(thisHand)

    }

    function stand() {
        let completeHand = completeDealerHand()
        let dealerHandValue = handValue(completeHand)
        let playerHand = handValue(gameState.playerCards)
        let newBank = gameState.bank
        let newState = gameState.handState
        let newBet = gameState.currentBet

        if(dealerHandValue > 21) {
            newBank += gameState.currentBet
            newState = "Win"
        }
        else if (dealerHandValue > playerHand) {
            newBank -= gameState.currentBet
            newState = "Lose"

            if(gameState.currentBet > newBank) {
                newBet = newBank
            }
        }
        else if (dealerHandValue === playerHand) {
            newState = "Push"
        }
        else {
            newBank += gameState.currentBet
            newState = "Win"
        }

        updateGameState({...gameState, 
            dealerCards: completeHand, 
            handState: newState,
            bank: newBank,
            currentBet: newBet})
    }

    function newHand() {
        updateGameState({...gameState, 
            dealerCards: [Math.floor(Math.random() * 13 + 1), Math.floor(Math.random() * 13 + 1)],
            playerCards: [Math.floor(Math.random() * 13 + 1), Math.floor(Math.random() * 13 + 1)],
            handState: "Play"})
    }

    let dealerHandDisplay = showHand(gameState.dealerCards, "dealer")
    let playerHandDisplay = showHand(gameState.playerCards, "player")

        function gameStateDisplay() {
        if(gameState.handState === "Play")
        {
            return 
        }
        return( `( ${gameState.handState} )`)
    }

    function increaseBet() {

        let newBet = gameState.currentBet + 50

        if(newBet > gameState.bank) {
            newBet = gameState.bank
        }

        updateGameState({...gameState, 
            currentBet: newBet})
    }

    function decreaseBet() {

        let newBet = gameState.currentBet - 50
        if(newBet < 0) {
            newBet = 0
        }

        updateGameState({...gameState, 
            currentBet: newBet})
    }
    

    return (
        <div>
            <div className="dealerHand"> 
                <h2>Dealer hand : {gameState.handState !== "Play" && handValue(gameState.dealerCards)} </h2>
                {dealerHandDisplay}
            </div>
            
            <div className="playerHand">
                <h2>Player hand : {handValue(gameState.playerCards)} {gameStateDisplay()}</h2>
                {playerHandDisplay}
            </div>

            {gameState.handState === "Play" && 
                <div className="buttonDiv">
                    <button onClick={hit}>Hit</button>
                    <button onClick={stand}>Stand</button>
                </div>
            }

            {gameState.handState !== "Play" &&
                <div className="buttonDiv">
                    <button onClick={newHand}>Deal</button>
                </div>
            }

            <div className="playerBank">
                <h2>Bank : {gameState.bank} Bet: {gameState.currentBet} 
                    &nbsp;&nbsp;
                    <i className="arrow up" onClick={increaseBet}/>
                    &nbsp;
                    <i className="arrow down" onClick={decreaseBet}/>
                </h2>
            </div>

        </div>
    )
}