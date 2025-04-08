package controllers

import (
	"bytes"
	"fmt"
	"io"
	"net/http"

	"example.com/m/v2/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AddSchedule(ctx *gin.Context, db *gorm.DB) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
		return
	}
	
	body, _ := ctx.GetRawData()
	fmt.Println("RAW BODY:", string(body))
	ctx.Request.Body = io.NopCloser(bytes.NewBuffer(body)) // иначе BindJSON не сможет прочитать повторно

	var schedule database.ScheduledTour
	if err := ctx.ShouldBindJSON(&schedule); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid input", "details": err.Error()})
		return
	}

	fmt.Printf("Received: %+v\n", schedule)

	if schedule.TourID == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "tour_id is required"})
		return
	}

	if err := db.Create(&schedule).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"error": nil, "id": schedule.ID})
}