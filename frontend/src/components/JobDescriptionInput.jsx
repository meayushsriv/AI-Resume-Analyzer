import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

function JobDescriptionInput({ onDescriptionChange }) {
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    onDescriptionChange(value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Job Description
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        placeholder="Paste the job description here..."
        value={description}
        onChange={handleChange}
        variant="outlined"
      />
    </Box>
  );
}

export default JobDescriptionInput;
