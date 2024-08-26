const express = require("express");
const cors = require('cors');
const conectarDB = require("./config/db");

require("dotenv").config({ path: ".env" });

const app = express();
app.use(cors());

// conecta al motor de base de datos
conectarDB();

// habilitamos express.json
app.use(express.json({ extend: true }));

// craar un puerto o port de escucha del servidor de express
const PORT = process.env.PORT ?? 5000;

// RUTAS
app.use("/api/usuario", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/weeks", require("./routes/weeks"));
app.use("/api/ventanas", require("./routes/ventanas"));
app.use("/api/incidencias", require("./routes/incidencias"));
app.use("/api/onlyVentanaOld", require("./routes/onlyVentanaOld"));
app.use("/api/commentsVentanas", require("./routes/commentsVentanas"));
app.use("/api/commentsIncidencia", require("./routes/commentsIncidencia"));
app.use("/api/cambios", require("./routes/changes"));
app.use("/api/notes", require("./routes/notes"));
// levantamos el server o app
app.listen(PORT, () => {
  console.log(`SERVER en port: ${PORT}`);
});
