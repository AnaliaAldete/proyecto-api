const ContainerCards = document.getElementById("container-cards");
const containerSpinner = document.getElementById("container-spinner");

const $ = (selector) => document.querySelector(selector);
const baseUrl = "https://66147fde2fc47b4cf27c6f1c.mockapi.io/api/peliculas";

const getPeli = () => {
	fetch(baseUrl)
		.then((res) => res.json())
		.then((data) => renderCard(data))
		.catch((err) => console.log(err));
};
getPeli();

const renderCard = (data) => {
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

const renderDetallePeli = (data) => {
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
		} = data;
		ContainerCards.innerHTML = `
     <div id="card-detalle" class="card-detalle">
     
					<img src="${url}" alt="imagen pelicula">
					<div class="container-detalle">
                    <div>
                    <button>X</button>
                    </div>
						<h2>${name}</h2>
                        <p>${descripcion}</p>
                        <p>${anio}</p>
                        <p>${genero}</p>
                        <p>${director}</p>
                        <p>${actoresPrincipales}</p>
                        <p>${calificacion}</p>
                        <div>
						<button class="btn-editar-peli" data-cardId="${id}">Editar</button>
						<button class="btn-eliminar-peli" data-cardId="${id}">Eliminar</button>
                        </div>
					</div>
                    
				</div>`;
	});
};
