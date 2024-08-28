let user
let pilotos=[]
const modalAcciones = document.getElementById('modalAcciones')
const modalAccionesObjet = new mdb.Modal(modalAcciones)

const modalEditEstudiante = document.getElementById('modalEdit')
const modalEditEstudianteObjet = new mdb.Modal(modalEditEstudiante)

document.addEventListener('DOMContentLoaded', async ()=>{
    // Tu código aquí
    comprobarSesion()
    document.getElementById("cerrarSesion").addEventListener("click",()=>{
        localStorage.clear()
        location.href="../login/php/logout.php"
    })
  
    document.getElementById("search").addEventListener("keyup",async (e)=>{
        filtrarTabla()
    })
    /* SALUDA AL USUARIO */
    saludar()
    document.getElementById("ex1-tab-1").addEventListener("click",async (e)=>{
        await listarPilotos()
    })
    document.getElementById("ex1-tab-2").addEventListener("click",async (e)=>{
            await historial()
            console.log("a")
    })
    

    await listarPilotos()
    /* GUARDAR PUBLICACION */
   
  
    
    document.getElementById('formEditarEstudiante').addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        let form=new FormData(document.getElementById('formEditarEstudiante'))
        form.append("id",localStorage.getItem("idAccion"))

        let response = await fetch('php/editar.php', {
            method: 'POST',
            body: form,
        });
        response = await response.json();

        if(response=="ok"){
            modalEditEstudianteObjet.hide()
            toastr.success("Edicion exitosa","Guardado")
            document.getElementById('formEditarEstudiante').reset()
            await listarPilotos()
        }else{
            alert("ocurrio un error.")
        }

        console.log("holi")
        
    });
    document.getElementById('formNewAlum').addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        let form=new FormData(document.getElementById('formNewAlum'))

        let response = await fetch('php/nuevoAlumno.php', {
            method: 'POST',
            body: form,
        });
        response = await response.json();

        if(response=="ok"){
            document.getElementById("cerrarModalNew").click()
            document.getElementById('formNewAlum').reset()
            toastr.success("Nuevo alumno registrado","Guardado")
            await listarPilotos()
        }else{
            alert("ocurrio un error.")
        }

        console.log("holi")
        
    });



});
function comprobarSesion() {
    if(localStorage.getItem("user")){
        console.log("Hola! "+JSON.parse(localStorage.getItem("user")).nombreCompleto)
    }else{
        location.href="../login/index.html"
    }
}


function saludar() {
    user=JSON.parse(localStorage.getItem("user"))
    // Display a success toast, with a title
    toastr.info("Biendenido! "+`<span style="font-weight: bold;">${user.user}</span>`)
}


async function listarPilotos() {
    let response = await fetch('php/listarPilotos.php');
    response = await response.json();
    pilotos=response
    dibujarPagos(response)

}





  function dibujarPagos(pagos) {
    let tr=``
    pagos.forEach(element => {

        tr+=`
        <tr onclick="abrirModalAcciones(${element.id},'${element.nombreCompleto}')">
            <td>${element.nombreCompleto}</td>
            <td>
            ${element.dni}
            </td>
        </tr>
        `
    });
    document.getElementById("tablaPilotos").innerHTML=tr
}






function filtrarTabla() {
    const input = document.getElementById("search").value.toUpperCase();
    const table = document.getElementById("tablaPilotos");
    const rows = table.getElementsByTagName("tr");

    for (const row of rows) {
        let visible = false; // Suponemos inicialmente que la fila no es visible
        const cells = row.getElementsByTagName("td");

        for (const cell of cells) {
            if (cell.textContent.toUpperCase().includes(input)) {
                visible = true; // Si alguna celda coincide, marcamos la fila como visible
                break; // No es necesario seguir evaluando las demás celdas
            }
        }

        row.style.display = visible ? "" : "none"; // Mostrar u ocultar la fila
    }
}

function abrirModalAcciones(id,nombre) {
    const pilotoEncontrado = pilotos.find(estudiante => estudiante.id == id);
    localStorage.setItem("idAccion",id)
    document.getElementById("nombreXd").innerHTML=nombre
    document.getElementById("whatsApp").href=`https://api.whatsapp.com/send?phone=${pilotoEncontrado.telefono}`
    modalAccionesObjet.show()
    
}




function abrirModalEdit() {
    modalAccionesObjet.hide()
    let estu
    setTimeout(async () => {
        modalEditEstudianteObjet.show()
        estu=buscarEstudiantePorId(localStorage.getItem('idAccion'))
        document.getElementById('nombreEdit').value=estu.nombreCompleto;
        document.getElementById('dniEdit').value=estu.dni;
        document.getElementById('emailEdit').value=estu.email;
        document.getElementById('telefonoEdit').value=estu.telefono;
        document.getElementById('userEdit').value=estu.user;
        document.getElementById('passEdit').value=estu.pass;

    }, 500);
}
async function historial() {
    let response = await fetch('php/historial.php');
    response = await response.json();
    dibujarHistorial(response)
}

function buscarEstudiantePorId(id) {
    const pilotoEncontrado = pilotos.find(estudiante => estudiante.id == id);
    console.log(pilotos)
    return pilotoEncontrado;
  }
function dibujarHistorial(pagos) {
    let tr=``
    let badge=""
    pagos.forEach(element => {

        if(element.estado=="En curso"){
            badge=`<span class="badge rounded-pill badge-success btn-block">${element.estado}</span>`
        }else{
            badge=`<span class="badge rounded-pill badge-danger btn-block">${element.estado}</span>`
        }

        tr+=`
        <div class="col-md-4 mb-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${element.nombreCompleto}</h5>
                <p class="card-text">Inicio: ${element.fechaInicio}</p>
                <p class="card-text">Fin: ${element.fechaFin}</p>
                ${badge}
              </div>
            </div>
        </div>
        `
    });
    document.getElementById("finalizados").innerHTML=tr
}

