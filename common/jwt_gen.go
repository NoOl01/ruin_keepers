package common

import (
	"errors"
	"example.com/m/v2/database"
	"fmt"
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

func JwtDecode(jwtStr string) (string, error) {
	key := []byte(os.Getenv("JWT_SECRET"))
	token, err := jwt.Parse(jwtStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return key, nil
	})
	if err != nil {
		return "", err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims["Id"].(string), nil
	}
	return "", errors.New("token invalid")
}
