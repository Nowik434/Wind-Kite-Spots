import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{ marginTop: "50px" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://dev-nowicki.pl/">
        Paweł Nowicki
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
