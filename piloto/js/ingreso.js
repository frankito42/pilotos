const modalIngresoElement = document.getElementById('modalIngreso')
const modalIngreso = new mdb.Modal(modalIngresoElement)

document.addEventListener("keydown", function(event) {
            // Si la tecla presionada es "+"
            if (event.key === "+") {
                // Evita la acción predeterminada (por ejemplo, zoom en el navegador)
                event.preventDefault();
                
                abrirModal()
                // Realiza la acción que desees
                console.log("Se presionó la tecla + en cualquier lugar de la página.");
            }
});

document.addEventListener("DOMContentLoaded",async function(event) {
    iniciarSesion()
    
    
    
    
    
    
    /* FUNCIONES  */
    await listarIngresos(formatDate(),'Peso Argentino','tbodyPeso')
    document.getElementById("formularioIngreso").addEventListener("submit",async (e)=>{
        e.preventDefault()
        await guardarIngreso()
    })
    document.getElementById("formularioPdf").addEventListener("submit",async (e)=>{
        e.preventDefault()
        let fecha=document.getElementById("fechaPDF").value
        location.href="imprimir.php?fecha="+fecha
    })
    document.getElementById("btnModalIngreso").addEventListener("click",(e)=>{
        abrirModal()
    })
    document.getElementById("search").addEventListener("change",async (e)=>{
        if (tieneClase(document.getElementById("ex1-tab-1"), 'active')) {
            await listarIngresos(document.getElementById("search").value,'Peso Argentino','tbodyPeso')
        }else{
            await listarIngresos(document.getElementById("search").value,'Guaranies','Guaranies')
        }
    })
    document.getElementById("ex1-tab-1").addEventListener("click",async (e)=>{
            await listarIngresos(document.getElementById("search").value,'Peso Argentino','tbodyPeso')
    })
    document.getElementById("ex1-tab-2").addEventListener("click",async (e)=>{
            await listarIngresos(document.getElementById("search").value,'Guaranies','Guaranies')
    })

});

function tieneClase(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function iniciarSesion(){
    console.log(JSON.parse(localStorage.getItem("user")))
    if (localStorage.getItem("user")===null) {
        location.href="Login/index.php"
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




const dateInput = document.getElementById('search');
dateInput.value = formatDate();

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date = new Date()) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate())
    ].join('-');
}
















function abrirModal() {
    modalIngreso.show()
    setTimeout(() => {
        document.getElementById("montoIngreso").focus()
    }, 500);
}


async function guardarIngreso() {
    let fomularioIngreso = new FormData(document.getElementById("formularioIngreso"))
  
    let response = await fetch('php/ingreso.php?id='+JSON.parse(localStorage.getItem("user")).id,{
        method:"POST",
        body:fomularioIngreso
    });
    response = await response.json();
    console.log(response)
    if(response=="ok"){
        document.getElementById("formularioIngreso").reset()
        document.getElementById("cerrarModalBtn").click()
        toastr.success('Operacion Exitosa')
        if (tieneClase(document.getElementById("ex1-tab-1"), 'active')) {
            await listarIngresos(document.getElementById("search").value,'Peso Argentino','tbodyPeso')
        }else{
            await listarIngresos(document.getElementById("search").value,'Guaranies','Guaranies')
        }
    }else{
        toastr.error('Ocurrio un error intente nuevamente')
        
    }
    
}
async function listarIngresos(fecha,moneda,elemento) {
    let response = await fetch(`php/listar.php?moneda='${moneda}'&fecha='${fecha}'`);
    response = await response.json();
    console.log(response)
    if(elemento=="tbodyPeso"){
        dibujar(response)
    }else{
        dibujarGuarani(response)
    }
}
async function listarIngresosSearch() {
    let fecha=document.getElementById("search").value
    let response = await fetch('php/listarPorFecha.php?fecha='+fecha);
    response = await response.json();
    console.log(response)
    dibujar(response)
    
}

function dibujar(params) {
    let tr=``
    let ingreso=0
    let ingresoEfectivo=0
    let ingresoTarjeta=0
    let ingresoMp=0
    let egreso=0
    let color=""
    params.forEach(element => {
        if(element.tipo=="Ingreso"){
            ingreso+=parseFloat(element.monto);
            color="background:#d5ffd259;"
        }else if(element.tipo=="Egreso"){
            egreso+=parseFloat(element.monto);
            color="background:#ffd2d259;"
        }
        if(element.metodo=="Efectivo" && element.tipo=="Ingreso"){
            ingresoEfectivo+=parseFloat(element.monto);
        }else if(element.metodo=="Tarjeta" && element.tipo=="Ingreso"){
            ingresoTarjeta+=parseFloat(element.monto);
        }else if(element.metodo=="Mercado Pago" && element.tipo=="Ingreso"){
            ingresoMp+=parseFloat(element.monto);
        }
       
        tr+=`<tr>
            <td style="${color}">${element.tipo} ${element.metodo} ${element.moneda} <br><span class="badge badge-primary">${element.detalle}</span></td>
            <td style="${color}">${element.fecha}</td>
            <td style="${color}"><span class="badge rounded-pill badge-success">$${formatNumberWithCommas(element.monto)}</span></td>
        </tr>`
    });
    if(params.length==0){
        tr=`<tr><td colspan="3" style="text-align: center;">Sin Datos</td></tr>`
    }
    document.getElementById("tbodyPeso").innerHTML=tr
    document.getElementById("ingresoEfectivo").innerHTML="$"+formatNumberWithCommas(ingresoEfectivo-egreso)
    document.getElementById("ingresoTarjeta").innerHTML="$"+formatNumberWithCommas(ingresoTarjeta)
    document.getElementById("ingresoMp").innerHTML="$"+formatNumberWithCommas(ingresoMp)
    document.getElementById("ingreso").innerHTML="$"+formatNumberWithCommas(ingreso-egreso)
    document.getElementById("egresos").innerHTML="$"+formatNumberWithCommas(egreso)
}
function dibujarGuarani(params) {
    let tr=``
    let ingreso=0
    let egreso=0
    let color=""
    params.forEach(element => {
        if(element.tipo=="Ingreso"){
            ingreso+=parseFloat(element.monto);
            color="background:#d5ffd259;"
        }else if(element.tipo=="Egreso"){
            egreso+=parseFloat(element.monto);
            color="background:#ffd2d259;"
        }
        
       
        tr+=`<tr>
            <td style="${color}">${element.tipo} ${element.metodo} ${element.moneda} <br><span class="badge badge-primary">${element.detalle}</span></td>
            <td style="${color}">${element.fecha}</td>
            <td style="${color}"><span class="badge rounded-pill badge-success">$${formatNumberWithCommas(element.monto)}</span></td>
        </tr>`
    });
    if(params.length==0){
        tr=`<tr><td colspan="3" style="text-align: center;">Sin Datos</td></tr>`
    }
    document.getElementById("tbodyGuarani").innerHTML=tr
    document.getElementById("ingresoGuarani").innerHTML="$"+formatNumberWithCommas(ingreso-egreso)
    document.getElementById("egresosGuarani").innerHTML="$"+formatNumberWithCommas(egreso)
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

