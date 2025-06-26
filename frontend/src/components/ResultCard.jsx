import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";

function ResultCard({ result }) {
  if (!result) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">{result.name}</Typography>
        <Chip
          label={`Score: ${result.score}%`}
          color={
            result.score >= 80
              ? "success"
              : result.score >= 50
              ? "warning"
              : "error"
          }
        />
      </Box>

      <LinearProgress
        variant="determinate"
        value={result.score}
        sx={{ height: 10, borderRadius: 5, mb: 3 }}
        color={
          result.score >= 80
            ? "success"
            : result.score >= 50
            ? "warning"
            : "error"
        }
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CheckCircleIcon color="success" sx={{ mr: 1 }} /> Strengths
          </Typography>
          <List dense>
            {result.goodPoints.map((point, index) => (
              <ListItem key={index}>
                <ListItemText primary={point} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <WarningIcon color="warning" sx={{ mr: 1 }} /> Weaknesses
          </Typography>
          <List dense>
            {result.badPoints.map((point, index) => (
              <ListItem key={index}>
                <ListItemText primary={point} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
}

export default ResultCard;
