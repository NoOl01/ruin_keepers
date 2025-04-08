package router

import (
	"example.com/m/v2/controllers"
	_ "example.com/m/v2/docs"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
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
			tour.GET("/scheduledTours", func(ctx *gin.Context) {
				controllers.GetScheduledTours(ctx, db)
			})
			tour.GET("/scheduledTourById", func(ctx *gin.Context) {
				controllers.GetScheduleTourById(ctx, db)
			})
			tour.GET("/nearestTour", func(ctx *gin.Context) {
				controllers.GetNearestTour(ctx, db)
			})
			tour.POST("/signUpToTour", func(ctx *gin.Context) {
				controllers.SignUpToTour(ctx, db)
			})
		}
		admin := api.Group("/admin")
		{
			adminTour := admin.Group("/tours")
			{
				adminTour.POST("/add", func(ctx *gin.Context) {
					controllers.AddTour(ctx, db)
				})
				adminTour.POST("/update", func(ctx *gin.Context) {
					controllers.UpdateTour(ctx, db)
				})
				adminTour.POST("/delete", func(ctx *gin.Context) {
					controllers.DeleteTour(ctx, db)
				})
			}
			adminPoints := admin.Group("/points")
			{
				adminPoints.POST("/add", func(ctx *gin.Context) {

				})
				adminPoints.POST("/update", func(ctx *gin.Context) {

				})
				adminPoints.POST("/delete", func(ctx *gin.Context) {

				})
			}
			admin.POST("/register", func(ctx *gin.Context) {
				controllers.RegisterNewAdmin(ctx, db)
			})
			admin.POST("/login", func(ctx *gin.Context) {
				controllers.Login(ctx, db)
			})
			admin.POST("/changePassword", func(ctx *gin.Context) {
				controllers.ChangePassword(ctx, db)
			})
			admin.POST("/delete", func(ctx *gin.Context) {
				controllers.DeleteAdmin(ctx, db)
			})
		}
		api.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
}
