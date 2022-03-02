// FUNCION RENDER OPCIONES DE CLIENTES
const renderClientsOptions = async () => {
    
    const select_clients = document.querySelector("#client")
    let res = await axios.get(`http://localhost:8000/api/getBussinesClients/${userData.bussines_id}`)
    let clients = res.data
    
    console.log(clients)
    clients.forEach(client => {
        
        let option = `

            <option id="${client.id}" value="${client.id}">${client.client_name} ${client.client_lastName}</option> 
        `
        select_clients.innerHTML += option
        

    });
    
}

// FUNCION PARA AÑADIR PRODUCTOS AL DETALLE
const addToDetail = () => {
    
    let suggestions_rendered = document.querySelectorAll(".product_suggestion")

    suggestions_rendered.forEach(element => {
        
        element.addEventListener("click", () => {

            let cantidad = prompt("Cantidad: ")
            let id = element.id
            let price = element.dataset.price

            console.log(price)
            let masTotal = parseInt(cantidad) * parseInt(price)
            let totalActual = parseInt(localStorage.getItem("totalOrder"))

            let newTotal = masTotal + totalActual
            localStorage.setItem("totalOrder", newTotal)

            if (cantidad) {
                
                let det = {
                    product_id : id,
                    order_id : null,
                    amount : cantidad
                    
                }

                let detail = JSON.parse(localStorage.getItem("orderDetail"))
                detail.push(det)

                localStorage.setItem("orderDetail", JSON.stringify(detail))

                alert("PRODUCTO AÑADIDO A LA ORDEN")
            }
        })
    });
}

// FUNCION RENDER OPCIONES DE EMPLEADOS
const renderEmployOptions = async () => {
    
    const select_employ = document.querySelector("#employ")
    let res = await axios.get(`http://localhost:8000/api/users/${userData.bussines_id}`)
    let employs = res.data
    
    console.log(employs)
    employs.forEach(employ => {
        
        let option = `

            <option id="${employ.id}" value="${employ.id}">${employ.name} ${employ.lastName}</option> 
        `
        select_employ.innerHTML += option
        

    });
    
}

// FUNCION PARA SUGERENCIAS DE PRODUCTO
const renderSuggestionsProducts = () => {

    const suggestion_input = document.querySelector("#sugestion_input_product")
    const suggestions_container = document.querySelector(".product_sugestions")
    suggestion_input.addEventListener("input", async () => {

        if (suggestion_input.value.length > 2) {
            
            let res = await axios.get(`http://localhost:8000/api/products/${suggestion_input.value}`)
            let suggestions = res.data.producto
            console.log(suggestions)

            suggestions_container.innerHTML = ""

            suggestions.forEach(element => {
                
                let option = `

                    <div class="product_suggestion" id="${element.id}" data-price="${element.product_price}">${element.product_name}</div>
                `

                suggestions_container.innerHTML += option
            });

            addToDetail()
        }
    }) 
}

// FUNCION PARA CREAR ORDENES
const createOrder = () => {

    const createOrderBtn = document.querySelector(".save_order")
    createOrderBtn.addEventListener("click", async () => {

        let res = await axios.post("http://localhost:8000/api/orders", {

            bussines_id : userData.bussines_id,
            id_employ_asigned : document.querySelector("#employ").value,
            client_id : document.querySelector("#client").value,
            total_price_order : localStorage.getItem("totalOrder")

        })

        let order_id = res.data.messege.id

        // HACER DETALLES DE PRODUCTO
        let details = JSON.parse(localStorage.getItem("orderDetail"))
        details.forEach(async element => {
           
            let res = await axios.post("http://localhost:8000/api/detail", {

                bussines_id: userData.bussines_id,
                product_id :  element.product_id,
                order_id : order_id, 
                amount : element.amount
            })

            
        });

        alert("ORDEN REGISTRADA")
        document.querySelector(".add_order_form").style.display = "none"
        renderOrders()


    })
}

// FUNCION PARA RENDER DE ORDENES

const renderOrders = async () => {
    
    const container_orders = document.querySelector(".registered_orders")
    let res = await axios.get(`http://localhost:8000/api/getBussinesOrders/${userData.bussines_id}`)
    let registeredOrders = res.data

    container_orders.innerHTML = ""

    registeredOrders.forEach(async element => {

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
    });

    
}

const renderAllInOrders = () => {

    renderClientsOptions()
    renderEmployOptions()
    renderSuggestionsProducts()
    createOrder()
    renderOrders()

}
// BOTON ORDENES
const orders_btn = document.querySelector(".orders")

orders_btn.addEventListener("click", () => {

    module_main.className = "module orders_module"
    module_main.innerHTML = `

        <div class="module_tittle">

            <h2>Ordenes | </h2>
            <button class="add_order add_button"><i class="fas fa-plus"></i></button>
        </div>
        
        <hr>
        
        <div class="add_order_form">
            <h2>Crear una nueva orden</h2>

            <label for="employ">Selecciona un empleado</label>
            <select class="input" id="employ">

            </select>
            
            <label for="employ">Selecciona un cliente</label>
            <select class="input" id="client">

            </select>

            <label for="sugestion_input_product">Añadir productos</label>
            <input type="text" placeholder="Nombre del producto" id="sugestion_input_product" class="input">
            
            <div class="product_sugestions"> 

            </div>
            <button class="add_button save_order"><i class="fas fa-save"></i></button>
        </div>

        <div class="registered_orders">

        </div>

    `
    // APARECER FORMULARIO DE CREAR
    const add_order_button = document.querySelector(".add_order")
    add_order_button.addEventListener("click", () => {

        let form_create_order = document.querySelector(".add_order_form")
        form_create_order.style.display = "flex"
        localStorage.setItem("orderDetail", "[]")
        localStorage.setItem("totalOrder", "0")
    })


    renderAllInOrders()

})