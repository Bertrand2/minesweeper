"use strict";

let gameBox = document.getElementById("gameBox");
const newGameButton = document.getElementById("newGameButton");
const input = document.getElementById("bombsInput");

let cells, bombs;

const gridSize = 8;

generateGrid(10);

newGameButton.addEventListener("click" , ()=>{
    gameBox.innerHTML="";
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
        cells[i].addEventListener("click", ()=>{
            revealCell(cells,i);
        });
    }
}

function placeBombs(board, bombAmount){

    console.log(bombAmount);

    bombs = [...Array(bombAmount)].map( ()=>[Math.floor(Math.random()*gridSize), Math.floor(Math.random()*gridSize)]);

    console.log(bombs);

    for(let i=0 ; i<bombAmount ; i++){
        console.log(`${bombs[i][0]} ; ${bombs[i][1]}`);
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

        }
    }

    return gameBox;
}

function createNewCell(content){
    let newCell = document.createElement("a");
    newCell.setAttribute("class" , "cell");
    newCell.setAttribute("isRevealed", "false");

    let image = document.createElement("img");
    //image.style.visibility = "hidden";
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

    return newCell;
}

function revealCell(cells,i){

    if(cells[i].isRevealed === "true"){
        return;
    }

    cells[i].childNodes[1].style.visibility = "hidden";
    cells[i].lastChild.style.visibility = "hidden";

    cells[i].isRevealed = "true";

    console.log(cells[i].firstChild.src)
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
}