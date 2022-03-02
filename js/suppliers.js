const buttonsFunctionsSuppliers = () =>{

    const delete_btns_supplier = document.querySelectorAll(".delete_supplier")
    const update_btns_supplier = document.querySelectorAll(".edit_supplier")
    const update_form_supplier = document.querySelector(".update_supplier_form")

    // DELETE BUTTONS
    delete_btns_supplier.forEach(element => {
        
        element.addEventListener("click", () => {

            let id = element.parentElement.id
            axios.delete(`http://localhost:8000/api/supplier/${id}`)
            .then(res => {
                alert("Proveedor eliminado eliminado")
                renderSuppliers()
            })
        })
    });

    // UPDATE BUTTONS
    update_btns_supplier.forEach(element => {
        
        element.addEventListener("click", async () => {

            update_form_supplier.style.display = "flex"
            document.querySelector(".add_supplier_form").style.display = "none"

            let id = element.parentElement.id
            let res = await axios.get(`http://localhost:8000/api/getBussinesSuppliers/${userData.bussines_id}`)
            let data = res.data.filter((element) => element.id === parseInt(id))[0]
            console.log(data)


            // RELLENAR LOS VALORES DEL FORMULARIO
            document.querySelector("#Usupplier_name").value = data.supplier_name
            document.querySelector("#Usupplier_nit").value = data.suppplier_nit
            document.querySelector("#Usupplier_phone").value = data.supplier_phone
            document.querySelector("#Usupplier_addres").value = data.supplier_addres

            let button_update_supplier = document.querySelector(".update_supplier")
            button_update_supplier.addEventListener("click", () => {

                axios.put(`http://localhost:8000/api/supplier/${id}`, {

                    supplier_name : document.querySelector("#Usupplier_name").value,
                    suppplier_nit : document.querySelector("#Usupplier_nit").value,
                    supplier_phone : document.querySelector("#Usupplier_phone").value,
                    supplier_addres : document.querySelector("#Usupplier_addres").value
                }).then(res => {
                    update_form_supplier.style.display = "none"
                    renderSuppliers()
                })

                
            })
        })
    });
}

// FUNCION RENDER PROVEEDORES
const renderSuppliers = async () => {
    
    const container_suppliers = document.querySelector(".registered_suppliers")
    let res = await axios.get(`http://localhost:8000/api/getBussinesSuppliers/${userData.bussines_id}`)
    let registeredSuppliers = res.data
    console.log(registeredSuppliers)
    container_suppliers.innerHTML = ""

    registeredSuppliers.forEach(element => {

        
        let supplier = `

        <div class="registered_supplier" id="${element.id}">

            <div class="supplier_avatar">${element.supplier_name.charAt()}</div>
            <h2 class="supplier_name">${element.supplier_name}</h2>
            <h2 class="suppplier_nit">Nit: ${element.suppplier_nit}</h2>
            <h2 class="supplier_phone"><i class="fas fa-phone"></i> ${element.supplier_phone}</h2>
            <h2 class="supplier_addres">${element.supplier_addres}</h2>

            <i class="far fa-trash-alt delete_supplier button"></i>
            <i class="fas fa-edit edit_supplier button"></i>

        </div>
        `

        container_suppliers.innerHTML += supplier
    });

    buttonsFunctionsSuppliers()
    
}

// FUNCION CREAR PRODUCTS
const createSupplier = () => {

    let save_supplier_btn = document.querySelector(".save_supplier")
    save_supplier_btn.addEventListener("click", () => {

        let supplier_name = document.querySelector("#supplier_name").value
        let supplier_nit = document.querySelector("#supplier_nit").value
        let supplier_phone = document.querySelector("#supplier_phone").value
        let supplier_addres = document.querySelector("#supplier_addres").value

        if (supplier_name &&
            supplier_nit &&
            supplier_phone &&
            supplier_addres) {

                axios.post("http://localhost:8000/api/supplier", {

                    supplier_name : supplier_name,
                    suppplier_nit : supplier_nit,
                    supplier_phone : supplier_phone,
                    supplier_addres : supplier_addres,
                    bussines_id : userData.bussines_id
                    
                })
                .then(res => {
                    alert("PROVEEDOR NUEVO REGISTRADO")
                    renderSuppliers()
                    document.querySelector(".add_supplier_form").style.display = "none"
                })
            
        }else{
            alert("DEBES LLENAR TODOS LOS CAMPOS")
        }

        
    })
}

// RENDER ALL 
const renderAllInSuppliers = () => {

    renderSuppliers()
    createSupplier()

}
// BOTON PROVEEDORES
const suppliers_btn = document.querySelector(".suppliers")


suppliers_btn.addEventListener("click", () => {

    module_main.className = "module suppliers_module"
    module_main.innerHTML = `

        <div class="module_tittle">

            <h2>Proveedores | </h2>
            <button class="add_supplier add_button"><i class="fas fa-plus"></i></button>
        </div>
        
        <hr>
        
        <div class="add_supplier_form">
            <h2>Añadir un proveedor nuevo</h2>
            <input type="text" class="input" placeholder="Nombre" id="supplier_name">
            <input type="text" min="0" class="input" placeholder="Nit de proveedor" id="supplier_nit">
            <input type="number" min="0" class="input" placeholder="Numero de telefono" id="supplier_phone">
            <input type="text" min="0" class="input" placeholder="Dirección" id="supplier_addres">

            <button class="add_button save_supplier"><i class="fas fa-save"></i></button>
        </div>
        
        <div class="update_supplier_form">
            <h2>Actualizar datos del proveedor</h2>
            
            <input type="text" class="input" placeholder="Nombre" id="Usupplier_name">
            <input type="text" min="0" class="input" placeholder="Nit de proveedor" id="Usupplier_nit">
            <input type="number" min="0" class="input" placeholder="Numero de telefono" id="Usupplier_phone">

            <input type="text" min="0" class="input" placeholder="Dirección" id="Usupplier_addres">
            <button class="add_button update_supplier"><i class="fas fa-save"></i>  </button>
        </div>

        <div class="registered_suppliers">         
        </div>
    `
    // APARECER FORMULARIO DE CREAR
    const add_supplier_button = document.querySelector(".add_supplier")
    add_supplier_button.addEventListener("click", () => {

        let form_create_supplier = document.querySelector(".add_supplier_form")
        form_create_supplier.style.display = "flex"
    })

    renderAllInSuppliers()

})