package routes

import (
	"santrikoding/backend-api/controllers"
	"santrikoding/backend-api/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {

	// initialize gin
	router := gin.Default()

	// konfigurasi CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
	}))

	// router awal ketika server baru start
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	//router register
	router.POST("/api/register", controllers.Register)

	// router login
	router.POST("/api/login", controllers.Login)

	// route user
	router.GET("/api/users", middlewares.AuthMiddleware(), controllers.FindUsers)

	// route create user
	router.POST("/api/users", middlewares.AuthMiddleware(), controllers.CreateUsers)

	// route user by id
	router.GET("/api/users/:id", middlewares.AuthMiddleware(), controllers.FindUserById)

	//router update user
	router.PUT("/api/users/:id", middlewares.AuthMiddleware(), controllers.UpdateUser)

	// router delete user
	router.DELETE("/api/users/:id", middlewares.AuthMiddleware(), controllers.DeleteUser)

	// router get product
	router.GET("/api/products", middlewares.AuthMiddleware(), controllers.FindProducts)

	// router get product by id
	router.GET("/api/products/:id", middlewares.AuthMiddleware(), controllers.FindProductById)

	// router create product
	router.POST("/api/products", middlewares.AuthMiddleware(), controllers.CreateProducts)

	// router update product
	router.PUT("/api/products/:id", middlewares.AuthMiddleware(), controllers.UpdateProduct)

	// router delete product
	router.DELETE("/api/products/:id", middlewares.AuthMiddleware(), controllers.DeleteProduct)

	return router
}