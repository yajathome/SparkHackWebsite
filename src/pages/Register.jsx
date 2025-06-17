import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
    const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com"
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    const handleRegisterSubmit = (event) => {
        event.preventDefault()

        let team_name = event.target.team_name.value
        let member_names = event.target.member_names.value
        let password = event.target.password.value
        let school_name = event.target.school_name.value

        let member_name_list = member_names.split(" ")
        let team_count = member_name_list.length
        if (team_count > 5) {
            console.log("Too many members. Limit is 5")
            return
        }

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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
            <form method="post" onSubmit={handleRegisterSubmit} style={{"marginTop":"5%", "color": "#fff"}}>
                <div style={{"textAlign": "center", "marginBottom": "20px"}}>
                    <h1 style={{    fontSize: '60px',fontWeight: '900',background: 'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',display: 'inline-block',}} >Register Page</h1>
                </div>    
                <div  style={{"textAlign": "center", "marginTop": "6px"}}>  
                    <label htmlFor="team_name" style={{fontWeight:'bold'}}>Team Name:</label>
                    <div style={{display: 'flex', justifyContent: 'center',paddingTop: '10px'}}>
                        <input type="text" className="form-control" placeholder="Team Name" name="team_name" id="team_name" style={{"width":"50%",}} />
                    </div>    
                        

                    <br />
                    <br />

                    <label style={{fontWeight:'bold'}} htmlFor="member_names">Names of members(separate names with space) </label>
                    <div style={{display: 'flex', justifyContent: 'center',paddingTop: '10px'}}>    
                        <input type="text" className="form-control" placeholder="Member Names" name="member_names" id="member_names" style={{"width":"50%",}} />
                    </div>
                    <br />
                    <br />
                
                    <label style={{fontWeight:'bold'}} htmlFor="school_name">School Name:</label>
                    <div style={{display: 'flex', justifyContent: 'center',paddingTop: '10px'}}>    
                        <input type="text" className="form-control"  placeholder="School Name" name="school_name" id="school_name" style={{"width":"50%"}} />
                    </div>
                    <br />
                    <br />

                    <label style={{fontWeight:'bold'}} htmlFor="password">Password:</label>
                    <div style={{display: 'flex', justifyContent: 'center',paddingTop: '10px'}}>
                        <input type="password" className="form-control" placeholder="Password" name="password" id="password" style={{"width":"50%"}} />
                    </div>
                    <br />
                    <br />

                    <button type="submit" className="btn" style={{ "marginBottom":"10px",borderRadius:"40px",background:'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',color:'white',fontWeight:'BOLD',paddingLeft:'30PX',paddingRight:'30px',paddingTop:'10PX',paddingBottom:'10px',}}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register