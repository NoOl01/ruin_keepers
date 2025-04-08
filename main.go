package main

import (
	"time"

	"example.com/m/v2/database"
	"example.com/m/v2/router"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"net/http"
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

	rout.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "*"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	rout.Static("/assets", "./ruin_web/dist/assets")
	rout.Static("/uploads", "./uploads")
	rout.LoadHTMLFiles("./ruin_web/dist/index.html")

	rout.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	db := database.Connect()
	router.Router(rout, db)

	err = rout.Run(":8081")
	if err != nil {
		panic(err)
	}
}
