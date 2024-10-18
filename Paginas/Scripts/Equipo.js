

async function Consultar() {
    let numeroSerie = $("#txtNumeroSerie").val();
    try {
        const Respuesta = await fetch(`http://localhost:62054/api/Equipos/ConsultarEquipo?NumeroSerie=${numeroSerie}`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
        });

        const Resultado = await Respuesta.json();
        $("#txtNombreEquipo").val(Resultado.NombreEquipo);
        $("#txtTipoEquipo").val(Resultado.TipoEquipo);
        $("#txtNumeroSerie").val(Resultado.NumeroSerie);
        $("#txtIdUsuario").val(Resultado.idUsuario);
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}

async function EjecutarComando(Metodo, Funcion) {
    const equipo = {
        NombreEquipo: $("#txtNombreEquipo").val(),
        TipoEquipo: $("#txtTipoEquipo").val(),
        NumeroSerie: $("#txtNumeroSerie").val(),
        idUsuario: $("#txtIdUsuario").val() || null  // Maneja el valor nulo
    };

    try {
        const Respuesta = await fetch("http://localhost:62054/api/Equipos/" + Funcion, {
            method: Metodo,
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(equipo)
        });

        const Resultado = await Respuesta.json();
        $("#dvMensaje").html(Resultado);
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}

function Insertar() {
    EjecutarComando("POST", "InsertarEquipo");
}

function Actualizar() {
    EjecutarComando("PUT", "ActualizarEquipo");
}

function Eliminar() {
    let numeroSerie = $("#txtNumeroSerie").val();
    EjecutarComando("DELETE", "EliminarEquipo?NumeroSerie="+numeroSerie);
}
