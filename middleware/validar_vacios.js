const getResponse = (props) => {
    let propsEmpty = []

    props.forEach((value, key) => !value ? propsEmpty.push(key) : '')

    if (propsEmpty.length === 1) return `La propiedad (${propsEmpty}) no tiene valor.`

    if (propsEmpty.length > 1) return `Las propiedades (${propsEmpty}) no tienen valor.`

    return ""
}

const validarVacios = (req, res, next) => {

    if (req.method === "POST") {

        //PRODUCTOS ------------------------------------------

        if (req.originalUrl.toLowerCase() === '/productos') {
            const mapProductos = new Map()

            mapProductos.set("descripcion", req.body.descripcion)
            mapProductos.set("marca", req.body.marca)
            mapProductos.set("precio", req.body.precio)

            const response = getResponse(mapProductos)

            if (response) return res.status(400).send(response)
        }


        //USUARIOS ------------------------------------------

        if (req.originalUrl.toLowerCase() === '/usuarios') {

            const mapUsuarios = new Map()

            mapUsuarios.set("nombre", req.body.nombre)
            mapUsuarios.set("apellido", req.body.apellido)
            mapUsuarios.set("edad", req.body.edad)
            mapUsuarios.set("salario", req.body.salario)

            const response = getResponse(mapUsuarios)

            if (response) return res.status(400).send(response)
        }

        next()
    }
}

module.exports = validarVacios