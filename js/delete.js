const btnCancelarEliminar = document.getElementById("btn-cancelar-eliminar");
const btnAceptarEliminar = document.getElementById("btn-confirmar-eliminar");

btnCancelarEliminar.addEventListener("click", () => {
	console.log(containerModal);
	containerModal.classList.add("hidden");
	console.log("click");
	document.getElementById("card-detalle").style.display = "flex";
});

btnAceptarEliminar.addEventListener("click", (e) => {
	fetch(`${baseUrl}/${idPeliActual}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => {
			containerModal.classList.add("hidden");
			getPeliculas();
		})
		.catch((err) => console.log(err));
});
