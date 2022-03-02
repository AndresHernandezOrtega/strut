// FUNCION RENDER PRODUCTOS
const renderProducts = async () => {
    const container = document.querySelector(".registered_products")
    let res = await axios.get(`http://localhost:8000/api/getBussinesProducts/${userData.bussines_id}`)
    let registeredProducts = res.data
    console.log(registeredProducts)
    container.innerHTML = ""
    registeredProducts.forEach(element => {

        
        let product = `

        <div class="registered_product" id="${element.id}">

            <h2 class="ref">Ref. ${element.id}</h2>
            <h2 class="product_name">${element.product_name}</h2>
            <h2 class="stock">Unidades disponibles: ${element.product_stock}</h2>

            <h2 class="price">$ ${element.product_price}</h2>


            <i class="far fa-trash-alt delete_product button"></i>
            <i class="fas fa-edit edit_product button"></i>

        </div>
        `

        container.innerHTML += product
    });

    buttonsFunctions()
    
}

// FUNCION RENDER OPCIONES DE PROVEEDORES
const renderSuppliersOptions = async () => {
    
    const select_supplier = document.querySelector("#supplier_id")
    let res = await axios.get(`http://localhost:8000/api/getBussinesSuppliers/${userData.bussines_id}`)
    let suppliers = res.data
    
    console.log(suppliers)
    suppliers.forEach(supplier => {
        
        let option = `

            <option id="${supplier.id}" value="${supplier.id}">${supplier.supplier_name}</option> 
        `
        select_supplier.innerHTML += option
        

    });
    
}

// FUNCION CREAR PRODUCTS
const createProduct = () => {

    let save_product_btn = document.querySelector(".save_product")
    save_product_btn.addEventListener("click", () => {

        let supplier_id = document.querySelector("#supplier_id").value
        let supplier_name = document.querySelector("#supplier_id").innerText
        let product_name = document.querySelector("#product_name").value
        let product_stock = document.querySelector("#product_stock").value
        let product_price = document.querySelector("#product_price").value

        if (supplier_id &&
            supplier_name &&
            product_name &&
            product_stock &&
            product_price) {

                axios.post("http://localhost:8000/api/products", {
                    product_supplier_id : supplier_id,
                    bussines_id : userData.bussines_id,
                    product_supplier_name : supplier_name,
                    product_name : product_name,
                    product_stock : product_stock,
                    product_price : product_price
                    
                })
                .then(res => {
                    alert("PRODUCTO REGISTRADO")
                    renderProducts()
                    document.querySelector(".add_product_form").style.display = "none"
                })
            
        }else{
            alert("DEBES LLENAR TODOS LOS ")
        }

        
    })
}

// FUNCION DE LOS BOTONES DE PRODUCTOS
const buttonsFunctions = () => {

    const delete_btns = document.querySelectorAll(".delete_product")
    const update_btns = document.querySelectorAll(".edit_product")
    const update_form = document.querySelector(".update_product_form")

    // DELETE BUTTONS
    delete_btns.forEach(element => {
        
        element.addEventListener("click", () => {

            let id = element.parentElement.id
            axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                alert("Producto eliminado")
                renderProducts()
            })
        })
    });

    // UPDATE BUTTONS
    update_btns.forEach(element => {
        
        element.addEventListener("click", async () => {

            update_form.style.display = "flex"
            document.querySelector(".add_product_form").style.display = "none"
            let id = element.parentElement.id
            let res = await axios.get(`http://localhost:8000/api/getBussinesProducts/${userData.bussines_id}`)
            let data = res.data.filter((element) => element.id === parseInt(id))[0]
            console.log(data)


            // RELLENAR LOS VALORES DEL FORMULARIO
            document.querySelector("#Uproduct_name").value = data.product_name
            document.querySelector("#Uproduct_stock").value = data.product_stock
            document.querySelector("#Uproduct_price").value = data.product_price

            let button_update = document.querySelector(".update_product")
            button_update.addEventListener("click", () => {

                axios.put(`http://localhost:8000/api/products/${id}`, {

                    product_name : document.querySelector("#Uproduct_name").value,
                    product_stock : document.querySelector("#Uproduct_stock").value,
                    product_price : document.querySelector("#Uproduct_price").value
                }).then(res => {
                    update_form.style.display = "none"
                    renderProducts()
                })

                
            })
        })
    });
}

const renderAllInProducts = () => {

    renderProducts()
    renderSuppliersOptions()
    createProduct()

}

// BOTON PRODUCTOS
const products_btn = document.querySelector(".products")
const module_main = document.querySelector(".module")

products_btn.addEventListener("click", () => {

    module_main.className = "module productos_module"
    module_main.innerHTML = `

        <div class="module_tittle">

            <h2>Productos y Servicios | </h2>
            <button class="add_product add_button"><i class="fas fa-plus"></i></button>
        </div>
        
        <hr>
        
        <div class="add_product_form">
            <h2>Añadir un producto</h2>
            <label for="supplier_id">Seleccionar un proveedor</label>
            <select id="supplier_id" class="input">
                
            </select>
            <input type="text" class="input" placeholder="Nombre del producto" id="product_name">
            <input type="number" min="0" class="input" placeholder="Stock inicial uds." id="product_stock">
            <input type="number" min="0" class="input" placeholder="Precio COP $" id="product_price">
            <button class="add_button save_product"><i class="fas fa-save"></i>  </button>
        </div>
        
        <div class="update_product_form">
            <h2>Actualizar datos del producto</h2>
            
            <label for="Uproduct_name">Nombre del producto</label>
            <input type="text" class="input" placeholder="Nombre del producto" id="Uproduct_name">

            <label for="Uproduct_stock">Unidades en stock</label>
            <input type="number" min="0" class="input" placeholder="Stock inicial uds." id="Uproduct_stock">
            
            <label for="Uproduct_price">Precio</label>
            <input type="number" min="0" class="input" placeholder="Precio COP $" id="Uproduct_price">
            <button class="add_button update_product"><i class="fas fa-save"></i>  </button>
        </div>

        <div class="registered_products">         
        </div>
    `
    // APARECER FORMULARIO DE CREAR
    const add_product_button = document.querySelector(".add_product")
    add_product_button.addEventListener("click", () => {

        let form_create_product = document.querySelector(".add_product_form")
        form_create_product.style.display = "flex"
    })

    renderAllInProducts()

})


window.onload = async () => {
    document.querySelector(".products").click()

    var bussinesData = await axios.get(`http://localhost:8000/api/bussines/${userData.bussines_id}`)

    document.querySelector(".usuario").innerHTML = `<i class="fas fa-envelope-open"></i> ${userData.name} ${userData.lastName}<br><span class="negocio">${bussinesData.data.negocio.bussines_name}</span><br><span class="id_bussines">Invita empleados con este id: ${userData.bussines_id} </span>`
}
