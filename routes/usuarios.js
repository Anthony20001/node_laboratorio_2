const express = require("express")
const router = express.Router()
let USUARIOS = require('../models/usuario')

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
router.get("/", (req, res) => res.status(200).json(petitionStructure(200, "ok", USUARIOS)))

//-------------------- 8 ---------------------
router.get("/:id", (req, res) => {
    const query = USUARIOS.find(usuario => parseInt(usuario.id) === parseInt(req.params.id))
    if (query) {
        res.status(200).json(petitionStructure(200, "ok", query))
    } else {
        res.status(404).json(petitionStructure(404, "bad", null))
    }
})

//-------------------- 9 ---------------------
router.use(express.json())
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
    try{
        const id = req.params.id
        USUARIOS = USUARIOS.filter(u => parseInt(u.id) !== parseInt(id))
        res.status(200).json(petitionStructure(200, "ok", USUARIOS))

    }catch (e){
        res.status(500).json(petitionStructure(500, "bad", null))
        console.log(e)
    }
})

module.exports = router