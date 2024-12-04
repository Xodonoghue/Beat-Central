import React from "react";
import loading from "../assets/pulse.gif"
import { DotLoader } from "react-spinners";

function Loading(props) {
    return (
        <div className="flex flex-col gap-7">
                <DotLoader color="white"/>
                <h1 className="text-white text-lg">{props.text}</h1>
        </div>
    )
}
export default Loading