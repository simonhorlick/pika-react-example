package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	log.Printf("Listening on https://localhost:8443")
	log.Fatal(
		http.ListenAndServeTLS(":8443", "cert.pem", "key.pem", createMux()))
}

func createMux() http.Handler {
	r := mux.NewRouter()

	// Serve typescript sources in dev mode.
	r.PathPrefix("/sources/src/").Handler(
		http.StripPrefix("/sources/src/", http.FileServer(http.Dir("./src/"))))

	// Serve compiled javascript.
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./")))

	return r
}
