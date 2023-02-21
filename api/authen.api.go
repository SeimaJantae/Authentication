package api

import "github.com/gin-gonic/gin"

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
	c.JSON(200, gin.H{"result": "register OK"})
}
