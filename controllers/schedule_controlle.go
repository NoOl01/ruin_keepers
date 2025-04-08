package controllers

import (
	"net/http"
	"strings"

	"example.com/m/v2/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AddSchedule(ctx *gin.Context, db *gorm.DB) {
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

	var schedule database.ScheduledTour

	if err := ctx.BindJSON(&schedule); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}

	if err := db.Create(&schedule).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"result": gin.H{
			"id": schedule.ID,
		},
		"error": nil,
	})
}
