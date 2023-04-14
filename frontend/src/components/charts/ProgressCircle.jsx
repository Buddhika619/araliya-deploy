import { Box,  } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {

  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient("#1F2A40", 55%, transparent 56%),
            conic-gradient(transparent 0deg 55deg, "#6870fa" 55deg 360deg),
            "#4cceac"`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;