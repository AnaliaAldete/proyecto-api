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
		url: inputUrl.value,
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
			}
		})
		.catch((err) => console.log(err));
};

formPeli.addEventListener("submit", (e) => {
	e.preventDefault();
	const modo = formPeli.getAttribute("data-modo");
	if (modo === "editar") {
		formPeli.classList.add("hidden");
		confirmarEditar();
	} else if (modo === "agregar") {
		formPeli.classList.add("hidden");
		agregarPeli();
		formPeli.reset();
	}
});
