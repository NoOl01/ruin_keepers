package controllers

import (
	"net/http"

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
