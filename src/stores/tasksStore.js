import { supabase } from '@/api/supabase'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllTasks, createTask, updateTask, deleteTask, markTaskAsComplete, markTaskAsIncomplete } from '@/api/tasksApi'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Getters
  // Getter for incompleted tasks
  // const incompletedTasks = computed(() => {
  //   return tasks.value.filter((task) => !task.isComplete)
  // })

  // Actions
  async function fetchTasks() {
    //call to the API
    try {
      // update the state
      const fetchedTasks = await fetchAllTasks();
      console.log('Fetched tasks:', fetchedTasks);
      tasks.value = fetchedTasks;
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

  return {
    // State
    tasks,
    // Getters
    // incompletedTasks,
    // Actions
    fetchTasks,
    createNewTask,
    updateExistingTaskById,
    deleteTaskById,
    markTaskAsCompleteById,
    markTaskAsIncompleteById
  }
})
