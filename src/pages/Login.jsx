import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const backendLink = "http://localhost:4444"
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    const handleLoginSubmit = (event) => {
        event.preventDefault()

        let username = event.target.username.value
        let password = event.target.password.value

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }

        fetch(`${backendLink}/login`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setMessage(data.message)
                if (data.logged_in) {
                    sessionStorage.setItem("user", JSON.stringify(data.user))
                    navigate("/")
                } else {
                    return
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <form method="post" onSubmit={handleLoginSubmit} style={{"marginTop": "20%"}}>
                <h1>Login Page</h1>
                <label htmlFor="username"></label>
                <input type="text" placeholder="Username" name="username" id="username" />
                
                <label htmlFor="password"></label>
                <input type="text" placeholder="Password" name="password" id="password" />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login