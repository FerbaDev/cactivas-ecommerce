import { Container } from "@mui/material";
import { ItemCard } from "./ItemCard";

export const ItemList = ({ products }) => {
  return (
    <Container
      sx={{
        maxWidth: "100%",
        paddingBlock: "20px",
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        gap: "1.5em",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </Container>
  );
};
