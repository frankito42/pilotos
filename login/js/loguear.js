document.getElementById("loginForm").addEventListener("submit",async (e)=>{
    e.preventDefault()
    let form=new FormData(document.getElementById("loginForm"))
    await fetch(`php/loguear.php`,{
        method:"POST",
        body:form,
    })
    .then(response => response.json())
    .then(async (data)=>{
        console.log(data)
        if(data=="mal"){
            document.getElementById("loginForm").reset()
            $("#error").modal("show")
        }else{
            localStorage.setItem("user", JSON.stringify(data));
           /*  localStorage.getItem("user"); */
            /* console.log(localStorage.getItem("user")) */
            if(data.admin==1){
                location.href="../admin/index.html"
            }else{
                location.href="../alumno/index.html"
            }

        }
    });
})

function comprobarSesion() {
    if(localStorage.getItem("user")){
        if(JSON.parse(localStorage.getItem("user")).admin==1){
            location.href="../admin/index.html"
        }else{
            location.href="../alumno/index.html"
        }
    }else{
       
    }
}
comprobarSesion()