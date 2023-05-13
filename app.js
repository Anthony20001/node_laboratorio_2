//-------------------- 2 ---------------------
const express = require('express')
const app = express()
//-------------------- 5 ---------------------
let USUARIOS = require('./models/usuario')
let PRODUCTOS = require('./models/producto')
//-------------------- 6 ---------------------
const port = 8080


app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})


const petitionStructure = ($status, message, response) => {
    if(response !== null && $status >= 199 && $status <= 399){
        return {
            result: {
                message,
                status: $status
            },
            response
        }
    }

    return {
        error: {
            message,
            status: $status
        }
    }
}

//-------------------- 7 ---------------------
app.get("/usuarios", (req, res) => res.status(200).json(petitionStructure(200, "ok", USUARIOS)))

//-------------------- 8 ---------------------
app.get("/usuarios/:id", (req, res) => {
    const query = USUARIOS.find(usuario => parseInt(usuario.id) === parseInt(req.params.id))
    if (query) {
        res.status(200).json(petitionStructure(200, "ok", query))
    } else {
        res.status(404).json(petitionStructure(404, "bad", null))
    }
})

//-------------------- 9 ---------------------
app.use(express.json())
app.post("/usuarios", (req, res) => {
    try{
        const id = USUARIOS.length + 1
        const nombre = req.body?.nombre
        const apellido = req.body.apellido
        const edad = req.body.edad

        USUARIOS.push({ id, nombre, apellido, edad })

        const nuevoUsuario = USUARIOS.find(u => u.id === id)
        res.status(201).json(petitionStructure(201, "ok", nuevoUsuario))
    }catch (e){
        res.status(500).json(petitionStructure(500, "bad", null))
    }
})

//-------------------- 10 ---------------------
app.put("/usuarios/:id", (req, res) => {
    try{
        const id = req.params.id

        USUARIOS = USUARIOS.map(u => {
            if(parseInt(u.id) === parseInt(id)){
                u.id = id
                u.nombre = req.body?.nombre ?? u.nombre
                u.apellido = req.body?.apellido ?? u .apellido
                u.edad = req.body?.edad ?? u.edad
            }

            return u
        })

        const updatedUser = USUARIOS.find(u => u.id === id)

        res.status(201).json(petitionStructure(201, "ok", updatedUser))
    }catch (e){
        res.status(500).json(petitionStructure(500, "bad", null))
        console.log(e)
    }
})

//-------------------- 11 ---------------------
app.delete("/usuarios/:id", (req, res) => {
    try{
        const id = req.params.id
        USUARIOS = USUARIOS.filter(u => parseInt(u.id) !== parseInt(id))
        res.status(200).json(petitionStructure(200, "ok", USUARIOS))

    }catch (e){
        res.status(500).json(petitionStructure(500, "bad", null))
        console.log(e)
    }
})



//-------------------- 12 ---------------------

//-------------------- 7 ---------------------
app.get("/productos", (req, res) => res.status(200).json(petitionStructure(200, "ok", PRODUCTOS)))

//-------------------- 8 ---------------------
app.get("/productos/:id", (req, res) => {
    const query = PRODUCTOS.find(p => parseInt(p.id_producto) === parseInt(req.params.id))
    if (query) {
        res.status(200).json(petitionStructure(200, "ok", query))
    } else {
        res.status(404).json(petitionStructure(404, "bad", null))
    }
})

//-------------------- 9 ---------------------
app.post("/productos", (req, res) => {
    try{
        const id_producto = PRODUCTOS.length + 1
        const descripcion = req.body?.descripcion
        const marca = req.body?.marca
        const precio = req.body?.precio

        if(descripcion && marca && precio) {
            PRODUCTOS.push({ id_producto, descripcion, marca, precio })

            const nuevoProducto = PRODUCTOS.find(u => u.id_producto === id_producto)
            res.status(201).json(petitionStructure(201, "ok", nuevoProducto))
        }else{
            throw "Solicitud incompleta"
        }
    }catch (e){
        res.status(400).json(petitionStructure(400, e, null))
    }
})

//-------------------- 13 ---------------------
app.get("/productos/marca/:marca", (req, res) => {
    const marca = req.params.marca
    const productos = PRODUCTOS.filter(p => p.marca.toString().toLowerCase() === marca.toString().toLowerCase())

    if(productos.length > 0){
        res.status(200).json(petitionStructure(200, "ok", productos))
    }else{
        res.status(404).json(petitionStructure(404, "No hay productos de la marca " + marca, null))
    }
})


//-------------------- 14 ---------------------
app.get("/productos/precio-mayor/:precio", (req, res) => {
    const precio = req.params.precio
    const productos = PRODUCTOS.filter(p => parseFloat(p.precio) >= parseFloat(precio))

    if (productos.length > 0){
        res.status(200).json(petitionStructure(200, "ok", productos))
    }else{
        res.status(404).json(petitionStructure(404, "No hay productos con precio mayor a " + precio, null))
    }
})


//-------------------- 15 ---------------------
app.get("/productos/precio-menor/:precio", (req, res) => {
    const precio = req.params.precio
    const productos = PRODUCTOS.filter(p => parseFloat(p.precio) <= parseFloat(precio))

    if (productos.length > 0){
        res.status(200).json(petitionStructure(200, "ok", productos))
    }else{
        res.status(404).json(petitionStructure(404, "No hay productos con precio menor a " + precio, null))
    }
})
