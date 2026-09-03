package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"
)

type TokenClaims struct {
	UserID    string `json:"sub"`
	Role      string `json:"role"`
	IssuedAt  int64  `json:"iat"`
	ExpiresAt int64  `json:"exp"`
	Plan      string `json:"plan"`
	Features  []string `json:"features"`
}

type AuthServer struct {
	secretKey []byte
}

func NewAuthServer(secret string) *AuthServer {
	return &AuthServer{
		secretKey: []byte(secret),
	}
}

func (a *AuthServer) GenerateToken(userID, role string) (string, error) {
	header := base64.RawURLEncoding.EncodeToString([]byte(`{"alg":"HS256","typ":"JWT"}`))
	claims := TokenClaims{
		UserID:    userID,
		Role:      role,
		IssuedAt:  time.Now().Unix(),
		ExpiresAt: time.Now().Add(365 * 24 * time.Hour).Unix(), // 1 year expiry
		Plan:      "ULTRA_PRO",
		Features: []string{
			"VOICE_STREAMING",
			"NEURAL_TTS",
			"WHISPER_STT",
			"GEMINI_LIVE",
			"SCREEN_CONTROL",
			"WHATSAPP_AUTOMATION",
			"PHONE_CONTROL",
			"DEEP_RESEARCH",
			"MEMORY_SYSTEM",
			"BIOMETRIC_AUTH",
			"ALL_FEATURES_UNLOCKED",
		},
	}
	claimsBytes, _ := json.Marshal(claims)
	payload := base64.RawURLEncoding.EncodeToString(claimsBytes)

	unsignedToken := fmt.Sprintf("%s.%s", header, payload)
	h := hmac.New(sha256.New, a.secretKey)
	h.Write([]byte(unsignedToken))
	sig := base64.RawURLEncoding.EncodeToString(h.Sum(nil))

	return fmt.Sprintf("%s.%s", unsignedToken, sig), nil
}

func main() {
	server := NewAuthServer("IRIS_FREE_LOCAL_KEY_2026")

	http.HandleFunc("/api/v1/auth/token", func(w http.ResponseWriter, r *http.Request) {
		userID := r.URL.Query().Get("user_id")
		if userID == "" {
			userID = "free_user_local"
		}
		
		token, _ := server.GenerateToken(userID, "ULTRA_PRO")
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, `{"access_token":"%s","token_type":"Bearer","expires_in":31536000,"plan":"ULTRA_PRO","status":"ACTIVE","message":"All features unlocked - Enjoy IRIS-X!"}`, token)
	})

	// Health check endpoint
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"healthy","version":"2.0.0-free","plan":"ULTRA_PRO"}`)
	})

	// Verify token endpoint (always returns valid)
	http.HandleFunc("/api/v1/auth/verify", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintf(w, `{"valid":true,"plan":"ULTRA_PRO","features":["ALL_UNLOCKED"]}`)
	})

	port := ":9093"
	log.Printf("⚡ IRIS-X FREE Auth Server listening on %s...", port)
	log.Printf("🔓 ALL FEATURES UNLOCKED - No payment required!")
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
