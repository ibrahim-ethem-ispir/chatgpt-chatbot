import express from "express";
const app = express();

app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
);


app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.listen(5005, () => {
    console.log("Server started on port 3000");
})