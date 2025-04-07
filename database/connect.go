package database

import (
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

	return db
}
