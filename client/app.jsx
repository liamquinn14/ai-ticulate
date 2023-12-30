import React, { useEffect, useState } from "react";
import Splash from "./components/splash.jsx";
import Prompt from "./components/prompt.jsx";
import Answer from "./components/answer.jsx";
import Final from "./components/final.jsx";
import { Header } from "./components/header.jsx";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState("splash");
  const [description, setDescription] = useState("");
  const [currentCharacters, setCurrentCharacters] = useState(0);
  const [charactersLeft, setCharactersLeft] = useState(100);
  const [endRoundChars, setEndRoundChars] = useState(100);
  const [score, setScore] = useState(0);
  const [newPrompt, setNewPrompt] = useState("");
  const [record, setRecord] = useState(0);
  const [recordBeat, setRecordBeat] = useState(false);

  useEffect(() => {
    const classes = [
      "bg-purple-100",
      "bg-purple-500",
      "bg-purple-600",
      "bg-purple-700",
      "bg-purple-800",
      "bg-purple-900",
    ];

    classes.forEach((cls) => document.body.classList.remove(cls));

    if (score > 10) {
      document.body.classList.add("bg-purple-900");
    } else if (score > 8) {
      document.body.classList.add("bg-purple-800");
    } else if (score > 6) {
      document.body.classList.add("bg-purple-700");
    } else if (score > 4) {
      document.body.classList.add("bg-purple-600");
    } else if (score > 2) {
      document.body.classList.add("bg-purple-500");
    } else {
      document.body.classList.add("bg-purple-100");
    }
  }, [score]);

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

  const timerStyles = {
    margin: "1rem",
    padding: "1rem",
    position: "absolute",
    top: 0,
    left: 0,
  };

  const lowTimerStyles = {
    backgroundColor: "#e53e3e",
    color: "#fff5f5",
  };

  const scorePositionStyles = {
    margin: "1rem",
    padding: "1rem",
    position: "absolute",
    top: 0,
    right: 0,
  };
  const canShowScore = gameState !== "splash" && gameState !== "final";
  return (
    <div className="grid place-content-center place-items-center h-screen font-mono bg-purple-400">
      <Header
        canShowTimer={timeLeft > 0 && gameState && canShowScore}
        canShowScore={canShowScore}
        canShowHighScore={canShowScore}
        timeLeft={timeLeft}
        score={score}
        record={record}
      />

      {gameState === "splash" && (
        <Splash gameState={gameState} setGameState={setGameState} />
      )}

      {gameState === "prompt" && (
        <Prompt
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          gameState={gameState}
          setGameState={setGameState}
          description={description}
          setDescription={setDescription}
          newPrompt={newPrompt}
          setNewPrompt={setNewPrompt}
          currentCharacters={currentCharacters}
          setCurrentCharacters={setCurrentCharacters}
          charactersLeft={charactersLeft}
          setCharactersLeft={setCharactersLeft}
          endRoundChars={endRoundChars}
          setEndRoundChars={setEndRoundChars}
          score={score}
        />
      )}

      {gameState === "answer" && (
        <Answer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          score={score}
          setScore={setScore}
          gameState={gameState}
          setGameState={setGameState}
          description={description}
          setDescription={setDescription}
          newPrompt={newPrompt}
          setNewPrompt={setNewPrompt}
          charactersLeft={charactersLeft}
          record={record}
          setRecord={setRecord}
          recordBeat={recordBeat}
          setRecordBeat={setRecordBeat}
        />
      )}

      {gameState === "final" && (
        <Final
          score={score}
          setScore={setScore}
          gameState={gameState}
          setGameState={setGameState}
          charactersLeft={charactersLeft}
          setCharactersLeft={setCharactersLeft}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          endRoundChars={endRoundChars}
          setEndRoundChars={setEndRoundChars}
          record={record}
          setRecord={setRecord}
          recordBeat={recordBeat}
          setRecordBeat={setRecordBeat}
        />
      )}
    </div>
  );
}
