package helpers

import (
	"santrikoding/backend-api/config"
	"time"                            

	"github.com/golang-jwt/jwt/v5"
)

// Nilai secret diammbil dari environtment variable JWT_SECRET
var jwtKey = []byte(config.GetEnv("JWT_SECRET", "secret_key"))

func GenerateToken(username string) string {
	// Mengatur waktu kadaluarsa token, set 60 menit dari waktu saat ini
	expirationTime := time.Now().Add(60 * time.Minute)

	// Membuat Klaim JWT
	// Subject berisi username, dan ExpiresAt berisi waktu kadaluarsa token
	claims := &jwt.RegisteredClaims{
		Subject: username,
		ExpiresAt: jwt.NewNumericDate(expirationTime),
	}

	// Membuat token baru dengan klaim yang sudah dibuat
	// Menggunakan algoritma HS256 untuk menandatangani token
	token, _ := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(jwtKey)

	// Mengembalikan token dalam bentuk string
	return token
}