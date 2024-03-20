import { Box, Typography } from "@mui/material";

const StatBox = ({ title, subtitle, icon, increase,  }) => {

  const month = new Date().toLocaleString('default', { month: 'long' });
 
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon} <span style={{color:  "#4cceac" }}>  {month}</span>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#e0e0e0" }}
          >
            {title}
          </Typography>
        </Box>

      </Box>

      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="p" sx={{ color:  "#4cceac" }}>
          {subtitle}
        </Typography>
        <Typography
          variant="p"
          fontStyle="italic"
          sx={{ color:"#3da58a"}}
        >
          {increase}
        </Typography>
      </Box>
      
    </Box>
  );
};

export default StatBox;