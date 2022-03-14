const cantidadPersonajes = (n) => {
    const listaNumeros = [];
    for (let i = 0; i < n + 1; i++) {
        listaNumeros.push(i);
    }
    return listaNumeros;
};

export default cantidadPersonajes;