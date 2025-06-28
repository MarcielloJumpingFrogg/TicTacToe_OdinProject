//let ticTacToe_square = [
//    ['s', '', 'x' ],
//    ['', 'x', '' ],
//    ['x', '', 'x' ]
//] 
//

//now let's create it dynamically with a function to add the numbers

let ticTacToe_square = []
function numbers ()
{

    const createField = (n) =>
    {
        for( let i = 0; i < n; i++)
        {
            let temp = []
            for( let j = 0; j < n; j++)
            {
                temp.push('')
                console.log(temp)
            }
            ticTacToe_square.push(temp)
        } 
    }


    /* function createField (n)
    {
        for( let i = 0; i < n; i++)
        {
            let temp = []
            for( let j = 0; j < n; j++)
            {
                temp.push('')
                console.log(temp)
            }
            ticTacToe_square.push(temp)
        }
    } */
    return createField
}
numbers.createField(3)
console.log(ticTacToe_square)



function Moving()
{
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
        for ( let i = 0, j = 2; i < ticTacToe_square.length; i++, j--)
        {
            diagonal.push(ticTacToe_square[j][i])
        }
        check(diagonal)
    }

    return axis(), upLeftToDownRight(), upRightToDownLeft()
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
    console.log('no more space to play, it\'s a draw')
    return true
}


function check(line)        //check the 'line' variable, if all of the elements are equals then it will return the winner with the symbol used that won
{
    for(let i = 0 ; i < (line.length - 1); i++)
    { 
        if(line[i] !== '')
        {
            if(line[i] == line[i + 1])
            {
                if(i == (line.length - 2) )
                {
                    console.log(`wins ${line[0]}`);
                    return true;
                }
            }
            else
                break
            

        }
        else{
            if(checkSpace())        //questo dovrebbe essere messo sull'input
            {
                return 
            }
            break
        }
    } 
}

Moving()