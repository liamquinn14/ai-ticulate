import React, { useEffect, useState, useRef } from "react";
import config from "../configs/config";
const { SERVER_URL } = config;
export default function Image({
  guess,
  setGuess,
  gameState,
  setGameState,
  charactersLeft,
  nextQuestion,
  forfeit,
  description,
  setDescription,
  newPrompt,
  timeLeft,
  setTimeLeft,
}) {
  const newInputRef = useRef(null);

  useEffect(() => {
    newInputRef.current.focus();
  }, []);

  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (charactersLeft > 0) {
        nextQuestion();
      } else {
        forfeit();
      }
    }
  }

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(`${SERVER_URL}photo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: guess,
          }),
        });

        const { success, data } = await response.json();
        if (!success) {
          throw new Error("Network response was not ok"); //TODO Don't throw errors on the client side see https://anthony-trad.medium.com/why-you-shouldnt-throw-exceptions-in-your-code-c816680f970f#:~:text=If%20you%20know%20that%20an,%E2%80%A6%20so%2C%20why%20the%20throws%3F
        }
        setRes(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    if (!!guess) fetchRequest();
  }, [guess]);

  useEffect(() => {
    if (guess !== newPrompt) {
      if (description === "") {
          setTimeLeft(prevTimeLeft => prevTimeLeft - 5)
      } else if (description.split(" ").join("").split("").length < 5) {
          setTimeLeft(prevTimeLeft => prevTimeLeft - 5)
      }
  }
  }, [])

  if (error) {
    charactersLeft > 0 ? (
      <button
        className="px-4 py-2 m-4 text-purple-900 bg-purple-200 hover:bg-purple-300 font-black shadow-md rounded"
        onClick={nextQuestion}
      >
        {" "}
        NEXT QUESTION{" "}
      </button>
    ) : (
      ""
    );
    charactersLeft < 1 && (
      <button
        onClick={forfeit}
        className="px-4 py-2 m-4 text-red-100 bg-red-600 hover:bg-red-700 font-black shadow-md rounded"
      >
        {" "}
        VIEW FINAL SCORE{" "}
      </button>
    );
  }

  if (!res) {
    charactersLeft > 0 ? (
      <button
        className="px-4 py-2 m-4 text-purple-900 bg-purple-200 hover:bg-purple-300 font-black shadow-md rounded"
        onClick={nextQuestion}
      >
        {" "}
        NEXT QUESTION{" "}
      </button>
    ) : (
      ""
    );
    charactersLeft < 1 && (
      <button
        onClick={forfeit}
        className="px-4 py-2 m-4 text-red-100 bg-red-600 hover:bg-red-700 font-black shadow-md rounded"
      >
        {" "}
        VIEW FINAL SCORE{" "}
      </button>
    );
  }

  return (
    <>
      {res && (
        <img
          className="m-4 w-1/3 max-h-1/4"
          src={res.urls.regular}
          alt={res.alt_description}
        />
      )}
      {charactersLeft > -1 ? (
        <button
          className="px-4 py-2 m-3 text-purple-900 bg-purple-200 hover:bg-purple-300 font-black shadow-md rounded"
          onClick={charactersLeft > 1 ? nextQuestion : forfeit}
          ref={newInputRef}
          onKeyPress={handleKeyPress}
        >
          {" "}
          {charactersLeft > 1 ? "NEXT QUESTION" : "VIEW FINAL SCORE"}{" "}
        </button>
      ) : (
        ""
      )}
    </>
  );
}
