package controllers

import (
	"net/http"
	"strings"

	"example.com/m/v2/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllTours(ctx *gin.Context, db *gorm.DB) {
	var tour []database.Tour

	result := db.Select("Id", "Name", "Place", "Price").Find(&tour)
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

func GetTourById(ctx *gin.Context, db *gorm.DB) {
	tourId := ctx.Query("id")
	if tourId == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"result": nil,
			"error":  "Error: Tour id (Query) is missing",
		})
		return
	}
	var tour database.Tour
	result := db.Preload("Points").First(&tour, tourId)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
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
			"error": "Error: " + err.Error(),
		})
		return
	}

	if err := db.Create(&tour).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"error": nil,
	})
}

func UpdateTour(ctx *gin.Context, db *gorm.DB) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Error: Authorization header is missing",
		})
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	if tokenString == authHeader {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Error: wrong authorization token",
		})
		return
	}

	// Получаем ID тура из параметров пути
	tourID := ctx.Param("id")
	if tourID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: tour ID is missing in URL",
		})
		return
	}

	var updatedData database.Tour
	if err := ctx.ShouldBindJSON(&updatedData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: invalid request body",
		})
		return
	}

	if err := db.Model(&database.Tour{}).Where("id = ?", tourID).Updates(updatedData).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Tour updated successfully",
	})
}
