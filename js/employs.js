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

// FUNCION PARA RENDER DE ORDENES
const renderOrders = async () => {
    
    const container_orders = document.querySelector(".registered_orders")
    let res = await axios.get(`http://localhost:8000/api/orders/${userData.id}`)
    let registeredOrders = res.data.order

    container_orders.innerHTML = ""

    
    registeredOrders.forEach(async element => {

        if (element.state === "Pendiente") {
        
            let res = await axios.get(`http://localhost:8000/api/detail/${element.id}`)
            let details = res.data.detail
            console.log(details)
    
            let order = `
    
            <div class="registered_order" id="${element.id}">
    
                <div class="order_data">
    
                    <h2 class="ref_order">Orden N° ${element.id}</h2>
                    <h2 class="employ">Asignado al empleado con ID: ${element.id_employ_asigned}</h2>
                    <h2 class="state">Estado: ${element.state}</h2>
                    <h2 class="total">Valor total: $${element.total_price_order}</h2>
    
                    
    
                </div>
                
                <div class="details">
    
    
                </div>
    
                <button class="button_prymary button_entregar">Entregar</button>
                <button class="button_prymary button_cancelar">Cancelar</button>
            </div>
            `
    
            container_orders.innerHTML += order
    
            let div_details = document.querySelector(`div[id="${element.id}"] .details`)
            div_details.innerHTML = ""
    
            details.forEach(detail_order => {
                
                let detail = `
                    <div class="detail">
                        <h2>ID del producto: ${detail_order.product_id} </h2>
                        <h2>Cantidad: ${detail_order.amount} </h2>
    
                    </div>
                `
                div_details.innerHTML += detail
    
    
            });
    
            addButtonsFunction()
        }
    });

    

    
}


const addButtonsFunction = async () => {

    const entregar_btns = document.querySelectorAll(".button_entregar")
    const cancelar_btns = document.querySelectorAll(".button_cancelar")

    entregar_btns.forEach( element => {

        element.addEventListener("click", async () => {

            let id = element.parentElement.id
            console.log(id)
            let res = await axios.put(`http://localhost:8000/api/orders/${id}` ,{
                state : "Entregado"
            })

            alert("ORDEN ENTREGADA")
            renderOrders()
        })
         
    });

    cancelar_btns.forEach( element => {
        
        element.addEventListener("click", async () => {

            let id = element.parentElement.id
            console.log(id)
            let res = await axios.put(`http://localhost:8000/api/orders/${id}` ,{
                state : "Cancelado"
            })

            alert("ORDEN CANCELADA")
            renderOrders()
        })
         
    });
}

window.onload = async () => {
    var bussinesData = await axios.get(`http://localhost:8000/api/bussines/${userData.bussines_id}`)

    document.querySelector(".usuario").innerHTML = `<i class="fas fa-envelope-open"></i> ${userData.name} ${userData.lastName}<br><span class="negocio">${bussinesData.data.negocio.bussines_name}</span>`

    renderOrders()
}

