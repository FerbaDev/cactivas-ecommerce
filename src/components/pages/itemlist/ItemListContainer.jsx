import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography
} from "@mui/material";
import { menuCategorias } from "../../../router/menuCategorias";
import { ItemList } from "./ItemList";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName, brandName } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let refCollection = collection(db, "products");
        let consulta;

        if (categoryName) {
          consulta = query(refCollection, where("category", "==", categoryName));
        } else if (brandName) {
          consulta = query(refCollection, where("marca", "==", brandName));
        } else {
          consulta = refCollection;
        }

        const res = await getDocs(consulta);
        const newArray = res.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));

        setProducts(newArray);
      } catch (err) {
        setError("Error al cargar los productos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName, brandName]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Typography variant="h2" sx={{ paddingLeft: "20px", fontSize: "3em" }} className="bebas">
        Tienda
      </Typography>
      <Box>
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {menuCategorias.map(({ id, path, title }) => (
            <Button key={id}>
              <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
                {title}
              </Link>
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box sx={{ margin: "20px" }}></Box>
      <ItemList products={products} />
    </Box>
  );
};

export default ItemListContainer;
