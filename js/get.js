const ContainerCards = document.getElementById("container-cards");
const containerSpinner = document.getElementById("container-spinner");

const $ = (selector) => document.querySelector(selector);
const baseUrl = "https://66147fde2fc47b4cf27c6f1c.mockapi.io/api/peliculas";

const getPeliculas = () => {
	fetch(baseUrl)
		.then((res) => res.json())
		.then((data) => renderCards(data))
		.catch((err) => console.log(err));
};
getPeliculas();

const renderCards = (data) => {
	renderSpinner();
	setTimeout(() => {
		ocultarSpinner();
		ContainerCards.innerHTML = "";
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
		asignarEventoVerDetalle(document.querySelectorAll(".btn-ver-detalle"));
	}, 2000);
};

const renderSpinner = () => {
	ContainerCards.innerHTML = "";
	containerSpinner.classList.remove("hidden");
};

const ocultarSpinner = () => containerSpinner.classList.add("hidden");

const asignarEventoVerDetalle = (btns) => {
	btns.forEach((btn) =>
		btn.addEventListener("click", (e) => {
			getDetalle(btn.getAttribute("data-cardId"));
		})
	);
};

const getDetalle = (idPeli) => {
	fetch(`${baseUrl}/${idPeli}`)
		.then((res) => res.json())
		.then((data) => renderDetallePeli(data))
		.catch((err) => console.log(err));
};

const renderDetallePeli = (peli) => {
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
	    <img src="${url}" alt="imagen pelicula" />
	    <div class="container-detalle" id="container-detalle">
		    <div class="containerX">
			    <button id="btnX">X</i></button>
		    </div>
		    <h2>${name}</h2>
		    <p>Sinopsis: ${descripcion}</p>
		    <p>Lanzamiento: ${anio}</p>
		    <p>Género: ${genero}</p>
		    <p>Director: ${director}</p>
		    <p>Actores principales: ${actoresPrincipales}</p>
		    <p>Calificación: ${calificacion}</p>
		    <div>
			    <button class="btn-editar-peli" id="btn-editar-peli" data-cardId="${id}">Editar</button>
			    <button class="btn-eliminar-peli" data-cardId="${id}">Eliminar</button>
		    </div>
	    </div>
    </div>

   <form class="hidden" id="form-editar-peli">
				<div>
					<label for="input-nombre">Pelicula</label>
					<input type="text" name="nombre" id="input-nombre" />
				</div>
				<div>
					<label for="input-descripcion">Sinopsis</label>
					<input type="text" name="descripcion" id="input-descripcion" />
				</div>
				<div>
					<label for="input-anio">Lanzamiento</label>
					<input type="number" name="anio" id="input-anio" />
				</div>
				<div>
					<label for="input-genero">Genero</label>
					<input type="text" name="genero" id="input-genero" />
				</div>
				<div>
					<label for="input-director">Director</label>
					<input type="text" name="director" id="input-director" />
				</div>
				<div>
					<label for="input-actores">Actores principales</label>
					<input type="text" name="actores" id="input-actores" />
				</div>
				<div>
					<label for="input-calificacion">Calificación</label>
					<input type="text" name="calificacion" id="input-calificacion" />
				</div>
				<div>
					<button type="submit">Editar</button>
					<button id="btn-cancelar-edicion">Cancelar</button>
				</div>
			</form>
    `;
		document.getElementById("btnX").addEventListener("click", getPeliculas);

		document.getElementById("btn-editar-peli").addEventListener("click", () => {
			mostrarFormEditar(peli);
		});
		document
			.getElementById("btn-cancelar-edicion")
			.addEventListener("click", (e) => {
				e.preventDefault();
				cancelarEdicion();
			});
	}, 2000);
};

const mostrarFormEditar = (peli) => {
	const inputName = document.getElementById("input-nombre");
	const inputDescripcion = document.getElementById("input-descripcion");
	const inputGenero = document.getElementById("input-genero");
	const inputAnio = document.getElementById("input-anio");
	const inputDirector = document.getElementById("input-director");
	const inputActores = document.getElementById("input-actores");
	const inputCalificacion = document.getElementById("input-calificacion");

	inputName.value = peli.name;
	inputDescripcion.value = peli.descripcion;
	inputGenero.value = peli.genero;
	inputAnio.value = peli.anio;
	inputDirector.value = peli.director;
	inputActores.value = peli.actoresPrincipales;
	inputCalificacion.value = peli.calificacion;

	document.getElementById("card-detalle").style.display = "none";
	document.getElementById("form-editar-peli").classList.remove("hidden");
};

const cancelarEdicion = () => {
	document.getElementById("card-detalle").style.display = "flex";
	document.getElementById("form-editar-peli").classList.add("hidden");
};
