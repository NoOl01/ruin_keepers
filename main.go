package main

import (
	"example.com/m/v2/database"
	"example.com/m/v2/router"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"time"
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
	rout.Static("/uploads", "./uploads")

	rout.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // или "*" для всех
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	db := database.Connect()

	rout.Use(cors.Default())
	router.Router(rout, db)

	err = rout.Run(":8080")
	if err != nil {
		panic(err)
	}
}
