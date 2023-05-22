const express = require('express');
const app = express();

const port = 8080;

/**-------------------- rutas --------------------**/
const rutaUsuario = require("./routes/usuarios");
const rutaProducto = require("./routes/productos");
const rutaEmpleado = require("./routes/empleados");


/**------------------ middlewares ------------------**/
app.use("/usuarios", rutaUsuario);
app.use("/productos", rutaProducto);
app.use("/empleados", rutaEmpleado);


app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})

