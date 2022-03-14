import axios from 'axios';
import { nuevoPersonaje } from '../config/db.js';

const urlBase = 'https://rickandmortyapi.com/api/character';

//Busca un nombre en la api, para traer los datos si no esta registrado en la BD.
//Recorre las 42 paginas de la api buscando el nombre, para registrar el personaje en la BD
//Se pasa la url base de la api, con el numero de pagina, generado en la iteracion.
//Se recorren los datos buscando el nombre en la pagina.
//Una vez encontrado el personaje se registra en la BD.


const buscarPorNombreEnAPi = (nombre) => {
    for (let i = 0; i < 43; i++) {
        axios
            .get(`${urlBase}?page=${i}`)
            .then((datos) => {
                const datosDesdeAPi = datos.data.results;
                datosDesdeAPi.forEach(e => {
                    if (nombre === e.name) {
                        nuevoPersonaje(e.name, e.status, e.species, e.origin.name)
                    }
                });
            })
            .catch((e) => {
                res.json({ msg: e })
            })
            return
    }
};

export default buscarPorNombreEnAPi;