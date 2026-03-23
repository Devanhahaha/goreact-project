package models

import "time"

type Product struct {
	Id 			uint    	`json:"id" gorm:"primaryKey"`
	Name 		string  	`json:"name"`
	Price       int64     `json:"price"`
	Description string      `json:"description"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
}