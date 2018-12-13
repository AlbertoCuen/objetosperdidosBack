const express = require('express');
const bodyParser = require('body-parser');
const { Usuario, ObjetoPerdido } = require('./objetosPerdidos');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PUBLICAR OBJETO PERDIDO
app.post('/publicar/objetoPerdido', (req, res) => {
    const { titulo, descripcion, estatus } = req.body;
    const newObjetoPerdido = ObjetoPerdido({
        titulo,
        descripcion,
        estatus
    });

    newObjetoPerdido.save((error, objetoPerdido) => {
        error
            ?
            res.status(409).send(error) :
            res.send(objetoPerdido)
    });
});

// CONSULTAR TODOS LOS OBJETOS PERDIDOS
app.get('/all/objetoPerdido', (req, res) => {
    ObjetoPerdido.find().exec()
        .then(lostObjects => { resobjetoPerdido.send(lostObjects) })
        .catch(error => { res.send(error) })
});

// CONSULTA UN SOLO OBJETO PERDIDO
app.get('/objetoPerdido/:id', (req, res) => {
    const { id } = req.params;
    ObjetoPerdido.findById(id).exec()
        .then(lostObject => res.send(lostObject))
        .catch(error => res.send(error))
});

// CREAR USUARIO
app.post('/crear/usuarioObjPerdidos', (req, res) => {
    const { nombre, edad, correo, genero } = req.body;
    const newUsuario = Usuario({
        nombre,
        edad,
        correo,
        genero
    });
    newUsuario.save((error, usuario) => {
        error
            ?
            res.status(409).send(error) :
            res.send(usuario)
    });
});

// CONSULTA UN SOLO USUARIO
app.get('/usuarioObjPerdidos/:id', (req, res) => {
    const { id } = req.params;
    Usuario.findById(id).exec()
        .then(usuario => res.send(usuario))
        .catch(error => res.status(409).send(error))
});


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});