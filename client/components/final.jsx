import React, { useEffect, useState, useRef } from "react";
import config from "../configs/config";

const { SERVER_URL } = config;

export default function Final({
  gameState,
  setGameState,
  score,
  charactersLeft,
  setCharactersLeft,
  setScore,
  setTimeLeft,
  endRoundChars,
  setEndRoundChars,
  record,
  setRecord,
  recordBeat,
  setRecordBeat,
}) {
  const newestInputRef = useRef(null);

  useEffect(() => {
    newestInputRef.current.focus();
  }, []);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      startGame();
    }
  }

  const [feedback, setFeedback] = React.useState("");
  useEffect(() => {
    async function callOpenAIAPI() {
      await fetch(`${SERVER_URL}ai-completions/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: score,
        }),
      })
        .then((data) => data.json())
        .then(({ success, data }) => {
          if (!success) return; //TODO handle error from server
          setFeedback(data.trim().toUpperCase()); // Positive or negative
        })
        .catch((err) => {
          console.log(err); //TODO handle error from request
        });
    }

    callOpenAIAPI();
  }, []);

  function startGame() {
    setGameState("prompt");
    setTimeLeft(60);
    setCharactersLeft(100);
    setEndRoundChars(100);
    setScore(0);
    document.body.classList.add("bg-purple-400");
    setRecordBeat(false);
  }
  return (
    <>
      <div className="m-4">
        <h1 className="text-5xl font-black text-purple-100 p-5">FINAL SCORE</h1>
        <div className="pt-5">
          <h2 className="p-2 w-1/6 mx-auto text-center font-black text-purple-900 bg-purple-200 rounded-full text-4xl">
            {score}
          </h2>
        </div>
      </div>
      {recordBeat && (
        <h2 className="p-2 m-2 text-xl font-black bg-green-700 text-green-100">
          THAT'S A NEW HIGH SCORE!
        </h2>
      )}

      <div className="p-5">
        <h4 className="text-4xl text-center p-2 font-bold italic text-purple-200">
          The AI says...
        </h4>
        <h2 className="text-lg text-purple-100 w-11/12 md:w-1/2 mx-auto">
          {feedback}
        </h2>
      </div>

      <button
        onClick={startGame}
        ref={newestInputRef}
        onKeyPress={handleKeyPress}
        className="px-4 py-2 text-lg m-4 text-purple-900 bg-purple-200 hover:bg-purple-300 font-black shadow-md rounded"
      >
        PLAY AGAIN
      </button>
    </>
  );
}
