package db

import (
	"main/model"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var database *gorm.DB

// Get database
func GetDB() *gorm.DB {
	return database
}

// Setup database
func SetupDB() {
	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema: Create user data database
	db.AutoMigrate(&model.User{})

	// Assign database
	database = db

	// // Create
	// db.Create(&Product{Code: "D42", Price: 100})

	// // Read
	// var product Product
	// db.First(&product, 1)                 // find product with integer primary key
	// db.First(&product, "code = ?", "D42") // find product with code D42

	// // Update - update product's price to 200
	// db.Model(&product).Update("Price", 200)
	// // Update - update multiple fields
	// db.Model(&product).Updates(Product{Price: 200, Code: "F42"}) // non-zero fields
	// db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})

	// // Delete - delete product
	// db.Delete(&product, 1)
}
