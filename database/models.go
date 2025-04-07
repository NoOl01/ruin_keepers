package database

import "time"

type Tour struct {
	ID             uint   `gorm:"primaryKey;autoIncrement"`
	Name           string `gorm:"type:varchar(255)"`
	Description    string `gorm:"type:text"`
	Place          string `gorm:"type:varchar(255)"`
	Price          float64
	MaxMembers     int
	Image          string          `gorm:"type:varchar(255)"`
	ScheduledTours []ScheduledTour `gorm:"foreignKey:TourID;constraint:OnDelete:CASCADE"`
	Points         []Point         `gorm:"foreignKey:TourID;constraint:OnDelete:CASCADE"`
}

type ScheduledTour struct {
	ID      uint `gorm:"primaryKey;autoIncrement"`
	TourID  uint `gorm:"index;constraint:OnDelete:CASCADE"`
	StartAt time.Time
	EndAt   time.Time
	Guide   string  `gorm:"type:varchar(255)"`
	Entries []Entry `gorm:"foreignKey:ScheduledTourID;constraint:OnDelete:CASCADE"`
}

type Point struct {
	ID     uint `gorm:"primaryKey;autoIncrement"`
	TourID uint `gorm:"index;constraint:OnDelete:CASCADE"`
	Number int
	Name   string `gorm:"type:varchar(255)"`
	Image  string `gorm:"type:varchar(255)"`
}

type Entry struct {
	ID              uint `gorm:"primaryKey;autoIncrement"`
	ScheduledTourID uint `gorm:"index;constraint:OnDelete:CASCADE"`
	TelegramID      int64
	Name            string `gorm:"type:varchar(255)"`
	Email           string `gorm:"type:varchar(255)"`
	Phone           string `gorm:"type:varchar(20)"`
	IsNeedLunch     bool
	IsNeedNotify    bool
	CountMembers    int
	Comment         string `gorm:"type:text"`
}
