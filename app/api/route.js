
export async function POST(params) {
    let request = await params;
    let data = await request.json();
    const userMove = data.move;


    const moves = ["rock", "paper", "scissors"]
    const compMoveIndex = parseInt(Math.random() * 3)
    const computerMove = moves[compMoveIndex];

    let result = "draw";

    if( userMove == "rock") {
        if( computerMove == "paper") {
            result = "computer wins"
        }
        else if( computerMove == "scissors") {
            result = "player wins"
        }
    }
    else if( userMove == "paper") {
        if( computerMove == "rock") {
            result = "player wins"
        }
        else if( computerMove == "scissors") {
            result = "computer wins"
        }
    }
    else if( userMove == "scissors") {
        if( computerMove == "rock") {
            result = "computer wins"
        }
        else if( computerMove == "paper") {
            result = "player wins"
        }
    }
    //console.log(data);
    return Response.json({computerMove, result})

}