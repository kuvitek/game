import React from "react";
import ReactDOM from "react-dom";
import Header from "./header";
import Main from "./main";
document.addEventListener("DOMContentLoaded", function(event) {
    ReactDOM.render(
        <div>
            <Header/>
            <Main/>
        </div>,
        document.getElementById("root")
    );
})