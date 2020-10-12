"use strict";

let gameBox = document.getElementById("gameBox");
const newGameButton = document.getElementById("newGameButton");
const input = document.getElementById("bombsInput");
const timer = document.getElementById("timer");

let cells, bombs, gameRunning = false, time, timeInterval;

const gridSize = 8;

generateGrid(10);

newGameButton.addEventListener("click" , ()=>{
    gameRunning = false;
    gameBox.innerHTML="";
    document.getElementById("gameover").style.opacity = 0;
    document.getElementById("gameover").style.visibility = "hidden";
    document.getElementById("victory").style.opacity = 0;
    document.getElementById("victory").style.visibility = "hidden";
    generateGrid(parseInt(input.value));
});

function generateGrid(bombAmount = 10){

    let board = [...Array(gridSize)].map( ()=>[...Array(gridSize)] );
    board.map( x=>Array(gridSize));

    board = placeBombs(board, bombAmount);
    
    board = generateNumbers(board);

    gameBox = displayGrid(gameBox, board);

    cells = document.getElementsByClassName("cell");

    for(let i=0 ; i<cells.length ; i++){
        cells[i].childNodes[1].addEventListener("contextmenu", (event)=>{
            placeFlag(cells[i]);
            event.preventDefault();
        });
        cells[i].childNodes[1].addEventListener("click", ()=>{
            revealCell(cells,i,bombAmount);
        });
        cells[i].childNodes[3].addEventListener("contextmenu", (event)=>{
            removeFlag(cells[i]);
            event.preventDefault();
        });
    }

    time = 0;
    gameRunning = true;
    timeInterval = setInterval(timing, 1000);

}

function placeBombs(board, bombAmount){

    bombs = [...Array(bombAmount)].map( ()=>[Math.floor(Math.random()*gridSize), Math.floor(Math.random()*gridSize)]);

    for(let i=0 ; i<bombAmount ; i++){
        board[bombs[i][0]][bombs[i][1]] = "bomb";
    }

    return board;
}

function generateNumbers(board){
    let bombCounter;

    for(let i=0 ; i<gridSize ; i++){
        for(let j=0 ; j<gridSize ; j++){
            bombCounter = 0;
            if(board[i][j] !== "bomb"){
                (i>0 && j>0 && board[i-1][j-1] === "bomb") ? bombCounter++ : 0 ;
                (i>0 && board[i-1][j] === "bomb") ? bombCounter++ : 0 ;
                (i>0 && j<gridSize-1 && board[i-1][j+1] === "bomb") ? bombCounter++ : 0 ;
                (j>0 && board[i][j-1] === "bomb") ? bombCounter++ : 0 ;
                (j<gridSize-1 && board[i][j+1] === "bomb") ? bombCounter++ : 0 ;
                (j>0 && i<gridSize-1 && board[i+1][j-1] === "bomb") ? bombCounter++ : 0 ;
                (i<gridSize-1 && board[i+1][j] === "bomb") ? bombCounter++ : 0 ;
                (i<gridSize-1 && j<gridSize-1 && board[i+1][j+1] === "bomb") ? bombCounter++ : 0 ;
    
                board[i][j] = bombCounter;
            }
        }
    }

    return board;
}

function displayGrid(gameBox, board){
    for(let i=0 ; i<gridSize ; i++){
        for(let j=0 ; j<gridSize ; j++){

            gameBox.appendChild(createNewCell(board[i][j]));
            gameBox.lastChild.isRevealed = "false";
            console.log(gameBox.lastChild.isRevealed);

        }
    }

    return gameBox;
}

