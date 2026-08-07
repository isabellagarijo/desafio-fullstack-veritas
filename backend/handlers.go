package main

import (
	"encoding/json"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

var tasks = []Task{}
var nextID = 1


func saveTasks() {
	data, _ := json.MarshalIndent(tasks, "", "  ")
	os.WriteFile("tasks.json", data, 0644)
}


func loadTasks() {
	data, err := os.ReadFile("tasks.json")

	if err != nil {
		return
	}

	json.Unmarshal(data, &tasks)

	for _, task := range tasks {
		if task.ID >= nextID {
			nextID = task.ID + 1
		}
	}
}


func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}


func CreateTask(w http.ResponseWriter, r *http.Request) {

	var task Task

	err := json.NewDecoder(r.Body).Decode(&task)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if task.Title == "" {
		http.Error(w, "Título obrigatório", http.StatusBadRequest)
		return
	}

	if task.Status == "" {
		task.Status = "todo"
	}

	if task.Status != "todo" &&
		task.Status != "doing" &&
		task.Status != "done" {

		http.Error(w, "Status inválido", http.StatusBadRequest)
		return
	}

	task.ID = nextID
	nextID++

	tasks = append(tasks, task)

	saveTasks()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}


func UpdateTask(w http.ResponseWriter, r *http.Request) {

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var updated Task

	err := json.NewDecoder(r.Body).Decode(&updated)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for i := range tasks {

		if tasks[i].ID == id {

			if updated.Title == "" {
				http.Error(w, "Título obrigatório", http.StatusBadRequest)
				return
			}

			if updated.Status != "todo" &&
				updated.Status != "doing" &&
				updated.Status != "done" {

				http.Error(w, "Status inválido", http.StatusBadRequest)
				return
			}

			tasks[i] = Task{
				ID:          id,
				Title:       updated.Title,
				Description: updated.Description,
				Status:      updated.Status,
			}

			saveTasks()

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(tasks[i])
			return
		}
	}

	http.NotFound(w, r)
}


func DeleteTask(w http.ResponseWriter, r *http.Request) {

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	for i := range tasks {

		if tasks[i].ID == id {

			tasks = append(tasks[:i], tasks[i+1:]...)

			saveTasks()

			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.NotFound(w, r)
}