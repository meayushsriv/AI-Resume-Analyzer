const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs").promises;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractTextFromFile(file) {
  const buffer = await fs.readFile(file.path);

  if (file.mimetype === "application/pdf") {
    const data = await pdf(buffer);
    return data.text;
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file type");
}

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    const { jobDescription } = req.body;

    if (!file || !jobDescription) {
      return res
        .status(400)
        .json({ error: "File and job description are required" });
    }

    const resumeText = await extractTextFromFile(file);

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze this resume against the following job description and provide:
    1. A match score between 1-100
    2. A list of 3-5 good points where the resume aligns well with the job description
    3. A list of 3-5 bad points where the resume is missing or weak compared to the job description
    
    Return the response in JSON format with these keys: score, goodPoints, badPoints, name (extracted from resume)
    
    Job Description:
    ${jobDescription}
    
    Resume:
    ${resumeText}
    
    JSON Response:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response (Gemini might add markdown syntax)
    const cleanText = text.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(cleanText);

    // Clean up the uploaded file
    await fs.unlink(file.path);

    return res.json({
      ...analysis,
      fileName: file.originalname,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
