<script setup>
import TaskItem from '@/components/TaskItem.vue'
import { useTasksStore } from '@/stores/tasksStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const { user } = storeToRefs(userStore)

const taskTitle = ref('')

const _addTask = async (user) => {
  console.log('userID: ', user.id)
  const task = {
    // FIX USER ID THING
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

onMounted(() => {
  console.log('Tasks state before fetchTasks:', tasks.value)
  tasksStore.fetchTasks()
  userStore.fetchUser()
  console.log('Tasks state after fetchTasks:', tasks.value)
})
</script>

<template>
  <main>
    <h1>Home View!</h1>

    <h2>All Tasks: {{ tasks.length }}</h2>

    <!-- <span>Incompleted tasks: {{ incompletedTasks.length }}</span> -->
    <label>
      Task title:
      <input type="text" v-model="taskTitle" placeholder="new task" />
    </label>

    <button @click="_addTask(user)">Add a task</button>
    <ul>
      <TaskItem v-for="task in tasks" :key="task.id" :task="task"></TaskItem>
      <!-- @remove="task.splice(index, 1)" -->
    </ul>
  </main>
</template>

<style scoped></style>
