import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { Button } from "@mui/material";
import { OrdersList } from "./OrdersList";

export const Ordenes = () => {
  const [orders, setOrders] = useState([]);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setIsChange(false);
    let ordersCollection = collection(db, "orders");
    getDocs(ordersCollection).then((res) => {
      const newArr = res.docs.map((order) => {
        return {
          ...order.data(),
          id: order.id,
        };
      });
      setOrders(newArr);
    });
  }, [isChange]);

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-around" }}>
        <h1>Órdenes de compra de los clientes</h1>
        <Link to={-1}>
          <Button variant="contained">Volver</Button>
        </Link>
      </header>
      <OrdersList orders={orders} setIsChange={setIsChange} />
      <h1>todo ok</h1>
    </div>
  );
};
