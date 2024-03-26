<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
// const { tasks } = storeToRefs(tasksStore)
const taskTitle = ref('')

const _addTask = async () => {
  const task = {
    // FIX USER ID THING
    user_id: '63af1ce3-5b03-4793-a97e-0bd27b548300',
    title: taskTitle.value,
    // isComplete: false
    is_complete: false
  }

  // awaits task to be added then does fetch
  await tasksStore.createNewTask(task)
  tasksStore.fetchTasks()
  // clean the field once task added
  taskTitle.value = ''
}

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>

<template>
  <main>
    <h1>Home View!</h1>

    <span>Tasks: {{ tasks.length }}</span>
    <!-- <span>Incompleted tasks: {{ incompletedTasks.length }}</span> -->
    <ul>
      <li v-for="task in tasks" :key="task.id">Title: {{ task.title }}</li>
    </ul>

    <label>
      Task title:
      <input type="text" v-model="taskTitle" />
    </label>

    <button @click="_addTask">Add a task</button>
  </main>
</template>

<style scoped></style>
