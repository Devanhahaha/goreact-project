package database

import (
	"fmt"
	"log"
	"santrikoding/backend-api/config"
	"santrikoding/backend-api/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB () {
	// load konfigurasi database dari .env
	dbUser := config.GetEnv("DB_USER", "postgres")
	dbPass := config.GetEnv("DB_PASS", "DeveloperMagang123")
	dbHost := config.GetEnv("DB_HOST", "localhost")
	dbPort := config.GetEnv("DB_PORT", "5432")
	dbName := config.GetEnv("DB_NAME", "db_golang")

	// format DSN untuk PostgreSQL
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", dbHost, dbUser, dbPass, dbName, dbPort)

	// koneksi ke database
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	fmt.Println("Database connected successfully!")

	// auto migrate models
	err = DB.AutoMigrate(&models.User{},
						&models.Product{}) // Kalo nambah tabel lagi di folder models, tambahin juga di sini nya biar ke auto migrate
	if err != nil {
		log.Fatal("Failed to migrate database: ", err)
	}

	fmt.Println("Database migrated successfully!")
}