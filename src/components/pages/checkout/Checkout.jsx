import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { Button, TextField, Container, Box, Typography, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CompraRealizada } from "./CompraRealizada";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);

  initMercadoPago(import.meta.env.VITE_PUBLICKEY, { locale: "es-AR" });

  const [preferenceId, setPreferenceId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [shipmentCost, setShipmentCost] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("status"); // approved --- reject

  useEffect(() => {
    let order = JSON.parse(localStorage.getItem("order"));
    if (paramValue === "approved") {
      let ordersCollection = collection(db, "orders");
      addDoc(ordersCollection, { ...order, date: serverTimestamp() }).then(
        (res) => {
          setOrderId(res.id);
        }
      );

      order.items.forEach((elemento) => {
        updateDoc(doc(db, "products", elemento.id), {
          stock: elemento.stock - elemento.quantity,
        });
      });

      localStorage.removeItem("order");
      clearCart();
    }
  }, [paramValue]);

  useEffect(() => {
    let shipmentCollection = collection(db, "shipment");
    let shipmentDoc = doc(shipmentCollection, "Pva4MIlcFC79vSKkdmj3");
    getDoc(shipmentDoc).then((res) => {
      setShipmentCost(res.data().cost);
    });
  }, []);

  const total = getTotalPrice();

  const createPreference = async () => {
    const newArray = cart.map((product) => ({
      title: product.title,
      unit_price: product.unit_price,
      quantity: product.quantity,
    }));

    try {
      const response = await axios.post(
        "https://backend-cactivas.vercel.app/create_preference",
        {
          items: newArray,
          shipment_cost: shipmentCost,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (userData) => {
    setIsClicked(true);
    const order = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      dni: userData.dni,
      localidad: userData.localidad,
      cp: userData.cp,
      phone: userData.phone,
      items: cart,
      total: total + shipmentCost,
    };

    localStorage.setItem("order", JSON.stringify(order));
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      dni: "",
      localidad: "",
      cp: "",
      phone: "",
    },
    onSubmit: handleBuy,
    validateOnChange: false,
    validationSchema: Yup.object({
      nombre: Yup.string()
        .typeError("Ingrese un nombre válido")
        .required("Campo obligatorio")
        .min(3, "Ingrese un nombre válido"),
      apellido: Yup.string()
        .typeError("Ingrese un apellido válido")
        .required("Campo obligatorio")
        .min(2, "Ingrese información válida"),
      dni: Yup.string()
        .matches(/^\d{8}$/, "Ingrese un dni válido")
        .required("Campo obligatorio"),
      localidad: Yup.string().required("Campo obligatorio"),
      cp: Yup.number()
        .typeError("ingrese un CP válido")
        .required("Campo obligatorio")
        .min(4, "Ingrese un CP válido"),
      phone: Yup.number()
        .typeError("Ingrese un teléfono válido")
        .required("Campo obligatorio")
        .min(10, "Ingrese un teléfono válido"),
    }),
  });

  return (
    <Container sx={{ padding: "20px", minHeight: "75vh" }}>
      {!orderId ? (
        <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
          <Typography variant="h4" sx={{ paddingBottom: "20px", fontFamily: "var()" }}>
            Complete los datos para el envío
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="nombre"
              variant="outlined"
              label="Nombre"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors.nombre)}
              helperText={errors.nombre}
            />
            <TextField
              name="apellido"
              variant="outlined"
              label="Apellido"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors.apellido)}
              helperText={errors.apellido}
            />
            <TextField
              name="dni"
              variant="outlined"
              label="DNI"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors.dni)}
              helperText={errors.dni}
            />
            <TextField
              name="localidad"
              variant="outlined"
              label="Localidad"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors.localidad)}
              helperText={errors.localidad}
            />
            <TextField
              name="cp"
              variant="outlined"
              label="Código postal"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors.cp)}
              helperText={errors.cp}
            />
            <TextField
              name="phone"
              variant="outlined"
              label="Teléfono"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            {isClicked ? (
              !preferenceId ? (
                <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                  <CircularProgress />
                  <Typography variant="h6">Espere...</Typography>
                </Box>
              ) : null
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBlock: "20px", width: "100%" }}
                type="submit"
              >
                Seleccione método de pago
              </Button>
            )}
          </form>
        </Box>
      ) : (
        <CompraRealizada order={orderId} />
      )}

      {preferenceId && (
        <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
      )}
    </Container>
  );
};

export default Checkout;



// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "../../../context/CartContext";
// import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
// import axios from "axios";
// import { Button, TextField } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import { db } from "../../../firebaseConfig";
// import {
//   addDoc,
//   collection,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { CompraRealizada } from "./CompraRealizada";

// const Checkout = () => {
//   const { cart, getTotalPrice, clearCart } = useContext(CartContext);

//   initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
//     locale: "es-AR",
//   });
//   const [preferenceId, setPreferenceId] = useState(null);

//   const [orderId, setOrderId] = useState(null);
//   const [shipmentCost, setShipmentCost] = useState(0);
//   const [isClicked, setIsClicked] = useState(false);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const paramValue = queryParams.get("status"); // approved --- reject

