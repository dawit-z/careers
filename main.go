package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var database map[string]any

func main() {

	// init database

	router := http.NewServeMux()
	router.HandleFunc("GET /degrees", JobsHandler)
	router.HandleFunc("GET /jobs", JobsHandler)
	router.HandleFunc("GET /spotlights", JobsHandler)

	fmt.Println("Starting server on 8080")
	err := http.ListenAndServe(":8080", router)
	if err != nil {
		fmt.Println(err.Error())
	}
}

type Job struct {
	ID                      int      `json:"id"`
	Title                   string   `json:"title"`
	Organization            string   `json:"organization"`
	Degree                  string   `json:"degree"`
	JobType                 string   `json:"jobType"`
	Location                []string `json:"location"`
	MiniminumQualifications []string `json:"minimumQualifications"`
	PreferredQualifications []string `json:"preferredQualifications"`
	Description             []string `json:"description"`
	DateAdded               string   `json:"dateAdded"`
}

type Degree struct {
	ID     int    `json:"id"`
	Degree string `json:"degree"`
}

type Spotlight struct {
	ID          int    `json:"id"`
	IMG         string `json:"img"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

func JobsHandler(w http.ResponseWriter, r *http.Request) {
	// Get the list of jobs from map
	jobsBlob, exists := database["jobs"]
	if !exists {
		http.Error(w, "Jobs not found", http.StatusNotFound)
		return
	}

	// Marshal to json
	jsonData, err := json.Marshal(jobsBlob)
	if err != nil {
		fmt.Println("Error Marshalling: ", err)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	fmt.Println(string(jsonData))
	w.Write(jsonData)
}

const (
	ErrorInternal = "internal"
)

// writeJSON marshals v to JSON and sets Content-Type header to
// "application/json".
func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	b, err := json.MarshalIndent(v, "", "    ")
	if err != nil {
		fmt.Printf("error marshaling JSON: %v", err)
		http.Error(w, `{"error":"`+ErrorInternal+`"}`, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(status)
	_, err = w.Write(b)
	if err != nil {
		// Very unlikely to happen, but log any error (not much more we can do)
		fmt.Printf("error writing JSON: %v", err)
	}
}
