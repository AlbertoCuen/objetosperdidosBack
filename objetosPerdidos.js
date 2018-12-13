const moongose = require('mongoose');
const URL_MONGO = 'mongodb://alberto:a123456@ds131954.mlab.com:31954/objetos_perdidos';

moongose.connect(URL_MONGO, { useNewUrlParser: true }, (error) => {
    if (!error) {
        console.log("Conexión exitosa :v")
    }
});

const Schema = moongose.Schema;

const UsuarioSchema = new Schema({
    nombre: String,
    edad: Number,
    correo: String,
    genero: {
        type: String,
        enum: ['MASCULINO', 'FEMENINO'],
        required: true
    },
}, { timestamps: true });

const ObjetoPerdidoSchema = new Schema({
    titulo: String,
    descripcion: String,
    estatus: {
        type: Boolean,
        enum: [true, false],
        require: true
    },
    autor: {
        type: {
            usuario: {
                type: moongose.Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        },
    },
    comentario: {
        type: [{
            usuario: {
                type: moongose.Schema.Types.ObjectId,
                ref: 'Usuario'
            },
            comentario: String

        }, { timestamps: true }],
    }

}, { timestamps: true });

const Usuario = moongose.model('Usuario', UsuarioSchema);
const ObjetoPerdido = moongose.model('ObjetoPerdido', ObjetoPerdidoSchema);

module.exports = { Usuario, ObjetoPerdido }