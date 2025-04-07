package controllers

import (
	"net/http"
	"os/user"
	"strings"

	"example.com/m/v2/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllTours(ctx *gin.Context, db *gorm.DB) {
	var tour []database.Tour

	result := db.Find(&tour)
	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"result": nil,
			"error":  "Error: " + result.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"result": tour,
		"error":  nil,
	})
}

func AddTour(ctx *gin.Context, db *gorm.DB) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Error: Authorization header is missing",
		})
		return
	}

	tokenString := strings.Trim(authHeader, "Bearer ")
	if tokenString == authHeader {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Error: wrong authorization token",
		})
		return
	}

	var tour database.Tour

	if err := ctx.BindJSON(&tour); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: " + err.Error()
		})
		return
	}

	if err := db.Create(&tour).Error; err != nil{
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"error": nil,
	})
}

func UpdateTour(ctx *gin.Context, db *gorm.DB){
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Error: Authorization header is missing",
		})
		return
	}

	tokenString := strings.Trim(authHeader, "Bearer ")
	if tokenString == authHeader {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Error: wrong authorization token",
		})
		return
	}

	var tour database.Tour

	if err := db.Model().Update(&tour).Where("id = ?", &tour).Error; err != nil{
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"error": nil,
	})
}