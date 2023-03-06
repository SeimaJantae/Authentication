package api

import (
	"main/db"
	"main/interceptor"
	"main/model"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func SetAuthenAPI(router *gin.Engine) {
	authenAPI := router.Group("/api/v1")
	{
		authenAPI.POST("/login", login)
		authenAPI.POST("/register", register)
		authenAPI.GET("/profile", interceptor.JwtVerify, getProfile)
	}
}

func login(c *gin.Context) {
	var user model.User
	if c.ShouldBind(&user) == nil {
		var queryUser model.User
		if err := db.GetDB().First(&queryUser, "username = ?", user.Username).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"result": "Can not login"})
		} else if !checkHashedPassword(user.Password, queryUser.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{"result": "invalid password"})
		} else {
			token := interceptor.JwtSign(queryUser)
			c.JSON(http.StatusOK, gin.H{"result": "login sucessfully", "data": queryUser, "token": token})
		}
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"result": "Can not bind data"})
	}
}

func register(c *gin.Context) {
	var user model.User
	if c.ShouldBind(&user) == nil {
		user.Password, _ = hashPassword(user.Password)
		user.CreatedAt = time.Now()
		if err := db.GetDB().Create(&user).Error; err == nil {
			c.JSON(http.StatusOK, gin.H{"result": "register successfully", "data": user})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"result": "can not register", "error": err})

		}

	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"result": "Can not bind data"})
	}
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func checkHashedPassword(password string, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func getProfile(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"result": "get profile successfully", "username": c.GetString("jwt_username")})
}
