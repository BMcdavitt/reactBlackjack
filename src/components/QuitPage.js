import React from "react";

export default function QuitPage(props) {

    function returnToCasino() {
        props.return()
    }

    return(
        <div>
            <h2>Hope to see you soon.</h2>

            <button onClick={returnToCasino}>Return to Casino</button>
        </div>
    )
}