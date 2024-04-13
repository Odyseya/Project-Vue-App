<script setup>
import TaskItem from '@/components/TaskItem.vue'
import { useTasksStore } from '@/stores/tasksStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed } from 'vue'

const userStore = useUserStore()
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const { user } = storeToRefs(userStore)

const taskTitle = ref('')

const _addTask = async (user) => {
  console.log('userID: ', user.id)
  const task = {
    user_id: user.id,
    title: taskTitle.value,
    is_complete: false
  }

  // awaits task to be added then does fetch
  await tasksStore.createNewTask(task)
  tasksStore.fetchTasks()
  // clean the field once task added
  taskTitle.value = ''
}

// Fetch tasks when the component is mounted
onMounted(async () => {
  console.log('Tasks state before fetchTasks:', tasks.value)
  await tasksStore.fetchTasks()
  await userStore.fetchUser()
  console.log('Tasks state after fetchTasks:', tasks.value)
})

// COMPLETED/UNCOMPLETED
// Reactive reference to the current filter
const filter = ref('all')

// Function to filter tasks based on the selected filter
const filterTasks = () => {
  switch (filter.value) {
    case 'completed':
      return tasksStore.completedTasks
    case 'uncompleted':
      return tasksStore.uncompletedTasks
    default:
      return tasksStore.tasks
  }
}
// to choose what to display based on the filter
const displayedTasks = computed(filterTasks)
</script>

<template>
  <main>
    <h1>Home View! Your Tasks List</h1>

    <!-- ADD TASK FIELD AND BUTTON -->
    <template v-if="user">
      <label for="taskTitle"> Task title: </label>
      <input type="text" id="taskTitle" v-model="taskTitle" placeholder="new task" />
      <button @click="_addTask(user)" class="btn">Add a task</button>
    </template>

    <!-- TASK COUNTER -->
    <template v-if="tasks && tasks.length">
      <h2>Total number of tasks: {{ tasks.length }}</h2>
    </template>

    <template v-else>
      <p v-if="!user">Processing...</p>
      <p v-else-if="!tasks">Retrieving tasks..</p>
      <p v-else>There are no tasks</p>
    </template>

    <!-- Dropdown for task filtering -->
    <select v-model="filter" @change="filterTasks">
      <option value="all">All Tasks:</option>
      <option value="completed">Completed Tasks</option>
      <option value="uncompleted">Uncompleted Tasks</option>
    </select>

    <!-- TASKS LIST DISPLAY VIEW -->
    <ul>
      <TaskItem v-for="task in displayedTasks" :key="task.id" :task="task"></TaskItem>
    </ul>
  </main>
</template>

<style scoped></style>
