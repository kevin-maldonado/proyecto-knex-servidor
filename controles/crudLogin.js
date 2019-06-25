;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])

let getUser = (req, res) =>{
    let tabla = req.query.tabla
    let campo = req.query.campo
    db.select(campo).from(tabla)
    .then(data =>{
        return res.status(200).json({
            ok: true,
            datos: data,
            message: `Existen ${data.length} usuarios`
        })
    })
    .catch(error =>{
        return res.status(400).json({
            ok: false,
            data: null,
            message: `Error al traer datos, error: ${error}`
        })
    })
}

let postUser = (req, res) =>{
    let table = req.body.table
    let register = req.body.register
    db(table).returning('name').insert(register)
    .then(data =>{
        return res.status(200).json({
            ok: true,
            data: data,
            message: `Registro insertado`
        })
    })
    .catch(error =>{
        return res.status(500).json({
            ok: false,
            data: null,
            message: `error: ${error}`
        })
    })
}

let putUser = (req, res) =>{
    let table = req.body.table
    let register = req.body.register
    let id  = register.id
    db(table).where('id', id).update(register)
    .then(data =>{
        return res.status(200).json({
            ok: true,
            data: data,
            message: `Registro actualizado`
        })
    })
    .catch(error =>{
        return res.status(500).json({
            ok: false,
            data: null,
            message: `error: ${error}`
        })
    })
}

let deleteUser = (req, res) =>{
    let table = req.body.table
    let register = req.body.register
    db(table).where('name', name).del()
    .then(data =>{
        return res.status(200).json({
            ok: true,
            data: data,
            message: `Registro eliminado`
        })
    })
    .catch(error =>{
        return res.status(500).json({
            ok: false,
            data: null,
            message: `error: ${error}`
        })
    })
}

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
}