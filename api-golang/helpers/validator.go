package helpers

import (
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

// TranslateErrorMessage menangani validasi dari validator.v10 dan entri dari gorm
func TranslateErrorMessage(err error) map[string]string {
	// Membuat map untuk menampung pesan error
	errorsMap := make(map[string]string)

	// Handle validasi dari validator.v10
	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		for _, fieldError := range validationErrors {
			// Menyimpan nama field yang gagal validasi
			field := fieldError.Field()
			switch fieldError.Tag() {
			case "required":
				errorsMap[field] = fmt.Sprintf("%s is required", field) // Pesan error jika field kosong
			case "email":
				errorsMap[field] = "Invalid email format" // Pesan error jika format email tidak valid
			case "unique":
				errorsMap[field] = fmt.Sprintf("%s already exists", field) // Pesan error jika data sudah ada
			case "min":
				errorsMap[field] = fmt.Sprintf("%s must be at least %s characters", field, fieldError.Param()) // Pesan error jika nilai terlalu pendek
			case "max":
				errorsMap[field] = fmt.Sprintf("%s must be at most %s characters", field, fieldError.Param()) // Pesan error jika nilai terlalu panjang
			case "numeric":
				errorsMap[field] = fmt.Sprintf("%s must be a number", field) // Pesan error jika nilai bukan angka
			default:
				errorsMap[field] = "Invalid value" // Pesan error default untuk kesalahan validasi lainnya
			}
		}
	}

	// Handle error dari gorm untuk dulicate entry
	if err != nil {
		// cek jika error mengandung "Dulicate entry" duplikasi data di database
		if strings.Contains(err.Error(), "username") {
			errorsMap["username"] = "Username already exists" // Pesan error jika username sudah ada
		}
		if strings.Contains(err.Error(), "name") {
			errorsMap["name"] = "Product Name already exists" // Pesan error jika nama product sudah ada
		}
		if strings.Contains(err.Error(), "email") {
			errorsMap["email"] = "Email already exists" // Pesan error jika email sudah ada
		}
	} else if err == gorm.ErrRecordNotFound {
		// Jika data yang dicari tidak ditemukan di database
		errorsMap["Error"] = "Record not found" // Pesan error jika data tidak ditemukan
	}

	return errorsMap
}

// IsDuplicateEntryError memeriksa apakah error yang terjadi adalah error duplikasi entri di database
func IsDuplicateEntryError(err error) bool {
	// Cek apakah error merupakan duplikasi entri
	return err != nil && strings.Contains(err.Error(), "Duplicate Entry")
}
