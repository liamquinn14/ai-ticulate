import React, { useEffect, useState } from "react";
import Image from "./image.jsx";
import config from "../configs/config.js";

const { SERVER_URL } = config;

export default function Answer({
  description,
  setDescription,
  gameState,
  setGameState,
  charactersLeft,
  score,
  setScore,
  newPrompt,
  setNewPrompt,
  record,
  setRecord,
  recordBeat,
  setRecordBeat,
  timeLeft,
  setTimeLeft,
}) {
  const [guess, setGuess] = useState("");

  function nextQuestion() {
    setGameState("prompt");
  }

  function forfeit() {
    setGameState("final");
  }

  useEffect(() => {
    if (
      !localStorage.getItem("record") ||
      Number(score) > Number(localStorage.getItem("record"))
    ) {
      localStorage.setItem("record", score.toString());
      setRecordBeat(true);
    }
    setRecord(localStorage.getItem("record"));
  }, [score]);

  useEffect(() => {
    async function callOpenAIAPI() {
      await fetch(`${SERVER_URL}ai-completions/description`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: description,
        }),
      })
        .then((data) => data.json())
        .then(({ success, data }) => {
          if (!success) return; //TODO handle error
          setGuess(
            data
              .trim()
              .toUpperCase()
              .split("'")
              .join("")
              .split("WHAT WORD DO YOU THINK THIS IS?")
              .join("")
              .trim()
          );
        })
        .catch(
          (err) => console.log(err) //TODO handle error
        );
    }

    callOpenAIAPI();
  }, [guess]);

  useEffect(() => {
    description.toUpperCase().includes(newPrompt)
      ? setScore(0)
      : guess.includes(newPrompt)
      ? setScore((prevScore) => prevScore + 1)
      : "";
  }, [guess]);

  return (
    <div className="grid place-items-center gap-3 md:gap-10 ">
      <div>
        <h4 className="p-2 m-1 text-3xl md:text-5xl font-bold text-purple-100">
          The AI guesses...
        </h4>
      </div>
      <div className="grid place-items-center">
        <h5 className="p-2 m-1 text-lg md:text-2xl md:w-1/2 text-center font-bold text-purple-900 bg-purple-200">
          {description.toUpperCase().includes(newPrompt)
            ? "CHEAT! YOU'VE LOST ALL OF YOUR POINTS!"
            : description.toUpperCase() === ""
            ? "OOH A SKIP? 5 SECONDS LOST!"
            : guess}
        </h5>
        {description.length > 0 && guess && newPrompt !== guess && (
          <h2 className="rounded-md py-1 px-2 m-2 text-red-100 bg-red-600 font-black">
            Incorrect answer! Unlucky!
          </h2>
        )}
        {guess.includes(newPrompt) && (
          <h2 className="rounded-md py-1 px-2 m-2 bg-green-700 text-green-100 font-black">
            Well Done! Point Scored!
          </h2>
        )}
      </div>
      <Image
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        guess={guess}
        setGuess={setGuess}
        gameState={gameState}
        setGameState={setGameState}
        charactersLeft={charactersLeft}
        nextQuestion={nextQuestion}
        forfeit={forfeit}
        description={description}
        setDescription={setDescription}
        newPrompt={newPrompt}
      />
    </div>
  );
}
