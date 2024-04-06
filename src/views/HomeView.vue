<script setup>
import TaskItem from '@/components/TaskItem.vue'
import { useTasksStore } from '@/stores/tasksStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const userStore = useUserStore(); 
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const { user } = storeToRefs(userStore)
const taskTitle = ref('')

const _addTask = async (user) => {
  console.log("userID: ", user.id)
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
  console.log('Tasks state before fetchTasks:', tasks.value);
  tasksStore.fetchTasks()
  userStore.fetchUser()
  console.log('Tasks state after fetchTasks:', tasks.value);
})
</script>

<template>
  <main>
    <h1>Home View!</h1>

    <span>All Tasks: {{ tasks.length }}</span>
    <!-- <span>Incompleted tasks: {{ incompletedTasks.length }}</span> -->
    <!-- <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
    </ul>  -->

    <ul>
      <TaskItem v-for="(task) in tasks" :key="task.id" :title="task.title"></TaskItem>
      <!-- @remove="task.splice(index, 1)" -->
    </ul>

    <label>
      Task title:
      <input type="text" v-model="taskTitle" placeholder="new task" />
    </label>

    <button @click="_addTask(user)">Add a task</button>
  </main>
</template>

<style scoped></style>
