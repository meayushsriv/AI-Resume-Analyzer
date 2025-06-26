import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

function FileUpload({ onFilesSelected, onRemoveFile }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const validFiles = acceptedFiles.filter((file) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type)
      );

      if (validFiles.length !== acceptedFiles.length) {
        toast.error("Only PDF and DOCX files are allowed");
      }

      setFiles((prev) => [...prev, ...validFiles]);
      onFilesSelected(validFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: true,
  });

  const handleRemove = (index) => {
    const newFiles = [...files];
    const removedFile = newFiles.splice(index, 1)[0];
    setFiles(newFiles);
    onRemoveFile(removedFile);
  };

  return (
    <Box sx={{ p: 3, border: "2px dashed #ccc", borderRadius: 2, mb: 3 }}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the files here ...</Typography>
        ) : (
          <Typography>
            Drag and drop resumes here, or click to select files (PDF/DOCX)
          </Typography>
        )}
      </div>

      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Selected Files:</Typography>
          <List dense>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default FileUpload;
