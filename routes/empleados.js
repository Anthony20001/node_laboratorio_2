const express = require('express');

const VALIDAR_USUARIO = require('../middleware/valida_empleado')

let EMPLEADOS = require("../models/empleados");

const router = express.Router();

router.use(express.json());
router.use(VALIDAR_USUARIO)

const petitionStructure = ($status, message, response) => {
    if (response !== null && $status >= 199 && $status <= 399) {
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

router.get("/", (req, res) => {
    res.json(petitionStructure(200, "ok", EMPLEADOS))
})

router.get("/:id", (req, res) => {
    const empleado = EMPLEADOS.find(e => e.id === parseInt(req.params.id))
    empleado ? res.status(200).json(petitionStructure(200, "ok", empleado)) : res.status(404).json(petitionStructure(404, "bad", null))
})

router.post("/", VALIDAR_USUARIO, (req, res) => {
    try {
        const nombre = req.body?.nombre ?? null;
        const salario = req.body?.salario ?? null;

        if (nombre && salario) {
            EMPLEADOS.push({"id": EMPLEADOS.length + 1, nombre, salario})
            return res.status(201).json(petitionStructure(201, "ok", "Empleado creado"))
        } else {
            petitionStructure(400, "bad", "Solicitud incompleta")
            throw "Solicitud imcompleta"
        }
    } catch (e) {
        console.log(e)
    }
})

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id)
    const nombre = req.body?.nombre ?? "";
    const salario = req.body?.salario ?? 0

    if (nombre && salario) {
        EMPLEADOS = EMPLEADOS.map(e => {
            if (e.id === id) {
                e.nombre = nombre
                e.salario = salario
            }

            return e
        })

        const empleado = EMPLEADOS.find(e => e.id === id)
        res.status(201).json(petitionStructure(201, "ok", empleado))
    }
})

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)

    EMPLEADOS = EMPLEADOS.filter(e => e.id !== id)
    res.status(200).json(petitionStructure(200, "ok", EMPLEADOS))
})

module.exports = router