import { supabase } from '@/api/supabase'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllTasks, createTask, updateTask, deleteTask } from '@/api/tasksApi'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Getters

  // Actions
  async function fetchTasks() {
    //call to the API
    try {
      // update the state
      tasks.value = fetchAllTasks()
    } catch (error) {
      console.error(error)
    }
  }

  async function createNewTask(task) {
    try {
      //call API
      await createTask(task)
    } catch (error) {
      console.error(error)
    }
  }

  async function updateExistingTaskById(id, updatedTask) {
    try {
      await updateTask(id, updatedTask)
      // see if needed refetch tasks to update the state with the updated task
      await fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }
  async function deleteTaskById(id) {
    try {
      await deleteTask(id)
      // see if needed refetch tasks to update the state with the updated task
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    tasks,
    // Getters
    // Actions
    fetchTasks,
    createNewTask,
    updateExistingTaskById,
    deleteTaskById
  }
})
