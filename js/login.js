const getUser = async (email, pass) => {

    let userData = await axios.get(`http://localhost:8000/api/users/${email}/${pass}`)
    .then(res => res.data[0])
    .catch(err => console.error(err))

    console.log(userData)
    return userData
}

const login_btn = document.querySelector(".login")
login_btn.addEventListener("click", (e) => {

    e.preventDefault()
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value

    getUser(email, password)
    .then(res => {
        if (res) {
            
            localStorage.setItem("userData", JSON.stringify(res))

            if(JSON.parse(localStorage.getItem("userData")).role === "admin"){

                location.href = "./Admins/home.html"
            }else{{
                location.href = "./Employs/home.html"
            }}

        }else{

            document.querySelector(".error_credentials").hidden = false

            setTimeout(()=> {
                document.querySelector(".error_credentials").hidden = true
            }, 6000)
        }
    })
})


const main_logo = document.querySelector(".logo")
main_logo.addEventListener("click", () => window.location.href = "../index.html")

window.onload = () => {
    localStorage.clear()
}