package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/helpers"
	"santrikoding/backend-api/models"
	"santrikoding/backend-api/structs"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Login (c *gin.Context) {
	// inisialisasi struct untuk menampung data dari request
	var req = structs.UserLoginRequest{}
	var user = models.User{}

	// validasi input dari request body menggunakan shouldBindJSON
	if err := c.ShouldBindJSON(&req);err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// cari user berdasarkan username yang diberikan di database
	// jika tidak ditemukan, kirimkan respons error unauthorized
	if err := database.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, structs.ErrorResponse{
			Success: false,
			Message: "User Not Found",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// bandingkan password yang diberikan dengan password yang disimpan di database menggunakan bcrypt
	// jika tidak cocok, kirimkan respons error unauthorized
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, structs.ErrorResponse{
			Success: false,
			Message: "Invalid Password",
			Errors: helpers.TranslateErrorMessage(err),
		})
		return
	}

	// jika login berhasil, generate token untuk user
	token := helpers.GenerateToken(user.Username)

	// kirimkan respons sukses dengan token yang dihasilkan
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Login Success",
		Data: structs.UserResponse{
			Id: user.Id,
			Name: user.Name,
			Username: user.Username,
			Email: user.Email,
			CreatedAt: user.CreatedAt.String(),
			UpdatedAt: user.UpdatedAt.String(),
			Token: &token,
		},
	})
}