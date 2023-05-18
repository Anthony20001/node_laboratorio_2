const express = require('express')
const app = express()

const port = 8080

/**-------------------- rutas --------------------**/
const rutaUsuario = require("./routes/usuarios")
const rutaProducto = require("./routes/productos")


/**------------------ middlewares ------------------**/
app.use("/usuarios", rutaUsuario)
app.use("/productos", rutaProducto)


app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})

