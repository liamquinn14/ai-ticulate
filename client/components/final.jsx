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
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="p-2 m-2 text-6xl font-black text-purple-100">
        {" "}
        FINAL SCORE{" "}
      </h1>
      <h2 className="p-2 m-2 text-2xl font-black text-purple-900 bg-purple-200">
        {" "}
        You scored: {score}
      </h2>
      {recordBeat && (
        <h2 className="p-2 m-2 text-2xl font-black bg-green-700 text-green-100">
          {" "}
          THAT'S A NEW HIGH SCORE!{" "}
        </h2>
      )}
      <h4 className="p-2 m-1 text-2xl font-bold italic text-purple-100">
        {" "}
        The AI says...{" "}
      </h4>
      <h2 className="p-2 m-2 text-2xl font-black text-purple-100 w-1/2 flex-wrap text-center">
        {" "}
        {feedback}{" "}
      </h2>
      <button
        onClick={startGame}
        ref={newestInputRef}
        onKeyPress={handleKeyPress}
        className="px-4 py-2 m-4 text-purple-900 bg-purple-200 hover:bg-purple-300 font-black shadow-md rounded"
      >
        {" "}
        PLAY AGAIN{" "}
      </button>
    </div>
  );
}
