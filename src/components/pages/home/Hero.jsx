import { Box } from "@mui/material";

export const Hero = () => {
  return (
    <Box>
      <h1>Cactivas</h1>
      <p>
        Cactivas es un vivero virtual especializado en cactus y suculentas. Más
        de 6 años de historias compartidas. Anteriormente nos encontraban en
        Córdoba capital en la calle 27 de abril.
      </p>
      <p>
        Quienes nos visitaron fueron testigos de charlas gratis, cursos,
        talleres, expos, sorteos y todo tipo de actividades.
      </p>
      <img
        style={{ width: "100%", height: "auto", padding: "20px" }}
        src="https://firebasestorage.googleapis.com/v0/b/cactivas-ecommerce.appspot.com/o/charla.jpg?alt=media&token=4bbce987-1a47-4a19-9979-7b298a3ee851"
        alt=""
      />
    </Box>
  );
};
