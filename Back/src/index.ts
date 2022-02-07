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
    convertToLingoScore,
    getRandomWord,
    generateLingoGrid,
    updateLingoGrid,
    validateWord,
} from "./scripts";
import path from "path";

declare module "express-session" {
    export interface SessionData {
        /** The word that has to be guessed. */
        toBeGuessWord: string;
        /** Playing field of Lingo */
        lingoGrid: LingoLetter[][];
        /** line of the Lingogrid that will be filled by the next guess. */
        currentLine: number;
    }
}

const words = fs
    .readFileSync("./languages/5-letter woorden.txt", "utf8")
    .split("\n")
    .map((word) => word.trim());

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
    console.error(err);
});

redisClient.on("ready", () => {
    console.log("redis ready");
});

//Redisstore v4 is not supported yet, use v3
app.use(
    session({
        secret: "potverdikke hoar dien klep ticht",
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: true,
        resave: false,
    })
);

app.get("*", (req, res, next) => {
    if (!req.session.toBeGuessWord) {
        req.session.toBeGuessWord = getRandomWord(words);
        req.session.lingoGrid = generateLingoGrid(req.session.toBeGuessWord);
        req.session.currentLine = 0;
    }
    next();
});

app.use(express.static(path.join(__dirname, "Front", "dist")));

//send game info to client
app.get("/game", (req, res) => {
    console.log(req.session.toBeGuessWord);
    res.json({
        lingoGrid: req.session.lingoGrid,
    });
});

app.put("/guess/:word", (req, res) => {
    
    
    //check if session in initialized
    if (req.session.toBeGuessWord === undefined) {
        res.status(400).json({ error: "Session not initialized" });
    }
    //check if guessed word is a valid guess
    if (!validateWord(req.params.word, words)) {
        res.json({ error: "Word does not exist" });
    }
    //update grid
    req.session.lingoGrid = updateLingoGrid(
        req.session.lingoGrid!,
        convertToLingoScore(req.params.word, req.session.toBeGuessWord!),
        req.session.currentLine!
    );

    req.session.currentLine!++;

    //check if guessed word is correct
    if (req.session.toBeGuessWord === req.params.word) {
        let lingoGrid = req.session.lingoGrid;
        req.session.currentLine = 0;
        req.session.toBeGuessWord = getRandomWord(words);
        req.session.lingoGrid = generateLingoGrid(req.session.toBeGuessWord);
        res.json({
            lingoGrid: lingoGrid,
            lastTurn: true,
            correct: true,
        });
        return;
    }
    //check if max guessed is reached
    if (req.session.currentLine! === req.session.lingoGrid.length) {
        let lingoGrid = req.session.lingoGrid;
        req.session.currentLine = 0;
        req.session.toBeGuessWord = getRandomWord(words);
        req.session.lingoGrid = generateLingoGrid(req.session.toBeGuessWord);

        res.json({
            lingoGrid,
            lastTurn: true,
            correct: false,
        });
        return;
    }
    res.json({
        lingoGrid: req.session.lingoGrid,
        lastTurn: false,
        correct: false,
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`);
    console.log(`Redis on port ${process.env.REDIS_PORT}`);
    console.log(`Redis url: ${process.env.REDIS_URL}`);
});
