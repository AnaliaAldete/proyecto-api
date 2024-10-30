//EVENTO PARA CANCELAR ELIMINAR PELI
btnCancelarEliminar.addEventListener("click", () => {
	document.body.classList.remove("abrir-modal-advertencia");
	document.getElementById("card-detalle").style.display = "flex";
});

//FUNCION Y EVENTO PARA ELIMINAR LA PELI
btnAceptarEliminar.addEventListener("click", () => {
	fetch(`${baseUrl}/${idPeliActual}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => {
			document.body.classList.remove("abrir-modal-advertencia");
			getPeliculas(baseUrl);
			getOption();
		})
		.catch((err) => console.log(err));
});
