package api

import (
	"main/db"
	"main/model"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"
)

func SetAuthenAPI(router *gin.Engine) {
	authenAPI := router.Group("/api/v1")
	{
		authenAPI.POST("/login", login)
		authenAPI.POST("/register", register)
	}
}

func login(c *gin.Context) {
	c.JSON(200, gin.H{"result": "login OK"})
}

func register(c *gin.Context) {
	var user model.User
	if c.ShouldBind(&user) == nil {
		user.Password, _ = hasPassword(user.Password)
		user.CreatedAt = time.Now()
		if err := db.GetDB().Create(&user).Error; err == nil {

			c.JSON(200, gin.H{"result": "register OK", "data": user})
		} else {
			c.JSON(200, gin.H{"result": "register Not OK", "error": err})

		}

	} else {
		c.JSON(401, gin.H{"result": "Can not bind data"})
	}
}

func hasPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}
