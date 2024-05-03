//select filtros
const filtroGeneros = document.getElementById("filtro-genero");
const filtroAnio = document.getElementById("filtro-anio");
const filtroPremio = document.getElementById("filtro-premio");
const containerFiltros = document.getElementById("container-filtros");

//btn
const btnResetFiltros = document.getElementById("btn-reset-filtros");
//form
const formFiltros = document.getElementById("form-filtros");

//funcion para traer las opciones de los select filtros dinamicamente
const getOption = () => {
	fetch(baseUrl)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => GenerarOpcionesSelect(data));
};

getOption();

//funcion para cargar las opciones a los select sin repetirse
const GenerarOpcionesSelect = (datos) => {
	const generosSinRepetir = new Set();
	const aniosSinRepetir = new Set();
	const premioSinRepetir = new Set();

	datos.forEach((pelicula) => {
		generosSinRepetir.add(pelicula.genero);
		aniosSinRepetir.add(parseInt(pelicula.anio));
		premioSinRepetir.add(pelicula.premio);
	});

	const aniosOrdenados = [...aniosSinRepetir].sort((a, b) => a - b);

	filtroGeneros.innerHTML = "";
	filtroAnio.innerHTML = "";
	filtroPremio.innerHTML = "";

	// opciones por defecto en cada select///
	const optionGenero = document.createElement("option");
	optionGenero.value = "";
	optionGenero.textContent = "Género...";
	filtroGeneros.appendChild(optionGenero);

	const optionAnio = document.createElement("option");
	optionAnio.value = "";
	optionAnio.textContent = "Año...";
	filtroAnio.appendChild(optionAnio);

	const optionPremio = document.createElement("option");
	optionPremio.value = "";
	optionPremio.textContent = "Premio...";
	filtroPremio.appendChild(optionPremio);

	generosSinRepetir.forEach((genero) => {
		const option = document.createElement("option");
		option.value = genero;
		option.textContent = genero;
		filtroGeneros.appendChild(option);
	});

	aniosOrdenados.forEach((anio) => {
		const option = document.createElement("option");
		option.value = anio;
		option.textContent = anio;
		filtroAnio.appendChild(option);
	});
	premioSinRepetir.forEach((premio) => {
		const option = document.createElement("option");
		option.value = premio;
		option.textContent = premio;
		filtroPremio.appendChild(option);
	});
};

//funcionalidad de los filtros
const urlObject = new URLSearchParams(baseUrl.search);

filtroGeneros.addEventListener("change", (e) => {
	genero = e.target.value;
	urlObject.set("genero", e.target.value);
	getPeliculas(`${baseUrl}/?${urlObject}`);
});

filtroAnio.addEventListener("change", (e) => {
	anio = e.target.value;
	urlObject.set("anio", e.target.value);
	getPeliculas(`${baseUrl}/?${urlObject}`);
});

filtroPremio.addEventListener("change", (e) => {
	premio = e.target.value;
	urlObject.set("premio", e.target.value);
	getPeliculas(`${baseUrl}/?${urlObject}`);
});

//funcion para ocultar filtros
const ocultarFiltros = () => {
	containerFiltros.style.display = "none";
};

//funcion para mostrar filtros
const mostrarFiltros = () => {
	containerFiltros.style.display = "flex";
};

//evento para resetear filtros
btnResetFiltros.addEventListener("click", (e) => {
	e.preventDefault();
	formFiltros.reset();
	urlObject.delete("genero");
	urlObject.delete("anio");
	urlObject.delete("premio");
	console.log(urlObject);
	getPeliculas(baseUrl);
});
