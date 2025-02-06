import express from "express";
import http from "http";
import { Server } from "socket.io";
import { exec } from "child_process";
import fs from "fs";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Function to run Whisper transcription
const transcribeAudio = (filePath, language = "en") => {
    return new Promise((resolve, reject) => {
        exec(`./whisper.cpp/main -m ./whisper.cpp/models/ggml-base.en.bin -f ${filePath} --language ${language} --translate`, 
        (error, stdout, stderr) => {
            if (error) return reject(error);
            resolve(stdout);
        });
    });
};

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("audio", async (audioBuffer) => {
        const filePath = `audio_${Date.now()}.wav`;
        fs.writeFileSync(filePath, audioBuffer);

        try {
            const transcription = await transcribeAudio(filePath);
            socket.emit("transcription", transcription);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            fs.unlinkSync(filePath);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});
