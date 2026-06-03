export default function GameButton({move, getResult}) {
    let styles = "";
    if( move == "paper") {
        styles = "px-6 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-colors w-32";
    }
    else if( move == "scissors") {
        styles = "px-6 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold rounded-xl shadow-md transition-colors w-32";
    }
    else {
        styles = "px-6 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors w-32";
    }

    return (
            <button
                onClick={ () => getResult(move) }
                className={styles}
            >✊ {move}</button>
    )
}