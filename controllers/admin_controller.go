package controllers

import (
	"example.com/m/v2/common"
	"example.com/m/v2/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

// RegisterNewAdmin
// @Tags admin
// @Param input body database.Admin true "Данные админа"
// @Success 200 {object} common.ResultWithErrors
// @Router /admin/register [post]
func RegisterNewAdmin(ctx *gin.Context, db *gorm.DB) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Error: Authorization header is empty",
		})
		return
	}
	var admin database.Admin
	if err := ctx.ShouldBind(&admin); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}
	if err := db.Create(&admin).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error: " + err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"error": nil,
	})
}

// Login
// @Tags admin
// @Param input body database.Admin true "Данные админа"
// @Success 200 {object} common.ResultWithErrors
// @Router /admin/login [post]
func Login(ctx *gin.Context, db *gorm.DB) {
	var input database.Admin
	var admin database.Admin

	err := ctx.ShouldBind(&input)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"result": nil,
			"error":  err.Error(),
		})
		return
	}

	if err := db.Where("login = ?", input.Login).First(&admin).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"result": nil,
			"error":  "Error: User not found: " + err.Error(),
		})
		return
	}

	checkPass := common.CheckPass(input, db)
	if checkPass != "Ok" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"result": nil,
			"error":  "Error: wrong password",
		})
		return
	}

	token, err := common.JwtGenerate(admin, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"result": nil,
			"error":  "Error: " + err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"result": gin.H{
			"result": token,
			"error":  nil,
		},
	})
}

// ChangePassword
// @Tags admin
// @Param input body common.ChangePassword true "Данные для смены пароля"
// @Param Authorization header string true "Токен авторизации"
// @Success 200 {object} common.ResultWithErrors
// @Router /admin/changePassword [post]
func ChangePassword(ctx *gin.Context, db *gorm.DB) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: Authorization header is required",
		})
		return
	}

	adminId, err := common.JwtDecode(authHeader)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid token",
		})
		return
	}

	var pass common.ChangePassword

	err = ctx.ShouldBind(&pass)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	hash := common.Encrypt(pass.NewPassword)

	if err := db.Model(&database.Admin{}).Where("id = ?", adminId).Update("password", hash).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"error": nil,
	})
}

// DeleteAdmin
// @Tags admin
// @Param Authorization header string true "Токен авторизации"
// @Success 200 {object} common.ResultWithErrors
// @Router /admin/delete [post]
func DeleteAdmin(ctx *gin.Context, db *gorm.DB) {
	adminId := ctx.Query("adminId")
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: Authorization header is required",
		})
		return
	}
	if adminId == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Error: adminId is required",
		})
		return
	}
	var admin database.Admin
	if err := db.Where("Id = ?", &admin).Delete(&admin).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"error": nil,
	})
}
