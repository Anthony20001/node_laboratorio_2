const express = require("express")
const VALIDAR_VACIOS = require("../middleware/validar_vacios")
let USUARIOS = require('../models/usuario')

let router = express.Router()

router.use(express.json())
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
router.post("/", VALIDAR_VACIOS, (req, res) => {
    console.log(0)
    if(!req.errMsg){
        console.log(1)
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
    }else{
        console.log("2")
        res.status(400).send(petitionStructure(400, req.errMsg, null))
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