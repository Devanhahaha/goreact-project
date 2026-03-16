package main

import (
	"santrikoding/backend-api/config"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/routes"
)

func main() {

	// Load environment variables from .env file
	config.LoadEnv()

	// Initialize database connection
	database.InitDB()

	// setup router
	r := routes.SetupRoutes()

	// menjalankan server pada port 8080
	r.Run(":" + config.GetEnv("APP_PORT", "8080"))
}