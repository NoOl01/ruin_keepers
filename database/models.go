package database

import "time"

// Admin - таблица админов
type Admin struct {
	Id       uint   `gorm:"primary_key;auto_increment"`
	Login    string `gorm:"size:255;unique;not null"`
	Password string `gorm:"size:255;not null"`
}

// Tour - таблица туров
type Tour struct {
	ID             uint   `gorm:"primaryKey;autoIncrement"`
	Name           string `gorm:"type:varchar(255)"`
	Description    string `gorm:"type:text"`
	Place          string `gorm:"type:varchar(255)"`
	Price          float64
	MaxMembers     int
	Image          string          
	ScheduledTours []ScheduledTour `gorm:"foreignKey:TourID;constraint:OnDelete:CASCADE"`
	Points         []Point         `gorm:"foreignKey:TourID;constraint:OnDelete:CASCADE"`
}

// ScheduledTour - таблица расписания туров
type ScheduledTour struct {
	ID      uint `gorm:"primaryKey;autoIncrement"`
	TourID  uint `gorm:"index;constraint:OnDelete:CASCADE"`
	StartAt time.Time
	EndAt   time.Time
	Guide   string  `gorm:"type:varchar(255)"`
	Entries []Entry `gorm:"foreignKey:ScheduledTourID;constraint:OnDelete:CASCADE"`
}

// Point - таблица мест для туров
type Point struct {
	ID          uint   `gorm:"primaryKey;autoIncrement"`
	TourID      uint   `gorm:"index;constraint:OnDelete:CASCADE"`
	Number      int    // ???
	Description string `gorm:"type:text"`
	Name        string `gorm:"type:varchar(255)"`
	Image       string `gorm:"type:varchar(255)"`
}

// Entry - таблица записей на тур
type Entry struct {
	ID              uint   `gorm:"primaryKey;autoIncrement" json:"id,omitempty"`
	ScheduledTourID uint   `gorm:"index;constraint:OnDelete:CASCADE" json:"scheduled_tour_id,omitempty"`
	TelegramID      int64  `json:"telegram_id,omitempty"`
	Name            string `gorm:"type:varchar(255)" json:"name,omitempty"`
	Email           string `gorm:"type:varchar(255)" json:"email,omitempty"`
	Phone           string `gorm:"type:varchar(20)" json:"phone,omitempty"`
	IsNeedLunch     bool   `json:"is_need_lunch,omitempty"`
	IsNeedNotify    bool   `json:"is_need_notify,omitempty"`
	CountMembers    int    `json:"count_members,omitempty"`
	Comment         string `gorm:"type:text" json:"comment,omitempty"`
}
