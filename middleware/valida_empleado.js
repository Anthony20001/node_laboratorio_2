
const validarEmpleado = (req, res, next) => {
    if(req.method === "POST"){
        if(!req.body?.nombre) return res.status(400).send("El campo usuario es requerido")
        if(!req.body?.salario) return res.status(400).send("El campo salario es requerido")
        if(typeof req.body?.salario !== "number") return res.status(400).send("El campo salario debe contener únicamente números")
    }

    if(req.method === "PUT"){
        if(parseInt(req.params.id) === 0) return res.status(400).send("El id debe ser diferente a cero")
    }

    next()
}

module.exports = validarEmpleado