package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/helpers"
	"santrikoding/backend-api/models"
	"santrikoding/backend-api/structs"

	"github.com/gin-gonic/gin"
)

// fungsion register untuk menangani user baru
func Register(c *gin.Context) {
	// inisialisasi struct untuk menangkap data request
	var req = structs.UserCreateRequest{}
	
	// validasi request JSON menggunakan binding dari gin
	if err := c.ShouldBindJSON(&req); err != nil {
		// jika validasi gagal, kirimkan error response
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validasi Errors",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// buat data user baru dengan password yang sudah di hash
	user := models.User{
		Name: req.Name,
		Username: req.Username,
		Email: req.Email,
		Password: helpers.HashPassword(req.Password),
	}

	// simpan data user ke database
	if err := database.DB.Create(&user).Error; err != nil {
		// cek apakah error karena data duplikated
		if helpers.IsDuplicateEntryError(err) {
			// jika duplikat, kirimkan error response 409 conflict
			c.JSON(http.StatusConflict, structs.ErrorResponse{
				Success: false,
				Message: "Duplicate entry Error",
				Errors: helpers.TranslateErrorMessage(err),
			})
		} else {
			// jika error lain kirimkan 500 internal
			c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
				Success: false,
				Message: "Failed to create user",
				Errors: helpers.TranslateErrorMessage(err),
			})
		}
		return
	}

	// jika berhasil kirimkan response sukses
	c.JSON(http.StatusCreated, structs.SuccessResponse{
		Success: true,
		Message: "User created Succesfully!",
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