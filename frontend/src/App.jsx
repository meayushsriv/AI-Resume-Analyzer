import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import FileUpload from "./components/FileUpload";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ResultCard from "./components/ResultCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);

  const handleFilesSelected = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (removedFile) => {
    setFiles((prev) => prev.filter((file) => file !== removedFile));
    setResults((prev) =>
      prev.filter((result) => result.fileName !== removedFile.name)
    );
  };

  const handleDescriptionChange = (description) => {
    setJobDescription(description);
  };

  const processResumes = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    if (files.length === 0) {
      toast.error("Please upload at least one resume");
      return;
    }

    setIsProcessing(true);
    setProcessedCount(0);
    setResults([]);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("jobDescription", jobDescription);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/analyze`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to process ${file.name}`);
        }

        const result = await response.json();
        setResults((prev) => [...prev, result]);
        setProcessedCount((prev) => prev + 1);
      }

      toast.success("All resumes processed successfully!");
    } catch (error) {
      toast.error(`Error processing resumes: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const sortedResults = [...results].sort((a, b) => b.score - a.score);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <JobDescriptionInput onDescriptionChange={handleDescriptionChange} />

      <FileUpload
        onFilesSelected={handleFilesSelected}
        onRemoveFile={handleRemoveFile}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={processResumes}
          disabled={
            isProcessing || files.length === 0 || !jobDescription.trim()
          }
          startIcon={
            isProcessing ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {isProcessing
            ? `Processing (${processedCount}/${files.length})`
            : "Analyze Resumes"}
        </Button>
      </Box>

      {sortedResults.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Results (Sorted by Score)
          </Typography>
          {sortedResults.map((result, index) => (
            <ResultCard key={index} result={result} />
          ))}
        </Box>
      )}

      <ToastContainer position="bottom-right" autoClose={5000} />
    </Container>
  );
}

export default App;
