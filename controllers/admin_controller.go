package controllers

import (
	"example.com/m/v2/database"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterNewAdmin() {

}

func Login(ctx *gin.Context, db *gorm.DB) {
	var admin database.Admin

}
