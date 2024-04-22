const peli = {
	name: "",
	descripcion: "",
	anio: "",
	genero: "",
	director: "",
	actoresPrincipales: "",
	calificacion: "",
	url: "",
	id: "",
};

const nuevaPeli = () => {
	fetch("https://66147fde2fc47b4cf27c6f1c.mockapi.io/api/peliculas", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(peli),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
	});
};
