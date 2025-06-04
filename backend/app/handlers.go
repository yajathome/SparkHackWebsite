package app

import (
	"log"
	"net/http"
)

func (app *Application) Login(w http.ResponseWriter, r *http.Request) {
	var input User
	err := app.readJSON(r, &input)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	loggedIn, user, message, err := app.LoginUser(input)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusAccepted)
		return
	}

	output := struct {
		LoggedIn bool   `json:"logged_in"`
		User     User   `json:"user"`
		Message  string `json:"message"`
	}{
		LoggedIn: loggedIn,
		User:     user,
		Message:  message,
	}

	err = app.writeJSON(w, http.StatusOK, output)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}
}

func (app *Application) Register(w http.ResponseWriter, r *http.Request) {
	var input User
	err := app.readJSON(r, &input)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}
	log.Println(input)

	message, err := app.AddUser(input)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	output := struct {
		Message string `json:"message`
	}{
		Message: message,
	}

	app.writeJSON(w, http.StatusOK, output)
}
