import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActions, CircularProgress, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';




const ProductosDestacados = () => {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    let productosCollection = collection(db, "products");
    
    getDocs(productosCollection)
      .then((res) => {
        let productosList = res.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });
        // Mezclar productos de manera aleatoria
        const shuffledProductos = productosList.sort(() => 0.5 - Math.random());
        // Selecciona solo los primeros 3 productos
        const productosDestacados = shuffledProductos.slice(0, 3);
        setProductos(productosDestacados);
      })
      .catch((err) => console.log(err));
  }, []);

  if (productos.length === 0) {
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


  return (
    <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
        Productos Destacados
      </Typography>
      <Grid container spacing={4}>
        {productos.map(producto => (
            <Grid item xs={12} sm={6} md={4} key={producto.id}>
                <Card>
                    <CardMedia
                    component="img"
                    height="200"
                    image={producto.image}
                    alt={producto.title}
                    />
                    <CardContent>
                        <Typography variant="h6">
                        {producto.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        ${producto.unit_price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Link to={`/itemDetail/${producto.id}`}>
            <Button variant="contained" sx={{ margin: "10px" }}>
              Ver detalle
            </Button>
          </Link>
                    </CardActions>
                </Card>
            </Grid>
        ))

        }
      </Grid>

    </Box>
  )
}

export default ProductosDestacados