import express from "express";
import openai from "./config/open-ai.js";
import colors from "colors";
import dotenv from 'dotenv';
dotenv.config();
import './config/dbConnection.js';

const port = process.env.PORT || 5006;
const app = express();

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const chatHistory = []; // Store conversation history

  try {
    // Construct messages by iterating over the history
    const messages = chatHistory.map(([role, content]) => ({
      role,
      content,
    }));

    // Mesajımızı gireceğimiz alan
    messages.push({ role: "user", content: message });

    // Call the API with user input & history
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    // Get completion text/content
    const completionText = completion.data.choices[0].message.content;


    
    console.log(colors.bgRed("Bot: ") + completionText);

    res.send({
      message,
      reply: completionText,
    });
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
