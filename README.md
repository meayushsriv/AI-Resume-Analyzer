# AI Resume Shortlisting Bot

<div align="center">

*Streamline your hiring process with AI-powered resume analysis*

**Live Demo**: [ai-resume-analyzer-app.onrender.com](http://ai-resume-analyzer-app.onrender.com/)

</div>

---

## 🎯 Overview

The **AI Resume Shortlisting Bot** is an intelligent web application designed to revolutionize the recruitment process. By leveraging advanced AI technology, it automatically analyzes and ranks candidate resumes against job descriptions, saving HR professionals valuable time while ensuring quality candidate selection.

### 🌟 **Live Demo**
Experience the application in action: **[ai-resume-analyzer-app.onrender.com](http://ai-resume-analyzer-app.onrender.com/)**

---

## ✨ Key Features

### 🤖 **AI-Powered Analysis**
- **Smart Matching**: Advanced AI algorithms analyze resume content against job requirements
- **Contextual Understanding**: Recognizes skills, experience, and qualifications beyond keyword matching
- **Industry Adaptability**: Works across various industries and job roles

### 📊 **Comprehensive Scoring System**
- **Match Score**: Precise 1-100 scoring system for each candidate
- **Detailed Breakdown**: Clear identification of strengths and improvement areas
- **Visual Progress Bars**: Intuitive score visualization for quick assessment

### 📁 **Flexible File Handling**
- **Multiple Formats**: Support for PDF and DOCX resume formats
- **Batch Processing**: Upload and analyze multiple resumes simultaneously
- **Drag-and-Drop Interface**: User-friendly file upload experience

### 🎯 **Intelligent Insights**
- **Strength Analysis**: Highlights candidate qualifications that align with job requirements
- **Gap Identification**: Pinpoints missing skills or experience areas
- **Ranking System**: Automatically sorts candidates by relevance and fit

---

## 🛠️ Technology Stack

<table>
<tr>
<td><strong>Frontend</strong></td>
<td><strong>Backend</strong></td>
<td><strong>AI & Processing</strong></td>
</tr>
<tr>
<td>
• React.js (Vite)<br>
• Material-UI (MUI)<br>
• Axios<br>
• React Dropzone<br>
• React Toastify
</td>
<td>
• Node.js + Express<br>
• CORS Middleware<br>
• File Upload Handling<br>
• RESTful API Design
</td>
<td>
• Google Gemini API<br>
• pdf-parse<br>
• mammoth.js<br>
• Natural Language Processing
</td>
</tr>
</table>

**Deployment**: Hosted on Render.com with automatic GitHub deployments

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Google Gemini API Key** - [Get your key](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AI-Resume-Analyzer.git
   cd AI-Resume-Analyzer
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   PORT=3000
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1: Start backend server
   cd backend
   npm start
   
   # Terminal 2: Start frontend development server
   cd frontend
   npm run dev
   ```

5. **Access the application**
   
   Open your browser and navigate to `http://localhost:5173`

---

## 🏗️ Deployment

### Environment Variables

For production deployment, configure the following environment variables:

**Backend (.env)**
```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3000
NODE_ENV=production
```

**Frontend (.env)**
```env
VITE_BACKEND_URL=your_deployed_backend_url
```

### Render.com Deployment

The application is optimized for Render.com deployment:

1. **Backend Service**: Node.js web service
2. **Frontend Service**: Static site built from `dist` folder
3. **Automatic Deployments**: Connected to GitHub repository

---

## 📂 Project Structure

```
AI-Resume-Analyzer/
├── backend/                    # Node.js Express server
│   ├── index.js               # Main server entry point
│   ├── routes/                # API route handlers
│   ├── middleware/            # Custom middleware
│   ├── utils/                 # Utility functions
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
│
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── FileUpload.jsx
│   │   │   ├── JobDescription.jsx
│   │   │   ├── ResultsDisplay.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Frontend utilities
│   │   ├── App.jsx            # Main application component
│   │   └── main.jsx           # Application entry point
│   ├── public/                # Static assets
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── docs/                      # Documentation files
├── tests/                     # Test files
├── LICENSE                    # MIT License
└── README.md                  # This file
```

---

## 🎮 How to Use

### Step 1: Prepare Job Description
- Navigate to the application
- Paste or type the job description in the designated text area
- Include key requirements, skills, and qualifications

### Step 2: Upload Resumes
- Use the drag-and-drop interface or click to select files
- Upload multiple PDF or DOCX resume files
- Wait for file validation and processing

### Step 3: Analyze Results
- Click "Analyze Resumes" to start the AI processing
- View individual candidate scores and detailed analysis
- Review strengths and areas for improvement for each candidate

### Step 4: Make Informed Decisions
- Use the ranked candidate list to prioritize interviews
- Export results for further review or team collaboration

---

## 🔧 API Endpoints

### POST `/api/analyze`
Analyzes uploaded resumes against job description

**Request Body:**
- `jobDescription` (string): The job description text
- `files` (multipart): Resume files (PDF/DOCX)

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "filename": "candidate_resume.pdf",
      "score": 85,
      "strengths": ["Relevant experience", "Required skills"],
      "weaknesses": ["Missing certification", "Limited leadership experience"]
    }
  ]
}
```

---

## 🧪 Testing

Run the test suite:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run all tests
npm run test:all
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: "API Key not found" error
**Solution**: Ensure your `GEMINI_API_KEY` is properly set in the backend `.env` file

**Issue**: Frontend can't connect to backend
**Solution**: Check that `VITE_BACKEND_URL` points to the correct backend URL

**Issue**: File upload fails
**Solution**: Verify file formats are PDF or DOCX and file sizes are under the limit

**Issue**: Low match scores for qualified candidates
**Solution**: Ensure job description is detailed and includes specific requirements

---

## 📊 Performance & Limits

- **File Size Limit**: 10MB per resume file
- **Concurrent Uploads**: Up to 10 resumes simultaneously
- **Processing Time**: 2-5 seconds per resume depending on length
- **Supported Languages**: Primarily English (AI model dependent)

---

## 🔮 Future Enhancements

- [ ] **Multi-language Support**: Expand beyond English resumes
- [ ] **Custom Scoring Weights**: Allow HR teams to adjust scoring criteria
- [ ] **Integration APIs**: Connect with popular ATS systems
- [ ] **Advanced Analytics**: Provide hiring trend insights
- [ ] **Candidate Recommendations**: Suggest similar candidates from database
- [ ] **Email Integration**: Automated candidate communication
- [ ] **Interview Scheduling**: Built-in calendar integration

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful natural language processing
- **Material-UI** for beautiful React components
- **Render.com** for reliable hosting services
- **Open Source Community** for inspiration and tools

---

<div align="center">

**⭐ Star this repository if it helped you! ⭐**

*Built with ❤️ for the HR community*

</div>
