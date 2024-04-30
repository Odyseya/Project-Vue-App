<script setup>
import TaskItem from '@/components/TaskItem.vue'
import { useTasksStore } from '@/stores/tasksStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const userStore = useUserStore()
const tasksStore = useTasksStore()
const { tasks, completedTasks, uncompletedTasks } = storeToRefs(tasksStore)
const { user } = storeToRefs(userStore)

const taskTitle = ref('')

const _addTask = async (user) => {
  console.log('userID: ', user.id)

  // Validate task title length
  if (taskTitle.value.length < 4) {
    // Display a warning message to the user
    toast.warning('Task title must be at least 4 characters long.')
    // Exit the function early if validation fails
    return
  }
  const task = {
    user_id: user.id,
    title: taskTitle.value,
    is_complete: false
  }
  // await task to be added then fetch
  await tasksStore.createNewTask(task)
  taskTitle.value = '' // clean the field once task added
}

// Fetch tasks when the component is mounted
onMounted(async () => {
  console.log('Tasks state before fetchTasks:', tasks.value)
  await tasksStore.fetchTasks()
  console.log('Tasks state after fetchTasks:', tasks.value)
})

// COMPLETED/UNCOMPLETED
// Reactive reference to the current filter
const filter = ref('all')

// to choose what to display based on the filter
const displayedTasks = computed(() => {
  switch (filter.value) {
    case 'completed':
      return completedTasks.value
    case 'uncompleted':
      return uncompletedTasks.value
    default:
      return tasks.value
  }
})
</script>

<template>
  <div class="w-full sm:max-w-screen-sm mx-auto px-4 py-10">
    <!-- SHOW IF USER VERIFIED EMAIL -->
    <main v-if="user && userStore.errorMessage !== 'Email not confirmed'">
      <h1 class="text-2xl text-white">Your Tasks List</h1>
      <!-- <h2 class="text-md text-white">{{ user.email }}</h2> -->
      <!-- TASK INPUT FIELD AND BUTTON -->
      <div class="mt-2 mb-2 p-5 flex items-start bg-[#3490dc52] rounded-md shadow-lg">
        <template v-if="user">
          <div class="flex flex-col gap-y-3 w-full">
            <label for="taskTitle" class="text-lg mb-1 text-md text-white"> Task Title: </label>
            <input
              type="text"
              id="taskTitle"
              v-model="taskTitle"
              placeholder=" new task (min. 4 digits)"
              class="p-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-at-light-green border border-gray-300 rounded-md"
            />
            <button
              @click="_addTask(user)"
              class="btn self-start bg-at-light-green duration-200 hover:border-at-light-green hover:bg-white hover:text-at-light-green"
            >
              Add a task
            </button>
          </div>
        </template>
      </div>

      <!-- TASK COUNTER -->
      <template v-if="tasks && tasks.length">
        <div class="flex flex-col">
          <h2 class="text-base text-white">Total number of tasks: {{ tasks.length }}</h2>
        </div>
      </template>

      <template v-else>
        <p v-if="!user" class="text-base">Processing.....</p>
        <p v-else-if="!tasks" class="text-base">Retrieving tasks..</p>
        <p v-else class="text-base">There are no tasks</p>
      </template>

      <!-- DROPDOWN MENU TO FILTER TASKS -->
      <div class="flex flex-col mt-2 mb-1">
        <!-- <label for="filter-by">Filter by</label> -->
        <select
          id="filter-by"
          v-model="filter"
          class="text-sm p-2 text-gray-500 rounded-md focus:outline-none"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="uncompleted">Uncompleted Tasks</option>
        </select>
      </div>

      <!-- Display message if there are no tasks based on the filter -->
      <div v-if="filter === 'completed' && completedTasks.length === 0" class="text-md">
        <p class="text-md">There are no completed tasks.</p>
      </div>
      <div v-if="filter === 'uncompleted' && uncompletedTasks.length === 0" class="text-md">
        <p class="text-md">There are no uncompleted tasks.</p>
      </div>

      <!-- TASKS LIST DISPLAY VIEW -->
      <ul>
        <TaskItem
          v-for="task in displayedTasks"
          :key="task.id"
          :task="task"
          class="flex gap-x-4 gap-y-2 md:flex-row"
        ></TaskItem>
      </ul>
    </main>

    <!-- SHOW IF USER DIDNT VERIFY EMAIL -->
    <div v-else class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p class="text-at-light-green">
        {{ userStore.errorMessage || 'Next Step: Confirm your email address to access.' }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
