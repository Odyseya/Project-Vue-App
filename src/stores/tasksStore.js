import { supabase } from '@/api/supabase'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchAllTasks,
  createTask,
  updateTask,
  deleteTaskById,
  markTaskAsComplete,
  markTaskAsIncomplete
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
    //call to the API
    try {
      // update the state
      const fetchedTasks = await fetchAllTasks()
      console.log('Fetched tasks:', fetchedTasks)
      tasks.value = fetchedTasks
      // tasks.value = fetchAllTasks()
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

  async function deleteTask(id) {
    try {
      await deleteTaskById(id)
      // see if needed refetch tasks to update the state with the updated task
      await fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  async function markTaskAsCompleteById(id) {
    try {
      await markTaskAsComplete(id)
      // see if needed refetch tasks to update the state with the updated task
    } catch (error) {
      console.error(error)
    }
  }

  async function markTaskAsIncompleteById(id) {
    try {
      await markTaskAsIncomplete(id)
      // see if needed refetch tasks to update the state with the updated task
    } catch (error) {
      console.error(error)
    }
  }

  // async function updateExistingTaskById(id, updatedTask) {
  //   try {
  //     await updateTask(id, updatedTask)
  //     // see if needed refetch tasks to update the state with the updated task
  //     await fetchTasks()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  async function updateTaskTitle(taskId, newTitle) {
    try {
      const updatedTask = await updateTask(taskId, { title: newTitle })
      if (updatedTask) {
        // Find and update the task in the local state
        const taskIndex = tasks.value.findIndex((task) => task.id === taskId)
        if (taskIndex !== -1) {
          tasks.value[taskIndex].title = newTitle // after calling supa
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
    // updateExistingTaskById,
    deleteTask,
    markTaskAsCompleteById,
    markTaskAsIncompleteById,
    updateTaskTitle
  }
})
