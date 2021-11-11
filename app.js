//for muiltple games make game a class with a facotry class that can generate multiple games
let gamesCount = 0;

class Game{
    constructor(id){
        this.id = id;
        this.squares=[];
        this.squaresInfo=[];
        this.currentUser='x';
        this.winner=null;
    }
    populate=function(){
        this.squares=document.querySelectorAll(`.square-${this.id}`)
        this.squaresInfo = [];
        for(let i=0;i<this.squares.length;i++){
            this.squaresInfo.push({
                index:i,
                userInput:null,
            })
            this.squares[i].addEventListener('click',(e)=>this.squareEventListener(i))
        }
    };
    squareEventListener=function(i){
        if(!this.winner){
            this.squaresInfo[i].userInput = this.currentUser;
            this.squares[i].innerText = this.currentUser;
            this.checkGame();
            this.currentUserChange();
        }
    };
    currentUserChange=function(){
        if(this.currentUser==='x'){
            this.currentUser = 'o'
        }else{
            this.currentUser = 'x'
        }
        document.querySelector(`.turn-${this.id}`).innerText=`${this.currentUser}'s turn`;
    };
    checkGame=function(){

        let winningPatterns = {
            row1:[],
            row2:[],
            row3:[],
            column1:[],
            column2:[],
            column3:[],
            diagnol1:[],
            diagnol2:[],
        }

        for(let i =0;i<this.squaresInfo.length;i++){
            if(i<3){
                winningPatterns.row1.push(this.squaresInfo[i].userInput)
            }
            if(i>2 && i<6){
                winningPatterns.row2.push(this.squaresInfo[i].userInput)
            }
            if(i>6 && i<9){
                winningPatterns.row3.push(this.squaresInfo[i].userInput)
            }
            if(i%3===0){
                winningPatterns.column1.push(this.squaresInfo[i].userInput)
            }
            if((i-1)%3===0){
                winningPatterns.column2.push(this.squaresInfo[i].userInput)
            }
            if((i-2)%3===0){
                winningPatterns.column3.push(this.squaresInfo[i].userInput)
            }
            if(i%4===0){
                winningPatterns.diagnol1.push(this.squaresInfo[i].userInput)
            }
            if(i%2===0 && i!== 0 && i!==this.squaresInfo.length-1){
                winningPatterns.diagnol2.push(this.squaresInfo[i].userInput)
            }

        }
        for(let key in winningPatterns){
            let xInWinningPattern = winningPatterns[key].filter(e=>e==='x').length
            let oInWinningPattern = winningPatterns[key].filter(e=>e==='o').length
            if(xInWinningPattern===3){
                this.winner = 'x'
                break 
            }else if(oInWinningPattern===3){
                this.winner = 'o'
                break
            }
        }

        //check if completely filled
        if(this.squaresInfo.map(e=>e.userInput).filter(e=>e==='o' || e==='x').length===9){
            this.winner = 'CAT'
        }

        if(this.winner){
            let winnerH1 = document.createElement('h3')
            winnerH1.innerText = `The Winner is ${this.winner}`
            document.querySelector(`.winner-${this.id}`).append(winnerH1)
        }
    };
    reset=()=>{
        for(let i=0;i<this.squares.length;i++){
            this.squares[i].innerText='';
            this.squaresInfo[i].userInput=null;
        }
        document.querySelector(`.turn-${this.id}`).innerHTML='';
        document.querySelector(`.winner-${this.id}`).innerHTML='';
    };
    start=()=>{
        this.currentUser = 'x'
        if(!this.winner){
            this.populate();
        }
        this.winner = null;
        document.querySelector(`.turn-${this.id}`).innerText=`${this.currentUser}'s turn`;
    };
    render=function(){
        let gameBoard = document.createElement('div')
        gameBoard.innerHTML = `<div class="board board${this.id}">
            <div class="square square-${this.id} s-one"></div>
            <div class="square square-${this.id} s-two"></div>
            <div class="square square-${this.id} s-three"></div>
            <div class="square square-${this.id} s-four"></div>
            <div class="square square-${this.id} s-five"></div>
            <div class="square square-${this.id} s-six"></div>
            <div class="square square-${this.id} s-seven"></div>
            <div class="square square-${this.id} s-eight"></div>
            <div class="square square-${this.id} s-nine"></div>
        </div>
        <div class="start-${this.id}">Start</div>
        <div class="reset-${this.id}">Reset</div>
        <div class="turn-${this.id}"></div>
        <div class="winner-${this.id}"></div>`

        document.querySelector('body').append(gameBoard)
        document.querySelector(`.start-${this.id}`).addEventListener('click',this.start)
        document.querySelector(`.reset-${this.id}`).addEventListener('click',this.reset)
    }
}

let createGame = document.querySelector('.create-game')
createGame.addEventListener('click',function(e){
    let game = new Game(gamesCount+1)
    gamesCount++
    game.render();
})