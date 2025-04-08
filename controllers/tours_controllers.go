package controllers

import (
	"net/http"
	"strings"
	"time"

	"example.com/m/v2/common"
	"example.com/m/v2/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetAllTours GetAllTour
// @Summary получение туров
// @Tags tours
// @Success 200 {object} common.ResultWithErrors
// @Router /tours/all [get]
func GetAllTours(ctx *gin.Context, db *gorm.DB) {
	var tour []database.Tour

	result := db.Preload("ScheduledTours").Preload("Points").Find(&tour)
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

// GetTourById
// @Summary получение туров по id
// @Tags tours
// @Params tourId query string true "ID тура"
// @Success 200 {object} common.ResultWithErrors
// @Router /tours/tourById [get]
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

// GetScheduledTours
// @Summary получение расписания туров
// @Tags tours
// @Success 200 {object} common.ResultWithErrors
// @Router /tours/scheduledTours [get]
func GetScheduledTours(ctx *gin.Context, db *gorm.DB) {
	var tours []database.ScheduledTour

	if err := db.Preload("Points").Find(&tours).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"result": nil,
			"error":  "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"result": tours,
		"error":  nil,
	})
}

// GetScheduleTourById
// @Summary получение расписания туров по id
// @Tags tours
// @Params tourId query string true "ID тура"
// @Success 200 {object} common.ResultWithErrors
// @Router /tours/scheduledTourById [get]
func GetScheduleTourById(ctx *gin.Context, db *gorm.DB) {
	tourId := ctx.Query("id")
	if tourId == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"result": nil,
			"error":  "Error: Tour id (Query) is missing",
		})
		return
	}
	var tour database.ScheduledTour
	if err := db.Model(&database.ScheduledTour{}).Where("TourId = ?", tourId).Preload("Points").First(&tour).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"result": nil,
			"error":  "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"result": tour,
		"error":  nil,
	})
}

func GetNearestTour(ctx *gin.Context, db *gorm.DB) {
	var tour database.ScheduledTour

	if err := db.
		Where("start_at >= ?", time.Now()).
		Order("start_at ASC").
		First(&tour).
		Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"result": nil,
			"error":  "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"result": tour,
		"error":  nil,
	})
}

// SignUpToTour @Summary получение туров по id
// @Tags tours
// @Param input body database.Entry  true "Данные пользователя"
// @Success 200 {object} common.ResultWithErrors
// @Router /tours/signUpToTour [get]
func SignUpToTour(ctx *gin.Context, db *gorm.DB) {
	var entry database.Entry
	if err := ctx.ShouldBind(&entry); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: invalid request body",
		})
		return
	}
	if err := db.Create(&entry).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"error": nil,
	})
}

// Admin

// AddTour
// @Tags admin tours
// @Param input body database.Entry  true "Данные тура"
// @Param Authorization header string true "Токен авторизации"
// @Success 200 {object} common.ErrorOnly
// @Router /admin/tours/add [post]
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

	file, err := ctx.FormFile("image")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: no file uploaded",
		})
		return
	}
	filePath := common.RenameFile(file, tour.Name)
	if err := ctx.SaveUploadedFile(file, filePath); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
	}
	tour.Image = filePath

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

// UpdateTour
// @Tags admin tours
// @Param input body database.Entry  true "Данные пользователя"
// @Param Authorization header string true "Токен авторизации"
// @Param tourId query string true "ID тура"
// @Success 200 {object} common.ErrorOnly
// @Router /admin/tours/update [post]
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

	tourID := ctx.Query("tourId")
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

// DeleteTour
// @Tags admin tours
// @Param Authorization header string true "Токен авторизации"
// @Param tourId query string true "ID тура"
// @Success 200 {object} common.ErrorOnly
// @Router /admin/tours/delete [post]
func DeleteTour(ctx *gin.Context, db *gorm.DB) {
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

	tourId := ctx.Query("tourId")
	if tourId == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: tour ID is missing",
		})
		return
	}

	if err := db.Where("id = ?", tourId).Delete(&database.Tour{}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"error": nil,
	})
}
