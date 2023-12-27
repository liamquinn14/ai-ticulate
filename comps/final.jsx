import React, { useEffect, useState, useRef } from "react";

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
      const APIBody = {
        model: "gpt-3.5-turbo-instruct",
        prompt: `Your task is to give funny feedback to the player based on the score that they achieve in a game. If they score 0 or 1 you must give brutal hilarious and humiliating feedback because they are terrible scores. If they score 2-3 you should also criticise the player but not as much as if they scored 0-1. If they score 4-6 you should congratulate them and motivate them, but acknowledge that their score is still mediocre. If they score 7-8 you must spraise them and if they score 9-10 you should hilariously worship them. Anything above 10 is elite world-record level stuff so go crazy with praise. Overall, your task is to praise/criticise the player based on their score. Act like a sarcastic know-it-all if they are bad, but congratulate them if they do well. Your answer must be less than 20 words. The player's score was ${score}.`,
        temperature: 1.2,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };

      await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + "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",
        },
        body: JSON.stringify(APIBody),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          setFeedback(data.choices[0].text.trim().toUpperCase()); // Positive or negative
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
