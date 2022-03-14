import axios from 'axios';

const urlBase = 'https://rickandmortyapi.com/api/character'

const cantidadPersonajes = (n) => {
    const listaNumeros = [];
    for (let i = 1; i < n + 1; i++) {
        listaNumeros.push(i);
    }
    return listaNumeros;
};

let personajesN = cantidadPersonajes(10);

const getPersonajes = () => {
    axios
        .get(`${urlBase}/${personajesN}`)
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
            
            console.log(info);
            // console.log(data);
        })
        .catch((e) => {
            console.log(e);
        })
};

getPersonajes();