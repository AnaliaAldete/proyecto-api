//containers
const ContainerCards = document.getElementById("container-cards");
const containerSpinner = document.getElementById("container-spinner");
const containerForm = document.getElementById("container-form");
const containerModal = document.getElementById("container-modal-advertencia");
//input del form
const inputName = document.getElementById("input-nombre");
const inputDescripcion = document.getElementById("input-descripcion");
const inputGenero = document.getElementById("input-genero");
const inputAnio = document.getElementById("input-anio");
const inputDirector = document.getElementById("input-director");
const inputActores = document.getElementById("input-actores");
const inputCalificacion = document.getElementById("input-calificacion");
const inputUrl = document.getElementById("input-url");
//formularios
const formPeli = document.getElementById("form-peli");
//botones
const btnCancelar = document.getElementById("btn-cancelar");
const btnCancelarEliminar = document.getElementById("btn-cancelar-eliminar");
const btnAceptarEliminar = document.getElementById("btn-confirmar-eliminar");

const baseUrl = "https://66147fde2fc47b4cf27c6f1c.mockapi.io/api/peliculas";

//FUNCION PARA TRAER LAS PELIS DE LA API
const getPeliculas = (fetchUrl) => {
	fetch(fetchUrl)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				ContainerCards.innerHTML =
					'<div class="sin-datos">Esta búsqueda no arrojó ningún resultado.</div>';
			}
		})
		.then((data) => {
			renderCards(data);
		})
		.catch((err) => console.log(err));
};

getPeliculas(baseUrl);

//FUNCION PARA RENDERIZAR LAS CARDS
const renderCards = (data) => {
	renderSpinner();
	setTimeout(() => {
		ocultarSpinner();
		ContainerCards.innerHTML = "";
		if (data && data.length > 0) {
			data.forEach((peli) => {
				const { name, url, id } = peli;
				ContainerCards.innerHTML += `
                <div id="card" class="card">
					<img src="${url}"alt="imagen pelicula">
					<div class="container-descripcion">
						<h2>${name}</h2>
						<button class="btn-ver-detalle" data-cardId="${id}">Ver detalle</button>
					</div>
				</div> 
    `;
			});
		} else {
			ContainerCards.innerHTML =
				'<div class="sin-datos"><p>Esta búsqueda no arrojó ningún resultado</p><p>Haga click limpiar o seleccione otros filtros por favor.</p></div>';
		}
		asignarEventoVerDetalle(document.querySelectorAll(".btn-ver-detalle"));
		mostrarFiltros();
	}, 2000);
};

//FUNCIONALIDAD DEL SPINNER
const renderSpinner = () => {
	ContainerCards.innerHTML = "";
	containerSpinner.classList.remove("hidden");
};

const ocultarSpinner = () => containerSpinner.classList.add("hidden");

//FUNCION PARA ASIGNACION DE EVENTOS A LOS BOTONES EDITAR DE LAS CARDS
const asignarEventoVerDetalle = (btns) => {
	btns.forEach((btn) =>
		btn.addEventListener("click", (e) => {
			getDetalle(btn.getAttribute("data-cardId"));
		})
	);
};

// FUNCION PARA TRAER EL DETALLE DE LAS PELIS
let idPeliActual;
const getDetalle = (idPeli) => {
	idPeliActual = idPeli;
	fetch(`${baseUrl}/${idPeli}`)
		.then((res) => res.json())
		.then((data) => renderDetallePeli(data))
		.catch((err) => console.log(err));
};

//FUNCION PARA RENDERIZAR DETALLES DE LAS PELIS
const renderDetallePeli = (peli) => {
	ocultarFiltros();
	renderSpinner();
	setTimeout(() => {
		ocultarSpinner();
		ContainerCards.innerHTML = "";

		const {
			name,
			url,
			id,
			descripcion,
			anio,
			genero,
			director,
			actoresPrincipales,
			calificacion,
		} = peli;
		ContainerCards.innerHTML = `
    <div id="card-detalle" class="card-detalle">
        <div class="containerX">
			<button id="btnX">x</button>
		</div>     
	    <div class="container-detalle" id="container-detalle">
            <img src="${url}" alt="imagen pelicula" />
		    <div>
                <h2>${name}</h2>
		        <p>Sinopsis: ${descripcion}</p>
		        <p>Lanzamiento: ${anio}</p>
		        <p>Género: ${genero}</p>
		        <p>Director: ${director}</p>
		        <p>Actores principales: ${actoresPrincipales}</p>
		        <p>Calificación: ${calificacion}</p>
                <div class="container-btn">
			        <button class="btn-editar-peli" id="btn-editar-peli" data-cardId="${id}">Editar</button>
			        <button class="btn-eliminar-peli" id="btn-eliminar-peli">Eliminar</button>
		        </div>
            </div>
	    </div>
        
    </div>
    `;
		document
			.getElementById("btnX")
			.addEventListener("click", () => getPeliculas(baseUrl));

		document.getElementById("btn-editar-peli").addEventListener("click", () => {
			mostrarFormEditar(peli);
		});
		document
			.getElementById("btn-eliminar-peli")
			.addEventListener("click", () => {
				document.body.classList.add("abrir-modal-advertencia");
				document.getElementById("card-detalle").style.display = "none";
			});
	}, 2000);
};

//FUNCION PARA MOSTRAR FORM EDITAR
const mostrarFormEditar = (peli) => {
	formPeli.setAttribute("data-modo", "editar");

	inputName.value = peli.name;
	inputDescripcion.value = peli.descripcion;
	inputGenero.value = peli.genero;
	inputAnio.value = peli.anio;
	inputDirector.value = peli.director;
	inputActores.value = peli.actoresPrincipales;
	inputCalificacion.value = peli.calificacion;
	inputUrl.value = peli.url;

	document.getElementById("card-detalle").style.display = "none";
	document.body.classList.add("abrir-modal-form");
};

// FUNCION PARA CANCELAR EDITAR O AGREGAR PELICULA(GENERALIZADO PARA AMBAS)
const cancelarEditarOAgregar = () => {
	document.body.classList.remove("abrir-modal-form");
	if (document.getElementById("card-detalle")) {
		document.getElementById("card-detalle").style.display = "flex";
	} else {
		ContainerCards.innerHTML = "";
		getPeliculas(baseUrl);
	}
};

// EVENTO PARA CANCELAR EDITAR O AGREGAR PELICULA
btnCancelar.addEventListener("click", (e) => {
	e.preventDefault();
	cancelarEditarOAgregar();
});
