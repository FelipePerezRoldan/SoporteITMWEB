//$(function () {
//    // Cargar el menú
//    $("#dvMenu").load("../Paginas/Menu.html");
//});


function Insertar() {
    EjecutarComando("POST", "InsertarUsuario");
}

function Actualizar() {
    EjecutarComando("PUT", "ActualizarUsuario");
}

function Eliminar() {
    let documento = $("#txtDocumentoUsuario").val();
    EjecutarComando("DELETE", "EliminarUsuario?DocumentoUsuario=" + documento);
}

async function Consultar() {
    let Documento = $("#txtDocumentoUsuario").val();
    try {
        const Respuesta = await fetch(`http://localhost:62054/api/Usuarios/ConsultarUsuario?DocumentoUsuario=${Documento}`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
        });

        const Resultado = await Respuesta.json();
        $("#txtNombre").val(Resultado.Nombre);
        $("#txtApellido").val(Resultado.Apellido);
        $("#txtEmail").val(Resultado.Email);
        $("#txtTelefono").val(Resultado.Telefono);
        $("#txtDepartamento").val(Resultado.Departamento);
        $("#txtCargo").val(Resultado.Cargo);
        $("#txtDocumentoUsuario").val(Resultado.DocumentoUsuario);
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}

async function EjecutarComando(Metodo, Funcion) {
    const usuario = {
        Nombre: $("#txtNombre").val(),
        Apellido: $("#txtApellido").val(),
        Email: $("#txtEmail").val(),
        Telefono: $("#txtTelefono").val(),
        Departamento: $("#txtDepartamento").val(),
        Cargo: $("#txtCargo").val(),
        DocumentoUsuario: $("#txtDocumentoUsuario").val()
    };

    try {
        const Respuesta = await fetch("http://localhost:62054/api/Usuarios/" + Funcion, {
            method: Metodo,
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        const Resultado = await Respuesta.json();
        $("#dvMensaje").html(Resultado);
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}
