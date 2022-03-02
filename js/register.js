const postBussines = async (bussines_info) => {
    
    try {

        let bussines_id = await axios.post(`http://localhost:8000/api/bussines`, bussines_info)
        let id = bussines_id.data.id

        return id

    } catch (error) {
        
        console.error(error)
    }


    
}

const postAdmin = async (userInfo, bussines_info) => {
    try {

        let bussines_id = await postBussines(bussines_info)

        userInfo.bussines_id = bussines_id
        return userInfo
    }catch(error) {
        
        console.error(error)
    }
   
}
    

const postEmploy = async (userInfo) => {


    try {

        let user = await axios.post("http://localhost:8000/api/users", userInfo)
        console.log(user)
        let data = user.data.messege
        alert(data)
        window.location.href = "./login.html"
    } catch (error) {
        
        console.error(error)
    }
}


const select = document.querySelector("#role")

    
select.addEventListener("click", () => {
    if (select.value === "employ") {
        
        document.querySelector("#bussines_id").hidden = false
        document.querySelector(".bussines_info").hidden = true



    }else{

        document.querySelector("#bussines_id").hidden = true
        document.querySelector(".bussines_info").hidden = false

    }
})

const btn_register = document.querySelector(".register_btn")
btn_register.addEventListener("click", async () => {



    // REGISTRO DE ADMINISTRADOR
    if (select.value === "admin"){


        if (document.querySelector("#email").value &&
        document.querySelector("#name").value && 
        document.querySelector("#lastName").value &&
        document.querySelector("#password").value &&
        document.querySelector("#bussines_name").value &&
        document.querySelector("#description").value ) {
            

            if (document.querySelector("#password").value === document.querySelector("#repPassword").value) {
                
                let email = document.querySelector("#email").value
                let name = document.querySelector("#name").value
                let lastName = document.querySelector("#lastName").value
                let password = document.querySelector("#password").value
                let bussines_name = document.querySelector("#bussines_name").value
                let description = document.querySelector("#description").value

                let buss_id = await postBussines(
                {
                    bussines_name : bussines_name,
                    description : description
                })
                    
                let postEmp = await postEmploy({
    
                    email : email,
                    name : name,
                    lastName : lastName,
                    password : password,
                    role : "admin",
                    bussines_id : buss_id
                    
                })

                

            }else{
                alert("Las contraseñas no coinciden")
            }

        }else{
            document.querySelector(".credenciales").hidden = false
        }

// REGISTRO DE USUARIO EMPLEADO
    }else{

        if (document.querySelector("#password").value === document.querySelector("#repPassword").value) {

            let email = document.querySelector("#email").value
            let name = document.querySelector("#name").value
            let lastName = document.querySelector("#lastName").value
            let password = document.querySelector("#password").value
            let bussines_id = document.querySelector("#bussines_id").value

            postEmploy({
        
                email : email,
    
                name : name,
    
                lastName : lastName,
    
                password : password,
                
                role : "employ",
                
                bussines_id : bussines_id
                
            })

        }
    }

})

const main_logo = document.querySelector(".logo")
main_logo.addEventListener("click", () => window.location.href = "../index.html")


