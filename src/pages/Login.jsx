import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const backendLink = "http://localhost:4444"
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    const handleLoginSubmit = (event) => {
        event.preventDefault()

        let team_name = event.target.team_name.value
        let password = event.target.password.value

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team_name: team_name,
                password: password,
            }),
        }

        fetch(`${backendLink}/login`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setMessage(data.message)
                if (data.logged_in) {
                    sessionStorage.setItem("team", JSON.stringify(data.team))
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
                <label htmlFor="team_name">Team Name</label>
                <input type="text" placeholder="Team Name" name="team_name" id="team_name" />
                
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" name="password" id="password" />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login