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
						<button class="btn-ver-detalle">Ver detalle</button>
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
		btn.addEventListener("click", () => {
			console.log("click");
		})
	);
};

// const verDetalle=(idPeli)=>{

// }
