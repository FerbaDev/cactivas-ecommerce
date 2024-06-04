

export const Hero = () => {
  return (
    <>
      <img src="/banner-cactivas.webp" alt="" style={{ width: "100%", height: "auto"}}/>
      <div className="hero-info-container">
        <h1>Cactivas</h1>
        <p>
        Somos un vivero virtual especializado en cactus y suculentas. Contamos con más de 6 años de historias compartidas. Anteriormente nos encontrabas en Córdoba capital, en la calle 27 de abril.
        </p>
        <p>
          Quienes nos visitaron fueron testigos de charlas gratis, cursos,
          talleres, expos, sorteos y todo tipo de actividades.
        </p>
        <img
          style={{ width: "100%", height: "auto", padding: "20px", backgroundColor: "#212121" }}
          src="https://firebasestorage.googleapis.com/v0/b/cactivas-ecommerce.appspot.com/o/charla.jpg?alt=media&token=4bbce987-1a47-4a19-9979-7b298a3ee851"
          alt=""
        />
      </div>
    </>
  );
};
