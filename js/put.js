//FUNCION PARA CONFIRMAR EDITAR PELI
const confirmarEditar = () => {
	const peliEditada = {
		name: inputName.value,
		descripcion: inputDescripcion.value,
		anio: inputAnio.value,
		genero: inputGenero.value,
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

//EVENTO PARA ENVIAR EL FORMULARIO DE AGREGAR O EDITAR PELI
formPeli.addEventListener("submit", (e) => {
	e.preventDefault();
	const modo = formPeli.getAttribute("data-modo");
	document.body.classList.remove("abrir-modal-form");
	if (modo === "editar") {
		containerForm.classList.add("hidden");
		confirmarEditar();
	} else if (modo === "agregar") {
		containerForm.classList.add("hidden");
		agregarPeli();
		formPeli.reset();
	}
});
