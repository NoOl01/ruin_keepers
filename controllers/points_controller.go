package controllers

import (
	"net/http"
	"strings"
	"fmt"

	"example.com/m/v2/common"
	"example.com/m/v2/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AddPoint(ctx *gin.Context, db *gorm.DB) {
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

	var point database.Point

	if err := ctx.BindJSON(&point); err != nil {
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
	filePath := common.RenameFile(file, point.Name)
	if err := ctx.SaveUploadedFile(file, filePath); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
	}
	point.Image = filePath

	if err := db.Create(&point).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"error": nil,
	})
}

func UploadPointImage(ctx *gin.Context, db *gorm.DB) {
	pointId := ctx.DefaultQuery("pointId", "")
	if pointId == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: Point id is missing",
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

	filename := fmt.Sprintf("point_%s_%s", pointId, file.Filename)
	filePath := fmt.Sprintf("./uploads/points/%s", filename)

	if err := ctx.SaveUploadedFile(file, filePath); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: failed to save image",
		})
		return
	}

	var point database.Point
	if err := db.First(&point, pointId).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"error": "Error: Point not found",
		})
		return
	}

	point.Image = "/uploads/points/" + filename
	if err := db.Save(&point).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: failed to update point with image path",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message":   "Image uploaded successfully",
		"image_url": point.Image,
	})
}