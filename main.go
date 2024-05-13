package main

import (
	"fmt"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /jobs", JobsHandler)

	err := http.ListenAndServe(":8080", mux)
	if err != nil {
		fmt.Println(err.Error())
	}
}

type job struct {
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

type degreee struct {
	ID     int    `json:"id"`
	Degree string `json:"degree"`
}

type spotlight struct {
	ID          int    `json:"id"`
	IMG         string `json:"img"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

func JobsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Print("JobsHandler\n")
}