//   useEffect(() => {
//     // ACA ES DONDE GUARDAMOS LA ORDEN EN FIREBASE
//     // CONDICIONADO A QUE YA ESTE EL PAGO REALIZADO
//     let order = JSON.parse(localStorage.getItem("order"));
//     if (paramValue === "approved") {
//       let ordersCollection = collection(db, "orders");
//       addDoc(ordersCollection, { ...order, date: serverTimestamp() }).then(
//         (res) => {
//           setOrderId(res.id);
//         }
//       );

//       order.items.forEach((elemento) => {
//         updateDoc(doc(db, "products", elemento.id), {
//           stock: elemento.stock - elemento.quantity,
//         });
//       });

//       localStorage.removeItem("order");
//       clearCart();
//     }
//   }, [paramValue]);

//   useEffect(() => {
//     let shipmentCollection = collection(db, "shipment");
//     let shipmentDoc = doc(shipmentCollection, "Pva4MIlcFC79vSKkdmj3");
//     getDoc(shipmentDoc).then((res) => {
//       setShipmentCost(res.data().cost);
//     });
//   }, []);

//   let total = getTotalPrice();

//   const createPreference = async () => {
//     const newArray = cart.map((product) => {
//       return {
//         title: product.title,
//         unit_price: product.unit_price,
//         quantity: product.quantity,
//       };
//     });
//     try {
//       let response = await axios.post(
//         "https://backend-cactivas.vercel.app/create_preference",
//         {
//           items: newArray,
//           shipment_cost: shipmentCost,
//         }
//       );

//       const { id } = response.data;
//       return id;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleBuy = async (userData) => {
//     setIsClicked(true);
//     let order = {
//       nombre: userData.nombre,
//       apellido: userData.apellido,
//       dni: userData.dni,
//       localidad: userData.localidad,
//       cp: userData.cp,
//       phone: userData.phone,
//       items: cart,
//       total: total + shipmentCost,
//     };
//     console.log(order);
//     localStorage.setItem("order", JSON.stringify(order));
//     const id = await createPreference();
//     if (id) {
//       setPreferenceId(id);
//     }
//   };


//   const { handleSubmit, handleChange, errors } = useFormik({
//     initialValues: {
//       nombre: "",
//       apellido: "",
//       dni: "",
//       localidad: "",
//       cp: "",
//       phone: "",
//     },
//     onSubmit: handleBuy,
//     validateOnChange: false,
//     validationSchema: Yup.object({
//       nombre: Yup.string()
//         .typeError("Ingrese un nombre válido")
//         .required("Campo obligatorio")
//         .min(3, "Ingrese un nombre válido"),
//       apellido: Yup.string()
//         .typeError("Ingrese un apellido válido")
//         .required("Campo obligatorio")
//         .min(2, "Ingrese información válida"),
//       dni: Yup.number()
//         .typeError("escriba un número")

//         .positive()
//         .integer()

//         .min(7, "Ingrese un dni válido")
//         .max(8, "Ingrese un dni válido")
//         .required("Campo obligatorio"),
//       localidad: Yup.string().required("Campo obligatorio"),
//       cp: Yup.number()
//         .typeError("ingrese un CP válido")
//         .required("Campo obligatorio")
//         .min(4, "Ingrese un CP válido"),
//       phone: Yup.number()
//         .typeError("Ingrese un teléfono válido")
//         .required("Campo obligatorio")
//         .min(10, "Ingrese un teléfono válido"),
//     }),
//   });

//   return (
//     <div style={{ padding: "20px" }}>
//       {!orderId ? (
//         <div>
//           <h2 className="bebas" style={{ fontSize: "1.8em" }}>
//             Complete los datos para el envío
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               name="nombre"
//               variant="outlined"
//               label="Nombre"
//               onChange={handleChange}
//               error={errors.nombre ? true : false}
//               helperText={errors.nombre}
//             />
//             <TextField
//               name="apellido"
//               variant="outlined"
//               label="Apellido"
//               onChange={handleChange}
//               error={errors.apellido ? true : false}
//               helperText={errors.apellido}
//             />
//             <TextField
//               name="dni"
//               variant="outlined"
//               label="DNI"
//               onChange={handleChange}
//               error={errors.dni ? true : false}
//               helperText={errors.dni}
//             />
//             <TextField
//               name="localidad"
//               variant="outlined"
//               label="Localidad"
//               onChange={handleChange}
//               error={errors.localidad ? true : false}
//               helperText={errors.localidad}
//             />
//             <TextField
//               name="cp"
//               variant="outlined"
//               label="Código postal"
//               onChange={handleChange}
//               error={errors.cp ? true : false}
//               helperText={errors.cp}
//             />
//             <TextField
//               name="phone"
//               variant="outlined"
//               label="Teléfono"
//               onChange={handleChange}
//               error={errors.phone ? true : false}
//               helperText={errors.phone}
//             />
//             {isClicked ? (
//               !preferenceId ? (
//                 <h2>espere...</h2>
//               ) : null
//             ) : (
//               <Button
//                 variant="contained"
//                 // onClick={handleBuy}
//                 sx={{ marginBlock: "20px" }}
//                 type="submit"
//               >
//                 Seleccione metodo de pago
//               </Button>
//             )}
//           </form>
//         </div>
//       ) : (
//         <CompraRealizada order={orderId} />
//       )}

//       {preferenceId && (
//         <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
//       )}
//     </div>
//   );
// };

// export default Checkout;
