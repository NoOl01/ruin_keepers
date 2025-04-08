package database

import (
	"errors"
	"fmt"
	"golang.org/x/crypto/bcrypt"
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

	migrateError := db.AutoMigrate(&Tour{}, &ScheduledTour{}, &Point{}, &Entry{}, &Admin{})
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

	hash, err := bcrypt.GenerateFromPassword([]byte("admin"), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(err)
	}

	if err := db.Create(&Admin{
		Login:    "admin",
		Password: string(hash),
	}).Error; err != nil {
		panic(err)
	}
}
