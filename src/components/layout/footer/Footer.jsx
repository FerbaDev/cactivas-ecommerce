import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import ReactWhatsapp from "react-whatsapp";
import { Box } from "@mui/material";
import "../../../index.css"

export const Footer = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "300px",
          backgroundColor: "#1c1c1c",
          color: "whitesmoke",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBlock: "20px",
          }}
        >
          <h2 style={{fontFamily: "var(--font-kanit)"}}>
            Nos encontrás en:
          </h2>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "2em" }} p={2}>
            <ReactWhatsapp
              number="549-2920-35-4587"
              message="Hola! Quisiera mas info!"
              element="div"
            >
              <WhatsAppIcon style={{ fontSize: "3em" }} />
            </ReactWhatsapp>
            <Link
              to={"https://www.instagram.com/cactivas/"}
              style={{ color: "whitesmoke" }}
            >
              <InstagramIcon style={{ fontSize: "3em" }} />
            </Link>
          </Box>
        </Box>
        <Box>
          <h2 style={{fontFamily: "var(--font-spartan)", textAlign: "center"}}>
            Pcia. de Córdoba, Argentina.
          </h2>
          <h3 style={{fontFamily: "var(--font-spartan)", textAlign: "center"}}>
            3571-123456
          </h3>
        </Box>
      </Box>

      {/* footer talba  */}
      <Box
        sx={{
          backgroundColor: "black",
          width: "100%",
          display: "flex",
          justifyContent: "end",
          p: 2,
          color: "whitesmoke",
        }}
      >
        
          <Link to={"https://talbalabs.com.ar/"} className="talba">
            <span style={{ fontFamily: "monospace" }}> Talba Labs</span>
          </Link>
        
      </Box>
    </>
  );
};
