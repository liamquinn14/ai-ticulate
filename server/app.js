import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//Load env vars
dotenv.config();

const app = express();

//configure cors middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.post("/api/v1/ai-completions/description", (req, res) =>
  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Your task is to use your incredible rationale to guess the 
        word being described. Your answer must only be one word long. The 
        correct answer will never be a plural. The answer will never include any 
        word used in the description. The description is: ' ${req.body.data} '. 
        What word do you think this is? Sometimes the description will invite you to finish a 
        sentence, by ending the description with a '_'. If the description is 
        incomprehensible, simply respond 'what was that?'`,
      temperature: 0,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }),
  })
    .then((res) => res.json())
    .then((data) =>
      res.status(200).json({
        success: true,
        data: data.choices.at(0).text,
      })
    )
    .catch((err) => {
      debugger;
      return res.status(200).json({ success: false, error: err });
    })
);

app.post("/api/v1/ai-completions/:score", async (req, res) =>
  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Your task is to give funny feedback to the player based on the score 
      that they achieve in a game. If they score 0 or 1 you must give brutal hilarious
       and humiliating feedback because they are terrible scores. If they score 2-3 you
        should also criticise the player but not as much as if they scored 0-1. 
        If they score 4-6 you should congratulate them and motivate them, but 
        acknowledge that their score is still mediocre. If they score 7-8 you 
        must spraise them and if they score 9-10 you should hilariously worship them. 
        Anything above 10 is elite world-record level stuff so go crazy with praise. 
        Overall, your task is to praise/criticise the player based on their score. 
        Act like a sarcastic know-it-all if they are bad, but congratulate them if they do well.
         Your answer must be less than 20 words. The player's score was ${req.params.score}.`,
      temperature: 1.2,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }),
  })
    .then((res) => res.json())
    .then((data) =>
      res.status(200).json({
        success: true,
        data: data.choices.at(0).text,
      })
    )
    .catch((err) => {
      debugger;
      return res.status(200).json({ success: false, error: err });
    })
);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
