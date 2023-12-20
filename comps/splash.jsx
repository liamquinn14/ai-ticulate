import React from 'react';

export default function Splash({gameState, setGameState}) {
    
    function startGame() {
        setGameState('prompt')
    }
    
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="p-2 m-1 text-6xl font-black text-purple-100"> AI-TICULATE </h1>
            <h2 className="p-1 m-1 text-2xl italic text-yellow-300 font-bold text-center w-2/3 flex-wrap text-center"> 1 minute. Only 100 characters. </h2>
             <h2 className="p-1 m-1 text-2xl italic text-yellow-300 font-bold text-center w-2/3 flex-wrap text-center"> Test your language skills against the computer! </h2> 
            <button onClick={startGame} className="overflow-hidden px-4 py-2 m-4 text-purple-900 bg-purple-200 hover:bg-purple-300 font-black rounded shadow-md"> START GAME </button>
        </div>
    )
}