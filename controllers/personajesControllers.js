import axios from 'axios';
import cantidadPersonajes from '../helper/cantidadPersonajes.js';
import buscarPorNombreEnAPi from '../helper/buscarPorNombreAPi.js';
import { buscarPersonajeDB, nuevoPersonaje } from '../config/db.js';

const urlBase = 'https://rickandmortyapi.com/api/character';


//Trae n pesonajes desde la api de rick and morty
const obtenerPersonajes = (req, res) => {
    const { numeroPersonajes } = req.params;
    let obtenerNumero = cantidadPersonajes(parseInt(numeroPersonajes));
    axios
        .get(`${urlBase}/${obtenerNumero}`)
        .then((datos) => {
            const data = datos.data;
            const info = [];
            data.forEach(e => {
                info.push({
                    id: e.id,
                    nombre: e.name,
                    status: e.status,
                    species: e.species,
                    origin: e.origin.name
                });
            });
            res.json(info);
        })
        .catch((e) => {
            console.log(e);
        });
};

//Obtiene un personaje desde la api, recibiendo parametros.
const obtenerPersonajesByDatos = (req, res) => {
    const {name, status, species} = req.body;
    //Se formatean los datos recibidos para agregarlos a la URL.
    const info = `?name=${name}&status=${status}&species"${species}"`;
    axios
        .get(`${urlBase}/${info}`)
        .then( (datos) => {
            const datosDesdeAPi = datos.data.results[0];
            let nameDB = datosDesdeAPi.name;
            let statusDB = datosDesdeAPi.status;
            let speciesDB = datosDesdeAPi.species;
            let originDB = datosDesdeAPi.origin.name
            nuevoPersonaje(nameDB, statusDB, speciesDB)
            res.json({msg: "Personaje guardado"})
            
        })
        .catch((e) => {
            res.json({msg: e.message})
        })
};

//Busca en la base de datos un personaje por su nombre.
const buscarPorNombreEnDB = async(req, res) => {
    const { nombre } = req.params;
    //Se busca el nombre en la DB.
    const infoDB = await buscarPersonajeDB(nombre);
    
    console.log(infoDB);
    //Si el nombre esta en la BD se envia la informacion.
    if(infoDB){
        return res.json(infoDB)
    //En caso de que no este se registra en DB.
    }else{
        //Desde esta funcion se guarda en la DB.
        buscarPorNombreEnAPi(nombre);
        return res.json({msg: 'Se registro el personaje'})
    };

};

export {
    obtenerPersonajes,
    obtenerPersonajesByDatos,
    buscarPorNombreEnDB
}