"use strict";

const gameBox = document.getElementById("gameBox");

let cellContent, random;

for(let i=0; i<64 ; i++){
    let newCell = document.createElement("a");
    newCell.setAttribute("class" , "cell");

    random = Math.floor(Math.random()*10);

    switch(random){
        case 9:
            cellContent = "bomb";
            break;
        case 8:
            cellContent = "hidden";
            break;
        default:
            cellContent = random;
    }


    let image = document.createElement("img");
    image.setAttribute("src" , `assets/${cellContent}.png`);
    newCell.appendChild(image);

    gameBox.appendChild(newCell);
}