import React, { useEffect, useState } from 'react';
import Image from './image.jsx'

export default function Answer({ description, setDescription, gameState, setGameState, charactersLeft, score, setScore, newPrompt, setNewPrompt, record, setRecord, recordBeat, setRecordBeat, timeLeft, setTimeLeft}) {
    
    const [guess, setGuess] = useState("");
    
    function nextQuestion() {
        setGameState('prompt')
    }
    
    function forfeit() {
        setGameState('final')
    }
    
    useEffect(() => {
    if (!localStorage.getItem('record') || Number(score) > Number(localStorage.getItem('record'))) {
                localStorage.setItem('record', score.toString())
                setRecordBeat(true)
            }
        setRecord(localStorage.getItem('record'))
}, [score])

    useEffect(() => {
        async function callOpenAIAPI() {
           
                const APIBody = {
                    model: "gpt-3.5-turbo-instruct",
                    prompt: "Your task is to use your incredible rationale to guess the word being described. Your answer must only be one word long. The correct answer will never be a plural. The answer will never include any word used in the description. The description is: '" + description + "'. What word do you think this is? Sometimes the description will invite you to finish a sentence, by ending the description with a '_'. If the description is incomprehensible, simply respond 'what was that?'",
                    temperature: 0,
                    max_tokens: 500,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0
                };

                await fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + "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"
                },
                body: JSON.stringify(APIBody)
                }).then((data) => {
                return data.json();
                }).then((data) => {
                setGuess(data.choices[0].text.trim().toUpperCase().split("'").join("").split("WHAT WORD DO YOU THINK THIS IS?").join("").trim());
                });


        }

        callOpenAIAPI();
    }, [guess]);
    
    useEffect(() => {
        description.toUpperCase().includes(newPrompt) ? setScore(0) : guess.includes(newPrompt) ? setScore(prevScore => prevScore + 1) : ""}, [guess])

    return (
        
        <div className="flex flex-col justify-center items-center h-screen">
            <h4 className="p-2 m-1 text-xl font-bold text-purple-100"> The AI guesses... </h4>
            <h5 className="p-2 m-1 text-2xl font-bold text-purple-900 bg-purple-200" style={guess.length > 60 ? { fontSize: '0.9rem' } : guess.length > 30 ? { fontSize: '1.25rem' } : {}}> {description.toUpperCase().includes(newPrompt) ? "CHEAT! YOU'VE LOST ALL OF YOUR POINTS!" : description.toUpperCase() === "" ? "OOH A SKIP? 5 SECONDS LOST!" : guess} </h5>
            <Image timeLeft={timeLeft} setTimeLeft={setTimeLeft} guess={guess} setGuess={setGuess} gameState={gameState} setGameState={setGameState} charactersLeft={charactersLeft} nextQuestion={nextQuestion} forfeit={forfeit} description={description} setDescription={setDescription} newPrompt={newPrompt}/>
            {guess.includes(newPrompt) && <h2 className="rounded-md py-1 px-2 m-2 bg-green-700 text-green-100 font-black"> Well Done! Point Scored! </h2> }
            {description.length > 0 && guess && newPrompt !== guess && <h2 className="rounded-md py-1 px-2 m-2 text-red-100 bg-red-600 font-black"> Incorrect answer! Unlucky! </h2> }
            <h2 className="rounded-md bg-purple-200 py-1 px-2 m-1 text-purple-800 font-black"> Score: {score} </h2>
        </div>
    );
}
