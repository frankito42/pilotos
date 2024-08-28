const modalRegistro = document.getElementById('modalRegistro')
const modalRegistroObj = new mdb.Modal(modalRegistro)

document.addEventListener("DOMContentLoaded",async function(event) {
    iniciarSesion()
    
    
    
    
    
    
    /* FUNCIONES  */
    await listarResgistros()
    
    
    document.getElementById("btnIniciar").addEventListener("click",async(e)=>{
        await guardarResgistro()
    })
    document.getElementById("btnModalRegistro").addEventListener("click",(e)=>{
        abrirModal()
    })
    document.getElementById("ex1-tab-1").addEventListener("click",async (e)=>{
            await listarResgistros()
    })
    document.getElementById("ex1-tab-2").addEventListener("click",async (e)=>{
            await listarFinalizados()
    })

});



function iniciarSesion(){
    console.log(JSON.parse(localStorage.getItem("user")))
    if (localStorage.getItem("user")===null) {
        location.href="../login/index.html"
    }else{
        document.getElementById("cerrarSession").innerHTML=JSON.parse(localStorage.getItem("user")).user+" Cerrar Sesion"
    }
}
function cerrarSession(){
    localStorage.clear()
    iniciarSesion()
}
document.getElementById("cerrarSession").addEventListener("click",()=>{
    cerrarSession()
})









function abrirModal() {
    modalRegistroObj.show()
}


async function guardarResgistro() {
  
    let response = await fetch('php/ingreso.php?id='+JSON.parse(localStorage.getItem("user")).id);
    response = await response.json();
    console.log(response)
    if(response=="ok"){
        document.getElementById("cerrarModalBtn").click()
        toastr.success('Operacion Exitosa')
        await listarResgistros()
       
    }else{
        toastr.error('Ocurrio un error intente nuevamente')
        
    }
    
}
async function listarResgistros() {
    let response = await fetch(`php/listar.php?id=${JSON.parse(localStorage.getItem("user")).id}`);
    response = await response.json();
    console.log(response)
    dibujar(response)
    
}
async function finalizar(id) {
    let response = await fetch(`php/finalizar.php?id=${id}`);
    response = await response.json();
    console.log(response)
    toastr.success("Vuelo finalizado") 
    await listarResgistros()   
}
async function listarFinalizados() {
    let response = await fetch(`php/listarFinalizados.php?id=${JSON.parse(localStorage.getItem("user")).id}`);
    response = await response.json();
    console.log(response)
    dibujarF(response)
    
}

function dibujar(params) {
    let tr=``
    params.forEach(element => {
       
        tr+=`<tr>
            <td>${element.nombreCompleto}</td>
            <td>${element.fechaInicio}</td>
            <td><span class="badge rounded-pill badge-success">${element.estado}</span></td>
            <td><button onclick="finalizar(${element.id})" class="btn btn-danger">Finalizar</button></td>
        </tr>`
    });
    if(params.length==0){
        tr=`<tr><td colspan="4" style="text-align: center;">Sin Datos</td></tr>`
    }
    document.getElementById("enCurso").innerHTML=tr

}
function dibujarF(params) {
    let tr=``
    params.forEach(element => {
       
        tr+=`<tr>
            <td>${element.nombreCompleto}</td>
            <td>${element.fechaInicio}</td>
            <td>${element.fechaFin}</td>
            <td><span class="badge rounded-pill badge-success">${element.estado}</span></td>
        </tr>`
    });
    if(params.length==0){
        tr=`<tr><td colspan="4" style="text-align: center;">Sin Datos</td></tr>`
    }
    document.getElementById("finalizados").innerHTML=tr

}



