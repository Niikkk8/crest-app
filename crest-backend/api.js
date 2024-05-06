const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const genAI = new GoogleGenerativeAI("AIzaSyDv5AsvRiDXJaY8MD1JdQAvU5pjjFK4Zzs"); // Replace "YOUR_API_KEY" with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.use(cors()); // Allow all origins. For production, consider configuring specific origins.
app.use(express.json());

app.post('/generate-content', async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
