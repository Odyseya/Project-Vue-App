import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchAllTasks,
  createTask,
  updateTask,
  deleteTaskById,
  updateTaskStatus
} from '@/api/tasksApi'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Getters

  // Computed property for completed tasks
  const completedTasks = computed(() => {
    return tasks.value.filter((task) => task.is_complete)
  })

  // Computed property for uncompleted tasks
  const uncompletedTasks = computed(() => {
    return tasks.value.filter((task) => !task.is_complete)
  })

  // Actions
  async function fetchTasks() {
    try {
      // update the state
      const fetchedTasks = await fetchAllTasks()
      console.log('Fetched tasks:', fetchedTasks)
      // Sort tasks using the sort function
      const sortedTasks = sortTasks(fetchedTasks)
      // Update the state with the sorted tasks
      tasks.value = sortedTasks
    } catch (error) {
      console.error(error)
    }
  }

  function sortTasks(tasks) {
    // Sort tasks by ID
    return tasks.sort((a, b) => a.id - b.id)
  }

  async function createNewTask(task) {
    try {
      const createdTask = await createTask(task)
      tasks.value.unshift(createdTask)
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteTask(id) {
    try {
      await deleteTaskById(id)
      // Directly update the state by filtering out the deleted task
      tasks.value = tasks.value.filter((t) => t.id !== id)
    } catch (error) {
      console.error(error)
    }
  }

  async function markTaskAsCompleteById(id) {
    try {
      const updatedTask = await updateTaskStatus(id, true)

      const taskIndex = tasks.value.findIndex((t) => t.id === id)
      if (taskIndex !== -1) {
        tasks.value[taskIndex] = updatedTask
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function markTaskAsIncompleteById(id) {
    try {
      const updatedTask = await updateTaskStatus(id, false)

      const taskIndex = tasks.value.findIndex((t) => t.id === id)
      if (taskIndex !== -1) {
        tasks.value[taskIndex] = updatedTask
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTaskTitle(taskId, newTitle) {
    try {
      // update the task remotely supabase
      const updatedTask = await updateTask(taskId, { title: newTitle })
      if (updatedTask) {
        //Find the index of the task in the local tasks array
        const taskIndex = tasks.value.findIndex((task) => task.id === taskId)
        //  Check if the task exists locally
        if (taskIndex !== -1) {
          // Update the title of the task locally with the new title
          tasks.value[taskIndex] = updatedTask
        }
      }
      return true
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    tasks,
    completedTasks,
    uncompletedTasks,
    // Getters

    // Actions
    fetchTasks,
    createNewTask,
    deleteTask,
    markTaskAsCompleteById,
    markTaskAsIncompleteById,
    updateTaskTitle
  }
})
