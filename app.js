let ticTacToe_square = [] 
let buttons 
let playerX
let playerO
const roundOf = document.getElementById('roundOf') 

function swapVisibility() {
    const intro = document.getElementById('interface')
    const container = document.getElementById('container')

    intro.classList.toggle('invisible')
    intro.classList.toggle('visible')
    container.classList.toggle('invisible')
    container.classList.toggle('grid')
}


function createPlayer (name, sign) 
{ 
    let characterColor
    let named
    let backgroundColorBody

    if(name == null || name === '')
    {
        named = `player ${sign}`; 
    }
    else
    {
        named = name
    }

    let image = `${sign}.svg`

    if (sign == 'tie')
    {
        characterColor = 'green'
        backgroundColorBody = 'lightgreen'
    }
    else if(sign == 'X')
    {
        characterColor = 'red'
        backgroundColorBody = 'rgb(255, 100, 100)'
    }
    else if (sign == 'O')
    {
        characterColor = 'blue'
        backgroundColorBody = 'rgb(90, 135, 255)'
    }
    
    let score = 0

    const win = () => score++;
    const showScore = () => score;

    return {named, image, sign, characterColor, backgroundColorBody, win, showScore}
}

let player0 = createPlayer('', 'X')
player0.win()
console.log(player0.showScore())

/* function scoreCounter() {
    let playerX = 0
    let playerO = 0
    let tie = 0 

    const playerXShow = () => playerX;
    const playerOShow = () => playerO;
    const tieShow = () => tie;

    const playerXWin = () => playerX++;
    const playerOWin = () => playerO++;
    const tied = () => tie++;

    return {playerOWin, playerXWin, tied, playerXShow, playerOShow, tieShow}
} 
const score = scoreCounter()
*/


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
    

    function createPlayer(player, sign) 
    {
        return {
            player,
            sign,
        }
    } 
    playerX = createPlayer(document.getElementById('player1').value, 'X')
    playerO = createPlayer(document.getElementById('player2').value, 'O')

    roundOf.textContent = `ROUND OF: ${playerX.player} (${playerX.sign})`
    roundOf.style.backgroundColor = 'red'

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

                    if(line[0] == playerX.sign)
                    { 
                        h1.innerText = (`WINS ${playerX.player}`);
                        h1.style.color = 'red'
                        score.playerXWin() 
                        
                    }
                    else if(line[0] == playerO.sign)
                    {
                        h1.innerText = (`WINS ${playerO.player}`);
                        h1.style.color = 'blue'
                        score.playerOWin()

                    }
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
    h1.innerText = 'DRAW'
    h1.style.color = 'green'
    score.tied()
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
        

        function round(box)
        {                


            if((counter % 2) == 0)
            {
                
                box.style.backgroundImage = "url('Red_X.svg')" 


                roundOf.textContent = `ROUND OF: ${playerO.player} (${playerO.sign})`
                roundOf.style.backgroundColor = 'blue'
                document.body.style.backgroundColor = 'lightblue'
                ticTacToe_square[box.dataset.y] [box.dataset.x] = 'X'
            }
            else
            {

                box.style.backgroundImage = "url('Map-circle-blue.svg')"

                roundOf.textContent = `ROUND OF: ${playerX.player} (${playerX.sign})`
                roundOf.style.backgroundColor = 'red'
                document.body.style.backgroundColor = 'rgb(255, 118, 118)'
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

