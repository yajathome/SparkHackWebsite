import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
    const backendLink = "http://localhost:4444"
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    const handleRegisterSubmit = (event) => {
        event.preventDefault()

        let team_name = event.target.team_name.value
        let member_names = event.target.member_names.value
        let password = event.target.password.value
        let school_name = event.target.school_name.value

        let member_name_list = member_names.split(" ")
        if (member_name_list.length > 5) {
            console.log("Too many members. Limit is 5")
            return
        }

        let team_count = member_name_list.length

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team_name: team_name,
                team_count: team_count,
                member_names: member_names,
                school_name: school_name,
                password: password,
            }),
        }

        fetch(`${backendLink}/register`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                    return
                }
                if (data.message === "This team name already exists, pick another one!") {
                    return
                }
                console.log(data)
                setMessage(data.message)
                navigate("/login")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <form method="post" onSubmit={handleRegisterSubmit} style={{"marginTop": "20%", "color": "#fff"}}>
                <h1>Register Page</h1>
                <label htmlFor="team_name">Team Name:</label>
                <input type="text" placeholder="Team Name" name="team_name" id="team_name" style={{"color": "#000"}} />

                <br />
                <br />

                <label htmlFor="member_names">Names of members(separate names with space)</label>
                <input type="text" placeholder="Member Names" name="member_names" id="member_names" style={{"color": "#000"}} />

                <br />
                <br />
                
                <label htmlFor="school_name">School Name:</label>
                <input type="text" placeholder="School Name" name="school_name" id="school_name" style={{"color": "#000"}} />

                <br />
                <br />

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="Password" name="password" id="password" style={{"color": "#000"}} />

                <br />
                <br />

                <button type="submit" style={{"backgroundColor": "#000", "padding": "0.5%"}}>Register</button>
            </form>
        </div>
    )
}

export default Register