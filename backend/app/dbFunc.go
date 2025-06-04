package app

import "log"

func (app *Application) AddUser(user User) (string, error) {
	checkUserExistsQuery := `select * from users where username=$1`
	result, err := app.DB.Exec(checkUserExistsQuery, user.Username)
	if err != nil {
		return "", err
	}

	rowsAffected, err := result.RowsAffected()
	if rowsAffected > 0 {
		return "This username already exists, pick another one!", nil
	}

	hashPassword, err := app.HashPassword(user.Password)
	if err != nil {
		return "", err
	}

	addUserQuery := `insert into users(username, password) values($1, $2)`
	_, err = app.DB.Exec(addUserQuery, user.Username, hashPassword)
	if err != nil {
		return "", err
	}

	return "Your account has been created successfully!", nil
}

func (app *Application) LoginUser(user User) (bool, User, string, error) {
	query := `select * from users where username=$1`
	result, err := app.DB.Exec(query, user.Username)
	if err != nil {
		return true, User{}, "", err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return false, User{}, "Either username or password is incorrect", nil
	}

	row := app.DB.QueryRow(query, user.Username)
	var userRecieved User
	var createdAt, updatedAt interface{}
	err = row.Scan(&userRecieved.ID, &userRecieved.Username, &userRecieved.Password, &createdAt, &updatedAt)
	log.Println(userRecieved)
	if err != nil {
		return true, User{}, "", err
	}

	err = app.ComparePasswordWithHash(user.Password, userRecieved.Password)
	if err != nil {
		return false, User{}, "Either username or password is incorrect", err
	}

	return true, userRecieved, "Logged in successfully!", nil
}