function createNewCell(content){
    let newCell = document.createElement("a");
    newCell.setAttribute("class" , "cell");
    newCell.setAttribute("isRevealed", "false");

    let image = document.createElement("img");
    image.setAttribute("src" , `assets/${content}.png`);
    newCell.appendChild(image);

    let hoverImage = document.createElement("img");
    hoverImage.setAttribute("class" , "hover");
    hoverImage.setAttribute("src" , `assets/hover.png`);
    newCell.appendChild(hoverImage);

    let hiddenImage = document.createElement("img");
    hiddenImage.setAttribute("class" , "hidden");
    hiddenImage.setAttribute("src" , `assets/hidden.png`);
    newCell.appendChild(hiddenImage);

    let flagImage = document.createElement("img");
    flagImage.style.visibility = "hidden";
    flagImage.setAttribute("src" , `assets/flag.png`);
    newCell.appendChild(flagImage);

    return newCell;
}

function revealCell(cells,i,bombAmount){

    checkGameEnd(cells,i,bombAmount);

    if(cells[i].isRevealed === "true"){
        return;
    }

    cells[i].childNodes[1].style.visibility = "hidden";
    cells[i].childNodes[2].style.visibility = "hidden";

    cells[i].isRevealed = "true";

    if(cells[i].firstChild.src.endsWith("0.png")){
        if(i%gridSize === 0){
            if(Math.floor(i/gridSize) === 0){
                revealCell(cells,i+1);
                revealCell(cells,i+8);
                revealCell(cells,i+9);
            }else if(Math.floor(i/gridSize) === gridSize-1){
                revealCell(cells,i-8);
                revealCell(cells,i-7);
                revealCell(cells,i+1);
            }else{
                revealCell(cells,i-8);
                revealCell(cells,i-7);
                revealCell(cells,i+1);
                revealCell(cells,i+8);
                revealCell(cells,i+9);
            }
        }else if(i%gridSize === gridSize-1){
            if(Math.floor(i/gridSize) === 0){
                revealCell(cells,i-1);
                revealCell(cells,i+7);
                revealCell(cells,i+8);
            }else if(Math.floor(i/gridSize) === gridSize-1){
                revealCell(cells,i-9);
                revealCell(cells,i-8);
                revealCell(cells,i-1);
            }else{
                revealCell(cells,i-9);
                revealCell(cells,i-8);
                revealCell(cells,i-1);
                revealCell(cells,i+7);
                revealCell(cells,i+8);
            }
        }else{
            if(Math.floor(i/gridSize) === 0){
                revealCell(cells,i-1);
                revealCell(cells,i+1);
                revealCell(cells,i+7);
                revealCell(cells,i+8);
                revealCell(cells,i+9);
            }else if(Math.floor(i/gridSize) === gridSize-1){
                revealCell(cells,i-9);
                revealCell(cells,i-8);
                revealCell(cells,i-7);
                revealCell(cells,i-1);
                revealCell(cells,i+1);
            }else{
                revealCell(cells,i-9);
                revealCell(cells,i-8);
                revealCell(cells,i-7);
                revealCell(cells,i-1);
                revealCell(cells,i+1);
                revealCell(cells,i+7);
                revealCell(cells,i+8);
                revealCell(cells,i+9);
            }
        }
    }

    checkGameEnd(cells,i,bombAmount);
}

function checkGameEnd(cells,i,bombAmount){
    //defeat
    if(cells[i].firstChild.src.endsWith("bomb.png")){
        console.log("Defeat !");
        document.getElementById("gameover").style.visibility = "visible";
        document.getElementById("gameover").style.opacity = "100%";
        gameRunning = false;
    }
    //victory
    let remainingCells = 0;

    for (let i = 0; i < cells.length; i++) {
        if(cells[i].isRevealed === "false"){
            remainingCells++;
        }
    }

    if(remainingCells === bombAmount){
        console.log("Victory !");
        document.getElementById("victory").style.visibility = "visible";
        document.getElementById("victory").style.opacity = "100%";
        gameRunning = false;
    }
}

function placeFlag(cell){
    cell.childNodes[3].style.visibility = "visible";
}

function removeFlag(cell){
    cell.childNodes[3].style.visibility = "hidden";
}

function timing() {
    if (!gameRunning) {
        clearInterval(timeInterval);
    } else {
        time++;
        timer.innerText = `${time}s`;
    }
}