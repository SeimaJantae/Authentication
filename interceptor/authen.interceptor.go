package interceptor

import (
	"fmt"
	"main/constant"
	"main/model"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func JwtSign(payload model.User) string {
	// Create jwt
	atClaims := jwt.MapClaims{}
	atClaims["id"] = payload.ID
	atClaims["username"] = payload.Username
	atClaims["level"] = payload.Level
	atClaims["exp"] = time.Now().Add(time.Minute * 10).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	fmt.Println(token)
	tokenString, _ := token.SignedString(constant.TokenSecretKey)
	//fmt.Println(tokenString)
	return tokenString
}

func JwtVerify(c *gin.Context) {
	tokenString := strings.Split(c.Request.Header["Authorization"][0], " ")[1]
	fmt.Println(tokenString)
	// Parse takes the token string and a function for looking up the key. The latter is especially
	// useful if you use multiple keys for your application.  The standard is to use 'kid' in the
	// head of the token to identify which key to use, but the parsed token (head and claims) is provided
	// to the callback, providing flexibility.
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return constant.TokenSecretKey, nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		fmt.Println(claims)
		c.Set("jwt_username", claims["username"])
		c.Next()
	} else {
		fmt.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{"result": "Can not verify"})
		c.Abort()
	}

}
