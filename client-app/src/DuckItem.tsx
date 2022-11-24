import React from "react";
import { IDuck } from "./Demo";

interface Props {
    duck: IDuck;
}

export default function DuckItem({duck}: Props){
    return (
        <div key={duck.name}>
            <span>{duck.name}</span>
            <button onClick={() => duck.makeSound(duck.name + 'quack')}>Make Sound</button>
        </div>
    )
}