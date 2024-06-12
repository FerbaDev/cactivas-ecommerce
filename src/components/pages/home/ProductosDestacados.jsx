import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

const productos = [
    // Ejemplo de productos destacados
    { id: 1, nombre: 'Cactus Echinopsis', imagen: '/images/echinopsis.jpg', precio: '$200' },
    { id: 2, nombre: 'Suculenta Aloe Vera', imagen: '/images/aloe-vera.jpg', precio: '$150' },
    { id: 3, nombre: 'Cactus Opuntia', imagen: '/images/opuntia.jpg', precio: '$180' }
  ];


const ProductosDestacados = () => {
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
                    image={producto.imagen}
                    alt={producto.nombre}
                    />
                    <CardContent>
                        <Typography variant="h6">
                        {producto.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {producto.precio}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                        Ver más
                        </Button>
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