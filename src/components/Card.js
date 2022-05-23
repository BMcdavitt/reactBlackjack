import React from "react";

export default function Card(props) {

    function cardValue() {

        let card = props.value

        if(card === 1) {
            return("A")
        }
        else if (card === 11){
            return("J")
        }
        else if (card === 12){
            return("Q")
        }
        else if (card === 13){
            return("K")
        }
        else {
            return card
        }

    } 

    function getClassname() {
        if(props.value){
            return("card")
        }
        else{
            return("cardBack")
        }
    }

    let thisCard = cardValue()
    let thisClassName = getClassname()

    
    return(
        <div className={thisClassName}>
            {thisCard}
        </div>
    )
}