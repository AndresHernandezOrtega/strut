const buttonsFunctionsClients = () => {
    const delete_btns_clients = document.querySelectorAll(".delete_client")
    const update_btns_clients = document.querySelectorAll(".edit_client")
    const update_form_client = document.querySelector(".update_client_form")

    // DELETE BUTTONS
    delete_btns_clients.forEach(element => {
        
        element.addEventListener("click", () => {

            let id = element.parentElement.id
            axios.delete(`http://localhost:8000/api/clients/${id}`)
            .then(res => {
                alert("Proveedor eliminado eliminado")
                renderClients()
            })
        })
    });

    // UPDATE BUTTONS
    update_btns_clients.forEach(element => {
        
        element.addEventListener("click", async () => {

            update_form_client.style.display = "flex"
            document.querySelector(".add_client_form").style.display = "none"

            let id = element.parentElement.id
            let res = await axios.get(`http://localhost:8000/api/getBussinesClients/${userData.bussines_id}`)
            let data = res.data.filter((element) => element.id === parseInt(id))[0]
            console.log(data)


            // RELLENAR LOS VALORES DEL FORMULARIO
            document.querySelector("#Uclient_name").value = data.client_name
            document.querySelector("#Uclient_lastName").value = data.client_lastName
            document.querySelector("#Uclient_phone_number").value = data.client_phone_number
            document.querySelector("#Uclient_addres").value = data.client_addres

            let button_update_client = document.querySelector(".update_client")
            button_update_client.addEventListener("click", () => {

                axios.put(`http://localhost:8000/api/clients/${id}`, {

                    client_name : document.querySelector("#Uclient_name").value,
                    client_lastName : document.querySelector("#Uclient_lastName").value,
                    client_phone_number : document.querySelector("#Uclient_phone_number").value,
                    client_addres : document.querySelector("#Uclient_addres").value
                }).then(res => {
                    update_form_client.style.display = "none"
                    renderClients()
                })

                
            })
        })
    });
}

// FUNCION RENDER CLIENTES
const renderClients = async () => {
    
    const container_clients = document.querySelector(".registered_clients")
    let res = await axios.get(`http://localhost:8000/api/getBussinesClients/${userData.bussines_id}`)
    let registeredSuppliers = res.data
    console.log(registeredSuppliers)
    container_clients.innerHTML = ""

    registeredSuppliers.forEach(element => {

        
        let client = `

        <div class="registered_client" id="${element.id}">

            <div class="client_avatar">${element.client_name.charAt()}</div>
            <h2 class="client_name">${element.client_name}</h2>
            <h2 class="client_lastName">${element.client_lastName}</h2>
            <h2 class="client_phone_number"><i class="fas fa-phone"></i> ${element.client_phone_number}</h2>
            <h2 class="client_addres">${element.client_addres}</h2>

            <i class="far fa-trash-alt delete_client button"></i>
            <i class="fas fa-edit edit_client button"></i>

        </div>
        `

        container_clients.innerHTML += client
    });

    buttonsFunctionsClients()
    
}

// FUNCION CREAR CLIENTE
const createClient = () => {

    let save_client_btn = document.querySelector(".save_client")
    save_client_btn.addEventListener("click", () => {

        let client_name = document.querySelector("#client_name").value
        let client_lastName = document.querySelector("#client_lastName").value
        let client_phone_number = document.querySelector("#client_phone_number").value
        let client_addres = document.querySelector("#client_addres").value

        if (client_name &&
            client_lastName &&
            client_phone_number &&
            client_addres) {

                axios.post("http://localhost:8000/api/clients", {

                    client_name : client_name,
                    client_lastName : client_lastName,
                    client_phone_number : client_phone_number,
                    client_addres : client_addres,
                    bussines_id : userData.bussines_id
                    
                })
                .then(res => {
                    alert("CLIENTE NUEVO REGISTRADO")
                    renderClients()
                    document.querySelector(".add_client_form").style.display = "none"
                })
            
        }else{
            alert("DEBES LLENAR TODOS LOS CAMPOS")
        }

        
    })
}

const renderAllInClients = () => {
    createClient()
    renderClients()
}

// BOTON CLIENTES
const clients_btn = document.querySelector(".clients")

clients_btn.addEventListener("click", () => {

    module_main.className = "module clients_module"
    module_main.innerHTML = `

        <div class="module_tittle">

            <h2>Cientes | </h2>
            <button class="add_client add_button"><i class="fas fa-plus"></i></button>
        </div>
        
        <hr>
        
        <div class="add_client_form">
            <h2>Añadir un cliente nuevo</h2>

            <input type="text" class="input" placeholder="Nombres" id="client_name">
            <input type="text" min="0" class="input" placeholder="Apellidos" id="client_lastName">
            <input type="number" min="0" class="input" placeholder="Numero de telefono" id="client_phone_number">
            <input type="text" min="0" class="input" placeholder="Dirección" id="client_addres">

            <button class="add_button save_client"><i class="fas fa-save"></i></button>
        </div>
        
        <div class="update_client_form">
            <h2>Actualizar datos del cliente</h2>
            
            <input type="text" class="input" placeholder="Nombre" id="Uclient_name">
            <input type="text" min="0" class="input" placeholder="Apellidos" id="Uclient_lastName">
            <input type="number" min="0" class="input" placeholder="Numero de telefono" id="Uclient_phone_number">

            <input type="text" min="0" class="input" placeholder="Dirección" id="Uclient_addres">
            <button class="add_button update_client"><i class="fas fa-save"></i>  </button>
        </div>

        <div class="registered_clients">         
        </div>
    `
    // APARECER FORMULARIO DE CREAR
    const add_client_button = document.querySelector(".add_client")
    add_client_button.addEventListener("click", () => {

        let form_create_client = document.querySelector(".add_client_form")
        form_create_client.style.display = "flex"
    })

    renderAllInClients()

})