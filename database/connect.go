package database

import (
	"errors"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	dsn := os.Getenv("DATABASE")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	migrateError := db.AutoMigrate(&Tour{}, &ScheduledTour{}, &Point{}, &Entry{})
	if migrateError != nil {
		panic(migrateError)
	}

	CreateRoot(db)

	return db
}

func CreateRoot(db *gorm.DB) {
	var admin Admin
	result := db.Where("login = ?", "admin").First(&admin)
	if result.Error == nil {
		return
	}
	if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		panic(result.Error)
	}

	if err := db.Create(&Admin{
		Login:    "admin",
		Password: "admin",
	}).Error; err != nil {
		panic(err)
	}
}
