
class Tecnico {
    constructor(nombre, apellido, email, telefono, especialidad, Documento) {
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.Email = email;
        this.Telefono = telefono;
        this.Especialidad = especialidad;
        this.Documento = Documento;
    }
}


async function EjecutarComando(Metodo, Funcion) {

    const tecnico = new Tecnico(
        $("#txtNombre").val(),
        $("#txtApellido").val(),
        $("#txtEmail").val(),
        $("#txtTelefono").val(),
        $("#txtEspecialidad").val(),
        $("#txtDocumento").val()
    );

    try {
        const Respuesta = await fetch("http://localhost:62054/api/Tecnicos/" + Funcion, {
            method: Metodo,
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tecnico) 
        });

        const Resultado = await Respuesta.json();
        $("#dvMensaje").html(Resultado);
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}


function Insertar() {
    EjecutarComando("POST", "InsertarTecnico");
}

function Actualizar() {
    EjecutarComando("PUT", "ActualizarTecnico");
}

function Eliminar() {
    let documento = $("#txtDocumento").val();
    EjecutarComando("DELETE", "EliminarTecnico?DocumentoTecnico=" + documento);
}



async function Consultar() {
    let Documento = $("#txtDocumento").val();

    try {
        const Respuesta = await fetch("http://localhost:62054/api/Tecnicos/ConsultarTecnico?DocumentoTecnico=" + Documento, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
        });

        const Resultado = await Respuesta.json();


        $("#txtNombre").val(Resultado.Nombre);
        $("#txtApellido").val(Resultado.Apellido);
        $("#txtEmail").val(Resultado.Email);
        $("#txtTelefono").val(Resultado.Telefono);
        $("#txtEspecialidad").val(Resultado.Especialidad);
        $("#txtDocumento").val(Resultado.DocumentoTecnico);
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}


//$(document).ready(function () {
//    $("#dvMenu").load("../Paginas/Menu.html");
//});