import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: 1234,
    database: "rickandmorty",
    port: 5432,
});

const nuevoPersonaje = async(name, status, species, origin) => {
    try {
        const result = await pool.query(
            `INSERT INTO characters(name, status, species, origin) values ('${name}', '${status}', '${species}', '${origin}')`
        );
        return 'Creado con exito'
    } catch (error) {
        return error
    }
};

const buscarPersonajeDB = async(nombre) => {
    try {
        const result = await pool.query(`
        SELECT name, status, species, origin
        FROM characters
        WHERE name = '${nombre}'`);

        const nombreDB = result.rows[0].name;

        const datosPersonajeDB = result.rows[0];

        //Si los datos estan en la DB se retorna la info.
        if(nombre === nombreDB){
            return datosPersonajeDB;
        }else{
            return false;
        }

    } catch (error) {
        console.log(error);
    }
};

export {
    nuevoPersonaje,
    buscarPersonajeDB
}