package common

import (
	"example.com/m/v2/database"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
	"os"
)

func JwtGenerate(account database.Admin, db *gorm.DB) (string, error) {
	key := []byte(os.Getenv("JWT_SECRET"))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Id":    account.Id,
		"Login": account.Login,
	})

	return token.SignedString(key)
}
