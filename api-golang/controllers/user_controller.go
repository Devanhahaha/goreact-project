package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/helpers"
	"santrikoding/backend-api/models"
	"santrikoding/backend-api/structs"

	"github.com/gin-gonic/gin"
)

func FindUsers(c *gin.Context) {
	// inisialisasi slice untuk menampung data user
	var users []models.User

	// ambil data user dari database
	database.DB.Find(&users)

	// kirimkan response sukses dengan data user
	c.JSON(http.StatusOK, structs.SuccessResponse {
		Success: true,
		Message: "List Data Users",
		Data: users,
	})
}

func CreateUsers(c *gin.Context) {
	// struct user request
	var req = structs.UserCreateRequest{}

	// bind JSON request ke struct UserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// buat user baru dengan data dari request
	user := models.User{
		Name: req.Name,
		Username: req.Username,
		Email: req.Email,
		Password: helpers.HashPassword(req.Password),
	}

	// simpan user ke database
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to create user",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// kirimkan response sukses dengan data user yang baru dibuat
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "User created successfully!",
		Data: structs.UserResponse{
			Id: user.Id,
			Name: user.Name,
			Username: user.Username,
			Email: user.Email,
			CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})
}

func FindUserById(c *gin.Context) {
	// aambil id user dari parameter URL
	id := c.Param("id")

	//  inisialisasi model user
	var user models.User

	// cari user berdasarkan id
	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "User not found",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// kirim response sukses dengan data user yang ditemukan
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "User Found",
		Data: structs.UserResponse{
			Id: user.Id,
			Name: user.Name,
			Username: user.Username,
			Email: user.Email,
			CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})
}

func UpdateUser(c *gin.Context) {
	// ambil id user dari parameter URL
	id := c.Param("id")

	// inisialisasi user
	var user models.User

	// cari user berdasarkan id
	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "User not found",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	var req = structs.UserUpdateRequest{}

	// bind json re ke struct user request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// update user dengan data baru
	user.Name = req.Name
	user.Username = req.Username
	user.Email = req.Email
	user.Password = helpers.HashPassword(req.Password)

	// simpan perubahan ke database
	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update user",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// kirimkan response sukses dengan data user yang telah diperbarui
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "User updated successfully!",
		Data: structs.UserResponse{
			Id: user.Id,
			Name: user.Name,
			Username: user.Username,
			Email: user.Email,
			CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})
}

func DeleteUser (c *gin.Context) {
	//ambil id user dari parameter URL
	id := c.Param("id")

	// inisialisasi user
	var user models.User

	//cari user berdasarkan id
	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "User not found",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// hapus user dari database
	if err := database.DB.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to delete users",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// kirimkan response sukses dengan data user yang telah dihapus
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "User deleted succesfully!",
	})
}