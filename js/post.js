const btnAgregarPeli = document.getElementById("btn-agregar-peli");

const mostrarFormAgregar = () => {
	formPeli.reset();
	ContainerCards.innerHTML = "";
	formPeli.setAttribute("data-modo", "agregar");
	containerForm.classList.remove("hidden");
};

btnAgregarPeli.addEventListener("click", mostrarFormAgregar);

const agregarPeli = () => {
	const nuevaPeli = {
		name: inputName.value,
		descripcion: inputDescripcion.value,
		anio: inputAnio.value,
		genero: [inputGenero.value],
		director: inputDirector.value,
		actoresPrincipales: [inputActores.value],
		calificacion: inputCalificacion.value,
		url: inputUrl.value,
	};
	fetch(baseUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(nuevaPeli),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => {
			if (data) {
				getPeliculas();
			} else {
				alert("ocurrio el siguiente error");
			}
		})
		.catch((err) => console.log(err));
};
