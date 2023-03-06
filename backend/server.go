package main

import (
	"main/api"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	api.Setup(router)
	router.Use(cors.Default())
	router.Run(":8081")
}
