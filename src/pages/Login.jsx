import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

    const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com"
    const developmentBackendLink = "http://localhost:4444"

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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
            <form method="post" onSubmit={handleLoginSubmit} style={{ "marginTop":"5%", "color": "#fff"}}>
                <div style={{"textAlign": "center", "marginBottom": "20px"}}>    
                    <h1 style={{    fontSize: '60px',fontWeight: '900',background: 'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',display: 'inline-block',}}>Login Page</h1>
                </div>
                <div  style={{"textAlign": "center", "marginTop": "6px"}}>  
                    <label style={{fontWeight:'bold'}} htmlFor="team_name">Team Name</label>
                    <div style={{display: 'flex', justifyContent: 'center',paddingTop: '10px'}}>
                        <input type="text" className="form-control" placeholder="Team Name" name="team_name" id="team_name" style={{"width":"50%",}}/>
                    </div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" id="password" />

                    <button type="submit">Login</button>

                    {message && <p>{message}</p>}
                </div>
            </form>
        </div>
    )
}

export default Login