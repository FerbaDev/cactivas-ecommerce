import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } =
    useContext(CartContext);

  const total = getTotalPrice();

  return (
    <Container sx={{ padding: "20px", minHeight: "75vh" }}>
      <Typography variant="h2" className="bebas" sx={{ paddingBottom: "20px" }}>
        Carrito de Compras
      </Typography>

      {cart.length > 0 ? (
        <>
          <Grid container spacing={3} justifyContent="center">
            {cart.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ height: "150px", objectFit: "cover", width: "100%" }}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography>Cantidad: {product.quantity}</Typography>
                    <Typography>Precio unitario: ${product.unit_price}</Typography>
                    <Typography>Total: ${product.unit_price * product.quantity}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteById(product.id)}
                      fullWidth
                    >
                      Eliminar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ marginTop: "20px", textAlign: "center" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Total a pagar: ${total}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout"
              sx={{ marginRight: "10px" }}
            >
              Finalizar compra
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={clearCart}
            >
              Limpiar carrito
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h5" textAlign="center">
          Tu carrito está vacío. <Link to="/shop">Ir a la tienda</Link>
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
