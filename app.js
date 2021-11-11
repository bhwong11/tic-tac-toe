//for muiltple games make game a class with a facotry class that can generate multiple games
const game ={
    squares:document.querySelectorAll('.square'),
    squaresInfo:[],
    currentUser:'x',
    winner:null,
    populate: function(){
        this.squaresInfo = [];
        for(let i=0;i<this.squares.length;i++){
            this.squaresInfo.push({
                index:i,
                userInput:null,
            })
            this.squares[i].addEventListener('click',(e)=>this.squareEventListener(i))
        }
    },
    squareEventListener:function(i){
        this.squaresInfo[i].userInput = this.currentUser;
        this.squares[i].innerText = this.currentUser;
        this.checkGame();
        this.currentUserChange();
    },
    removeEventListers:function(){
        for(let i=0;i<this.squares.length;i++){
            this.squares[i].removeEventListener('click',this.squareEventListener)
        }
    },
    currentUserChange:function(){
        if(this.currentUser==='x'){
            this.currentUser = 'o'
        }else{
            this.currentUser = 'x'
        }
        document.querySelector('.turn').innerText=`${this.currentUser}'s turn`;
    },
    checkGame: function(){

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
            console.log(`WINNER ${key}`,winningPatterns[key])
            console.log('X',xInWinningPattern)
            if(xInWinningPattern===3){
                this.winner = 'x'
                break 
            }else if(oInWinningPattern===3){
                this.winner = 'o'
                break
            }
        }

        if(this.winner){
            let winnerH1 = document.createElement('h3')
            winnerH1.innerText = `The Winner is ${this.winner}`
            document.querySelector('.winner').append(winnerH1)
        }
    },
    reset:()=>{
        console.log('adfas')
        for(let i=0;i<game.squares.length;i++){
            game.squares[i].innerText='';
        }
        game.populate();
        document.querySelector('.winner').innerHTML='';
    },
    start: ()=>{
        game.populate();
        this.currentUser = 'x'
        document.querySelector('.turn').innerText=`${this.currentUser}'s turn`;
    },
}

document.querySelector('.start').addEventListener('click',game.start)
document.querySelector('.reset').addEventListener('click',game.reset)