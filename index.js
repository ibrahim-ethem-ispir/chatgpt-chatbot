import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";
import fs from "fs";

async function main() {
  console.log(colors.bold.green("Welcome to the Chatbot Program!"));
  console.log(colors.bold.green("You can start chatting with the bot."));

  const chatHistory = []; // Store conversation history

  console.log("");

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    try {
      // Construct messages by iterating over the history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // Mesajımızı gireceğimiz alan
      messages.push({ role: "user", content: userInput });

      // Call the API with user input & history
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      console.log("completion ", completion.data);

      // Get completion text/content
      const completionText = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + completionText);
        return;
      }

      console.log(colors.green("Bot: ") + completionText);

      // Update history with user input and assistant response
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
      console.log(colors.bgRed("Servis Kullanım Bilgisi ") + JSON.stringify(completion?.data?.usage))

      // cevapları dosyaya yazma
      chatHistory.forEach((message) => {
        fs.writeFileSync("chat.txt", `${message[0]}: ${message[1]}\n`, {
          flag: "a",
          encoding: "utf8",
          mode: 0o666,
        });
      });
    } catch (error) {
      fs.writeFileSync("errors.txt", `${error}: \n`, {
        flag: "a",
        encoding: "utf8",
        mode: 0o666,
      });
      console.error(colors.red(error));
    }
  }
}

main();
