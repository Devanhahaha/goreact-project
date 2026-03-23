package controllers

import (
	"net/http"
	"santrikoding/backend-api/database"
	"santrikoding/backend-api/helpers"
	"santrikoding/backend-api/models"
	"santrikoding/backend-api/structs"

	"github.com/gin-gonic/gin"
)

func FindProducts (c *gin.Context) {
	var products []models.Product

	database.DB.Find(&products)

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "List Data Product",
		Data: products, 
	})
}

func CreateProducts (c *gin.Context) {
	var req = structs.ProductCreateRequest{}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors: helpers.TranslateErrorMessage(err),
		})

		return
	}

	products := models.Product{
		Name: req.Name,
		Price: req.Price,
		Description: req.Description,
	}

	if err := database.DB.Create(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to Create Product",
			Errors: helpers.TranslateErrorMessage(err),
		})

		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Create Product Successfully!",
		Data: structs.ProductResponse{
			Id: products.Id,
			Name: products.Name,
			Price: products.Price,
			Description: products.Description,
			CreatedAt: products.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: products.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})
}

func FindProductById (c *gin.Context) {
	id := c.Param("id")

	var products models.Product

	if err := database.DB.First(&products, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Product Not Found",
			Errors: helpers.TranslateErrorMessage(err),
		})

		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Product Found",
		Data: structs.ProductResponse{
			Id: products.Id,
			Name: products.Name,
			Price: products.Price,
			Description: products.Description,
			CreatedAt: products.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: products.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})
}

func UpdateProduct (c *gin.Context) {
	
	id := c.Param("id")

	var products models.Product

	if err := database.DB.First(&products, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Product Not Found",
			Errors: helpers.TranslateErrorMessage(err),
		})

		return
	}

	var req = structs.ProductUpdateRequest{}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors: helpers.TranslateErrorMessage(err),
		})

		return
	}

	products.Name = req.Name
	products.Price = req.Price
	products.Description = req.Description

	if err := database.DB.Save(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update Product",
			Errors: helpers.TranslateErrorMessage(err),
		})

		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Update Product Successfully!",
		Data: structs.ProductResponse{
			Id: products.Id,
			Name: products.Name,
			Price: products.Price,
			Description: products.Description,
		},
	})
}

func DeleteProduct (c *gin.Context) {

	id := c.Param("id")

	var products models.Product

	if err := database.DB.First(&products, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Product Not Found",
			Errors: helpers.TranslateErrorMessage(err),
		})

		return
	}

	if err := database.DB.Delete(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to delete Product",
			Errors: helpers.TranslateErrorMessage(err),
		})

		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Product Deleted Successfully",
	})
}