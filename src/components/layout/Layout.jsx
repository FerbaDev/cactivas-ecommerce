import { Outlet } from "react-router-dom";
import { Footer } from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import { Box } from "@mui/material";
import "../../../src/index.css";
// import ReactWhatsapp from "react-whatsapp";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          paddingTop: "40px",
          width: "100%",
          minHeight: "90vh",
        }}
      >
        <Outlet />
        {/* <div style={{position: "fixed",
                right: "20px",
                bottom: "40px",
                height: "2em",
                width: "auto",}}>
        <ReactWhatsapp
              number="549-2920-35-1234"
              message="Hola! Quisiera mas info!"
              element="div"
              
            >
              <WhatsAppIcon style={{ fontSize: "2.5em", color: "white", backgroundColor: "#25d366", borderRadius: "50%", padding: "5px" }}/>
        </ReactWhatsapp>
        </div> */}
      </Box>
      <Footer />
    </>
  );
};
