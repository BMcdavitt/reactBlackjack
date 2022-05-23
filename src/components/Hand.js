import React from "react";
import Card from "./Card.js"

export default function Hand(props) {


    let handString = []

     for(let i=0; i<props.thisHand.length; i++)
     {
         if((props.handState === "Play") && (props.handType === "dealer") && (i === 1)) {
             handString[i] = <Card key={i}/>
         }
         else {
            handString[i] = <Card value={props.thisHand[i]} key={i} />
         }
     }

    return(
        <div className="hand">
            {handString}
        </div>
    )
}