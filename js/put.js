const formEditarpeli = document.getElementById("form-editar-peli");

const confirmarEditar = () => {
	//hacer validacion para que no se suba un campo vacio
	const peliEditada = {
		name: inputName.value,
		descripcion: inputDescripcion.value,
		anio: inputAnio.value,
		genero: [inputGenero.value],
		director: inputDirector.value,
		actoresPrincipales: [inputActores.value],
		calificacion: inputCalificacion.value,
		//url: ,
	};
	fetch(`${baseUrl}/${idPeliActual}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(peliEditada),
	})
		.then((res) => {
			if (res.ok) {
				getDetalle(idPeliActual);
				formEditarpeli.classList.add("hidden");
			}
		})
		.catch((err) => console.log(err));
};

formEditarpeli.addEventListener("submit", (e) => {
	e.preventDefault();
	confirmarEditar();
});
