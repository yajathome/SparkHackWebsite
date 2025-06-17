import React, { useState } from 'react';

function AdminLogin() {
    const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com"
    const developmentBackendLink = "http://localhost:4444"

    const handleSubmit = (event) => {
        event.preventDefault()

        let username = event.target.credential.value
        let password = event.target.password.value

        let payload = {
            credential: username,
            password: password,
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
        fetch(`${backendLink}/admin-login`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log("login incorrect:", data.error)
                    return
                }
                console.log(data)
                sessionStorage.removeItem("team")
                sessionStorage.setItem("admin_user", JSON.stringify(data.admin_user))
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit} method="post" style={{"marginTop": "20%"}}>
                <input type="text" name="credential" placeholder="username" id="credential" />
                <input type="password" name="password" placeholder="password" id="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AdminLogin