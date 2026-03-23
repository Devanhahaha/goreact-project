package structs

// Struct ini digunakan untuk menampilkan data user sebagai response
type ProductResponse struct {
	Id				uint		`json:"id"`
	Name			string		`json:"name"`
	Price			int64		`json:"price"`
	Description		string		`json:"description"`
	CreatedAt		string		`json:"created_at"`
	UpdatedAt		string		`json:"updated_at"`
	Token			*string		`json:"token,omitempty"`
}

// struct ini digunakan untuk menerima data saat proses create user
type ProductCreateRequest struct {
	Name			string		`json:"name" binding:"required" gorm:"unique;not null"`
	Price			int64		`json:"price" binding:"required" gorm:"not null"`
	Description		string		`json:"description" binding:"required" gorm:"not null"`
}

// struct ini digunakan untuk menerima data saat proses updated user
type ProductUpdateRequest struct {
	Name			string		`json:"name" binding:"required" gorm:"unique;not null"`
	Price			int64		`json:"price" binding:"required" gorm:"not null"`
	Description		string		`json:"description" binding:"required" gorm:"not null"`
}
