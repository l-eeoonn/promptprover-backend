const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/prompt", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
   model: "gpt-4-0125-preview",
      messages: [
        { role: "system", content: "You are an expert prompt engineer. Analyze and optimize this prompt." },
        { role: "user", content: prompt }
      ]
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const content = response.data.choices[0].message.content;
    res.json({ content });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


