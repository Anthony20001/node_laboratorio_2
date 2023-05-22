const express = require("express")

const PRODUCTOS = require("../models/producto");

const VALIDAR_VACIOS = require("../middleware/validar_vacios")

let router = express.Router()

router.use(express.json());
router.use(VALIDAR_VACIOS)


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


router.get("/", (req, res) => res.status(200).json(petitionStructure(200, "ok", PRODUCTOS)))

//-------------------- 8 ---------------------
router.get("/:id", (req, res) => {
    const query = PRODUCTOS.find(p => parseInt(p.id_producto) === parseInt(req.params.id))
    if (query) {
        res.status(200).json(petitionStructure(200, "ok", query))
    } else {
        res.status(404).json(petitionStructure(404, "bad", null))
    }
})

//-------------------- 9 ---------------------
router.post("/", VALIDAR_VACIOS, (req, res) => {
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
router.get("/marca/:marca", (req, res) => {
    const marca = req.params.marca
    const productos = PRODUCTOS.filter(p => p.marca.toString().toLowerCase() === marca.toString().toLowerCase())

    if(productos.length > 0){
        res.status(200).json(petitionStructure(200, "ok", productos))
    }else{
        res.status(404).json(petitionStructure(404, "No hay productos de la marca " + marca, null))
    }
})


//-------------------- 14 ---------------------
router.get("/precio-mayor/:precio", (req, res) => {
    const precio = req.params.precio
    const productos = PRODUCTOS.filter(p => parseFloat(p.precio) >= parseFloat(precio))

    if (productos.length > 0){
        res.status(200).json(petitionStructure(200, "ok", productos))
    }else{
        res.status(404).json(petitionStructure(404, "No hay productos con precio mayor a " + precio, null))
    }
})


//-------------------- 15 ---------------------
router.get("/precio-menor/:precio", (req, res) => {
    const precio = req.params.precio
    const productos = PRODUCTOS.filter(p => parseFloat(p.precio) <= parseFloat(precio))

    if (productos.length > 0){
        res.status(200).json(petitionStructure(200, "ok", productos))
    }else{
        res.status(404).json(petitionStructure(404, "No hay productos con precio menor a " + precio, null))
    }
})

module.exports = router