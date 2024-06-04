import { Box } from "@mui/material";
import { Hero } from "./Hero";
import { Novedades } from "./Novedades";
import "./home.css"

const Home = () => {
  return (
    <Box>
      <Hero />
      <Novedades />
    </Box>
  );
};

export default Home;
