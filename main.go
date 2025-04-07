package main

import (
	"example.com/m/v2/database"
	"example.com/m/v2/router"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// @title Ruin keepers
// @version 0.1
// @host localhost:8080
// @BasePath /api/v1
// @schemes http
func main() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	rout := gin.Default()

	db := database.Connect()

	rout.Use(cors.Default())
	router.Router(rout, db)

	err = rout.Run(":8080")
	if err != nil {
		panic(err)
	}
}
