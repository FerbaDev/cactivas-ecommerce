import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { CartContext } from "../../../context/CartContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart, getQuantityById } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let quantity = getQuantityById(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const refCollection = collection(db, "products");
        const refDoc = doc(refCollection, id);
        const res = await getDoc(refDoc);
        setProduct({ ...res.data(), id: res.id });
      } catch (error) {
        setError("Error al cargar el producto. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addOne = () => {
    if (counter < product.stock) {
      setCounter(counter + 1);
    } else {
      alert("Stock máximo alcanzado");
    }
  };

  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("No puedes agregar menos de 1 elemento al carrito");
    }
  };

  const onAdd = () => {
    let obj = {
      ...product,
      quantity: counter,
    };
    addToCart(obj);
  };

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
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h2" className="bebas" sx={{ paddingLeft: "20px", fontSize: "3em" }}>
        Detalle
      </Typography>
      {product && (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <img
                src={product.image}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  padding: "4px",
                }}
                alt={product.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.title}
                </Typography>
                <Typography>{product.description}</Typography>
                <Typography>Precio: ${product.unit_price}</Typography>
                {quantity && (
                  <Typography
                    sx={{
                      marginTop: "10px",
                      backgroundColor: "rgba(255, 44, 255, 0.2)",
                      padding: "4px",
                      borderRadius: "2px",
                      textAlign: "center",
                    }}
                  >
                    Ya tienes {quantity} en el carrito
                  </Typography>
                )}
                {product.stock === quantity && (
                  <Typography variant="h6">
                    Ya tienes el máximo en el carrito
                  </Typography>
                )}
                {quantity && (
                  <Box sx={{ marginBlock: "10px", textAlign: "center" }}>
                    <Link to={"/cart"} style={{ textDecoration: "none", marginRight: "10px" }}>
                      <Button size="small" color="success" variant="contained">
                        Ir al carrito
                      </Button>
                    </Link>
                    <Link to={"/shop"} style={{ textDecoration: "none" }}>
                      <Button size="small" color="secondary" variant="contained">
                        Seguir comprando
                      </Button>
                    </Link>
                  </Box>
                )}
              </CardContent>
              <CardActions>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingInline: "5px",
                  }}
                >
                  {product.stock ? (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <Button variant="contained" onClick={subOne} disabled={counter <= 1}>
                          -
                        </Button>
                        <Typography sx={{ marginInline: "10px" }}>{counter}</Typography>
                        <Button variant="contained" onClick={addOne} disabled={counter >= product.stock}>
                          +
                        </Button>
                      </Box>
                      <Button variant="contained" color="primary" onClick={onAdd} fullWidth>
                        Agregar al carrito
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="h6">Sin Stock</Typography>
                  )}
                  <Link to={-1}>
                  <ArrowBackIcon /> 
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ItemDetail;
