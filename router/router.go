package router

import (
	"example.com/m/v2/controllers"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Router(router *gin.Engine, db *gorm.DB) {
	api := router.Group("api/v1")
	{
		tour := api.Group("/tours")
		{
			tour.GET("/all", func(ctx *gin.Context) {
				controllers.GetAllTours(ctx, db)
			})
			tour.GET("/tourById", func(ctx *gin.Context) {
				controllers.GetTourById(ctx, db)
			})
			tour.POST("/add", func(ctx *gin.Context) {
				controllers.AddTour(ctx, db)
			})
			tour.POST("/update", func(ctx *gin.Context) {
				controllers.UpdateTour(ctx, db)
			})
		}
		admin := api.Group("/admin")
		{
			admin.POST("/register", func(ctx *gin.Context) {

			})
			admin.POST("/login", func(ctx *gin.Context) {

			})
			admin.POST("/changePassword", func(ctx *gin.Context) {

			})
		}
	}
}
