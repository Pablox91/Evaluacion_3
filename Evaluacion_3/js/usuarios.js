var g_id_usuario ="";


function agregarUsuario(){

var txt_id_usuario  = document.getElementById("txt_id_usuario").value;
var txt_dv          = document.getElementById("txt_dv").value;
var txt_nombres     = document.getElementById("txt_nombre_usuario").value;
var txt_apellidos   = document.getElementById("txt_apellido_usuario").value;
var txt_email       = document.getElementById("txt_email_usuario").value;
var txt_celular     = document.getElementById("txt_celular_usuario").value;
var txt_username    = document.getElementById("txt_username_usuario").value;
var txt_password    = document.getElementById("txt_password_usuario").value;

if (txt_id_usuario.trim() === "" || txt_dv.trim() === "" || txt_nombres.trim() === "" || txt_apellidos.trim() === "" || txt_email.trim() === "" || txt_celular.trim() === "" || txt_username.trim() === "" || txt_password.trim() === "" 
  ){alert("Datos Incompletos");}
  else{
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var fechaHoraActual = obtenerFechaHora();

  const raw = JSON.stringify({
    "id_usuario" : txt_id_usuario,
    "dv"         : txt_dv,
    "nombres"    : txt_nombres,
    "apellidos"  : txt_apellidos,
    "email"      : txt_email,
    "celular"    : txt_celular,
    "username"   : txt_username,
    "password"   : txt_password,
    "fecha_registro": fechaHoraActual
  });


  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };


  fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
    .then((response) => {
      if(response.status == 200) {
        location.href ="listar.html";
      }else{alert("Fallo de conexion")}
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}}
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
`<tr>
<td>${element.id_usuario }</td>
<td>${element.dv }</td>
<td>${element.nombres}</td>
<td>${element.apellidos }</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${element.username}</td>
<td>${element.password}</td>
<td>${element.fecha_registro}</td>
<td>
<a href='actualizar.html?id=${element.id_usuario }' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_usuario }' class='btn btn-danger'>Eliminar</a> 
</td>
</tr>`
}
function obtenerIdActualizar(){
  
  const queryString  = window.location.search;
  
  const parametros = new URLSearchParams(queryString);
  
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);

}
function obtenerIdEliminar(){
  
  const queryString  = window.location.search;
  
  const parametros = new URLSearchParams(queryString);
  
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);

}
function obtenerDatosEliminar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var id_usuario = element.id_usuario;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el usuario? <b>" + id_usuario + "</b>";


}
function completarFormulario(element,index,arr){
  var id_usuario = element.id_usuario;
  var dv = element.dv;
  var nombre_usuario = element.nombres;
  var apellido_usuario = element.apellidos;
  var email_usuario = element.email;
  var celular_usuario = element.celular;
  var username_usuario = element.username;
  var password_usuario = element.password;
  document.getElementById('txt_id_usuario').value = id_usuario;
  document.getElementById('txt_dv').value = dv;
  document.getElementById('txt_nombre_usuario').value = nombre_usuario;
  document.getElementById('txt_apellido_usuario').value = apellido_usuario;
  document.getElementById('txt_email_usuario').value = email_usuario;
  document.getElementById('txt_celular_usuario').value = celular_usuario;
  document.getElementById('txt_username_usuario').value = username_usuario;
  document.getElementById('txt_password_usuario').value = password_usuario;

}

function actualizarUsuario(){
  
  var id_usuario  = document.getElementById("txt_id_usuario").value;
  var dv          = document.getElementById("txt_dv").value;
  var nombres     = document.getElementById("txt_nombre_usuario").value;
  var apellidos   = document.getElementById("txt_apellido_usuario").value;
  var email       = document.getElementById("txt_email_usuario").value;
  var username    = document.getElementById("txt_username_usuario").value;
  var password    = document.getElementById("txt_password_usuario").value;
  var celular     = document.getElementById("txt_celular_usuario").value;

  if (id_usuario.trim() === "" || dv.trim() === "" || nombres.trim() === "" || apellidos.trim() === "" || email.trim() === "" || username.trim() === "" || password.trim() === "" 
    || celular.trim() === ""){alert("Datos Incompletos");}
  else{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
 
    const raw = JSON.stringify({
      "id_usuario" : id_usuario,
      "dv"         : dv,
      "nombres"    : nombres,
      "apellidos"  : apellidos,
      "email"      : email,
      "celular"    : celular,
      "username"   : username,
      "password"   :password,
    });
  
  
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
  
    fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
      .then((response) => {
        if(response.status == 200){
          location.href ="listar.html";
        }else{alert("Fallo de conexion")}
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    }}

  function eliminarUsuario(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    
    fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
      .then((response) => {
        if(response.status == 200){
          location.href ="listar.html";
        }else{alert("Fallo de conexion")}
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    }

  function obtenerFechaHora(){

      var fechaActual = new Date();
      var fechaFormateada = fechaActual.toLocaleString('es-ES',{
        hour12:false,
        year:'numeric',
        month:'2-digit',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
      }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
    return fechaFormateada;
      
    
    }