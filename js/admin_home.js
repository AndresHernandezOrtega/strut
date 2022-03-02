const userData = JSON.parse(localStorage.getItem("userData"))

if (!userData) {
    
    window.location.href = "../../index.html"
}

// CERRAR SESION
const btn_exit = document.querySelector(".close_sesion")
btn_exit.addEventListener("click", () => {
    localStorage.removeItem("userData")
    window.location.reload(true)
})


