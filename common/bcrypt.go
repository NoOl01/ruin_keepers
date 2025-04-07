package common

import (
	"example.com/m/v2/database"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Encrypt(password string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(err)
	}

	return string(hash)
}

func CheckPass(account database.Admin, db *gorm.DB) string {
	var user database.Admin

	err := db.Where("login = ?", account.Login).First(&user).Error
	if err != nil {
		fmt.Println(err)
		return "user not found"
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(account.Password))
	if err != nil {
		fmt.Println(err)
		return "wrong password"
	}

	return "Ok"
}
