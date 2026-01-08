package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Task struct {
	ID          int    `json:"id"`
	Description string `json:"description"`
}

var tasks []Task

func main() {
	http.HandleFunc("/", handleRoot)
	// http.HandleFunc("/Tasks", handleTasks)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Welcome to GoLang Todo Api"))
}

func handleTasks(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		listTasks(w, r)
	case http.MethodPost:
		createTask(w, r)
	case http.MethodPut:
		//updateTask
	case http.MethodDelete:
		//deleteTask()

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("Método não permitido"))
	}
}

func listTasks(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
	var task Task
	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	task.ID = len(tasks) + 1
	tasks = append(tasks, task)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(task)
}
