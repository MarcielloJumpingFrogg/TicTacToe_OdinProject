let ticTacToe_square = [] 
let buttons 
const scoreDisplay = document.querySelectorAll('.score')
let numOfDraw = 0;

const displayRoundOf = document.getElementById('displayRoundOf') 

function swapVisibility() {
    const intro = document.getElementById('interface')
    const container = document.getElementById('container')

    intro.classList.toggle('invisible')
    intro.classList.toggle('visible')
    container.classList.toggle('invisible')
    container.classList.toggle('grid')
}




function createPlayer (named, sign) 
{ 
    let characterColor    
    let backgroundColorBody
    let signColor



    const player = {
        name : named && named !== '' ? named : `player${sign}`,
        sign,
        score : 0, 
        image : `url('${sign}.svg')`
    } 


    if(sign == 'X')
    {
        signColor = 'red'
        backgroundColorBody = 'rgb(255, 100, 100)' 
        characterColor = 'black'
    }
    if (sign == 'O')
    {
        signColor = 'blue'
        backgroundColorBody = 'rgb(90, 135, 255)'
        characterColor = 'white'
    }
    

    player.win = (destination) => {
        player.score++;
        document.body.style.backgroundColor = backgroundColorBody
        destination.style.color = signColor
        destination.innerText = `Wins: ${player.name} (${player.sign})`
    } 


    player.showScore = () => {
        score
    };
    player.setRound = (destination) => {
        document.body.style.backgroundColor = backgroundColorBody
        destination.style.backgroundColor = signColor
        destination.style.color = characterColor
        destination.textContent = `Round of: ${player.name} (${player.sign})`
    }

    return player
}




const xplayer = createPlayer('PlayerX', 'X') 
const oplayer = createPlayer('PlayerO', 'O')

function changeScores () {
    scoreDisplay.forEach( e => {
        if(xplayer.score != 0 || oplayer != 0 || numOfDraw != 0)
            {
                e.classList.remove('invisible')
                e.textContent = `${xplayer.name}(X): ${xplayer.score} ${oplayer.name}(O): ${oplayer.score} Draw: ${numOfDraw}` 
            } 
    })
}



function squareGen (n)
{     
    const gameBoard = document.getElementById('gameBoard') 
    
    function removeChildren()
    {
        let child = gameBoard.lastElementChild
        while(child)
        {
            gameBoard.removeChild(child)
            child = gameBoard.lastElementChild
        }
    }
    removeChildren()
    const addToPage = (x, y) => {
                const el = document.createElement('button') 
                el.classList.add('ticTacToe')
                el.dataset.x = x
                el.dataset.y = y
                gameBoard.appendChild(el) 
            } 
    gameBoard.style.gridTemplateColumns = `repeat(${n}, 1fr)`;  //changes the size to adapt it to the number of squares 
    gameBoard.style.gridTemplateRows = `repeat(${n}, 1fr)`;

    ticTacToe_square = []
    for( let i = 0; i < n; i++)
    {
        let temp = []
        for( let j = 0; j < n; j++)
        {
            temp.push('') 
            addToPage(j, i)
        }
        ticTacToe_square.push(temp)
    } 

    buttons = document.querySelectorAll('.ticTacToe')
    
    played(buttons)
}


const submit = document.querySelectorAll('.submit') 
submit.forEach(element => {
    element.addEventListener('click', e =>
{
    e.preventDefault()    
    

    swapVisibility()
    const size = document.getElementById('size').value

    squareGen(size) 
    

    xplayer.name = document.getElementById('player1').value
    oplayer.name = document.getElementById('player2').value

    xplayer.setRound(displayRoundOf)
    changeScores()
})
});



function Moving()
{
    const h1 = document.getElementById('h1') 
    function check(line)        //check the 'line' variable, if all of the elements are equals then it will return the winner with the symbol used that won
{
    for(let i = 0 ; i < (line.length - 1); i++)
    { 
        if(line[i] !== '')
        {
            if(line[i] == line[i + 1])
            {
                if(i == (line.length - 2) )  //to see if it's in the last - 1 box, however since .lenght doesnt start with 0 but with 1 it needs to be -2
                {
                    swapVisibility()

                    if(line[0] == xplayer.sign)
                    { 
                        xplayer.win(h1)
                        
                    }
                    else if(line[0] == oplayer.sign)
                    {
                        oplayer.win(h1)

                    }
                    changeScores()
                    return true;
                }
            }
            else
                break
            

        }
        else{
            
            break
        }
    } 
}

function checkSpace()       //checks if there are no more spaces available, if that's the case it will return a console.log with the statement for a draw
{
    let row =0
    let column =0 
    for(column = 0; column < ticTacToe_square.length; column++)
    { 
        for( row = 0; row < ticTacToe_square.length; row++)
        { 
            if(ticTacToe_square[column][row] === '')
            { 
                return false
            }
        }
    }
    swapVisibility()
    numOfDraw++;
        h1.style.color = 'green'
        h1.textContent = 'Draw'
    
    return true
}


    const axis = () => 
    {
        for (let y = 0; y < ticTacToe_square.length; y++)
        {
            let vertical = []
            let ori = []
            for (let x = 0; x < ticTacToe_square[y].length; x++)
            {
                vertical.push(ticTacToe_square[x][y])
                ori.push(ticTacToe_square[y][x])
                
            }
            check(ori)
            check(vertical)
        }
        

    }

    const upLeftToDownRight = () =>
    {
        let diagonal = [] 
        for ( let i = 0; i < ticTacToe_square.length; i++)
        {
            
            diagonal.push(ticTacToe_square[i][i]) 
        }
        check(diagonal)
    }

    const upRightToDownLeft = () =>
    {
        let diagonal = []
        for ( let i = 0, j = ticTacToe_square.length - 1; i < ticTacToe_square.length; i++, j--)
        {
            diagonal.push(ticTacToe_square[j][i])
        }
        check(diagonal)
    }

    if(checkSpace())        
            {
                return 
            }

    return axis(), upLeftToDownRight(), upRightToDownLeft()
} 



function played(buttons)
{
    let counter = 0
    buttons.forEach(element => {
    element.addEventListener('click', ele => {
        console.log(xplayer.name)

        function round(box)
        {                


            if((counter % 2) == 0)
            {
                
                box.style.backgroundImage = xplayer.image

                oplayer.setRound(displayRoundOf)

                ticTacToe_square[box.dataset.y] [box.dataset.x] = 'X'
            }
            else
            {

                box.style.backgroundImage = oplayer.image

                xplayer.setRound(displayRoundOf)
                ticTacToe_square[box.dataset.y] [box.dataset.x] = 'O'
            }
            counter++;

            
            Moving() 
        }


        box = ele.target



        if (box.style.backgroundImage === '')
            round(box)
    })
});
}

