require("dotenv").config();

import express from "express";
import session from "express-session";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

import { LingoLetter } from "./types";

import {
  doesWordExist,
  convertToLingoScore,
  getRandomWord,
  generateLingoGrid,
} from "./scripts";
import { createPlayer, getPlayer } from "./lib/redis";
import path from "path";

declare module "express-session" {
  export interface SessionData {
    /** The word that has to be guessed. */
    toBeGuessWord: string;
    /** Playing field of Lingo */
    lingoGrid: LingoLetter[][];
    /** index of the letters that should be shown. */
    correctLetters: number[];
    /** The number of guesses the player has left. */
    guessesLeft: number;
  }
}

const words = fs
  .readFileSync("./languages/5-letter woorden.txt", "utf8")
  .split("\n");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const RedisStore = connectRedis(session);

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.log(err);
});

redisClient.on("ready", (err) => {
  console.log("redis ready");
});

//Redisstore v4 is not supported yet, use v3
app.use(
  session({
    secret: "potverdikke hoar dien klep ticht",
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    resave: false,
  })
);

// app.get("/", (req, res, next) => {
//   if (req.session.toBeGuessWord) {
//     res.send({
//       lingoGrid: req.session.lingoGrid,
//       guessesLeft: req.session.guessesLeft,
//       correctLetters: req.session.correctLetters,
//     });
//   } else {
//     req.session.toBeGuessWord = getRandomWord(words);
//     req.session.lingoGrid = generateLingoGrid(req.session.toBeGuessWord);
//     req.session.guessesLeft = 5;
//     req.session.correctLetters = [];

//     res.send({
//       lingoGrid: req.session.lingoGrid,
//       guessesLeft: req.session.guessesLeft,
//       correctLetters: req.session.correctLetters,
//     });
//   }
// });

app.get("/start", (req, res) => {
  const randomWord = getRandomWord(words);
  const player = createPlayer({ word: randomWord, tries: 0 });

  res.json({
    player: player,
    firstLetter: randomWord[0],
  });
});

app.get("/wordchecker/:id/:word", (req, res) => {
  const word = req.params.word;
  if (!doesWordExist(word, words)) {
    res.json({
      message: "This word does not exist",
    });
    return;
  }
  let player = getPlayer(req.params.id);

  res.send(convertToLingoScore(word, word));
  //doesWordExist(word) ? res.send(convertToLingoScore(word, word)) : res.send(`${word} is not a valid word`);
});


//if(process.env.NODE_ENV === "production") {
  app.use(express.static("./Front/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Front", "dist", "index.html"));
  })
//}

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
  console.log(`Redis on port ${process.env.REDIS_PORT}`);
  console.log(`Redis url: ${process.env.REDIS_URL}`);
});
