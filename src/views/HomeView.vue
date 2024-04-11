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
    <h1>Home View! Your Tasks List</h1>

    <template v-if="user">
      <label for="taskTitle"> Task title: </label>
      <input type="text" id="taskTitle" v-model="taskTitle" placeholder="new task" />
      <button @click="_addTask(user)">Add a task</button>
    </template>

    <template v-if="tasks && tasks.length">
      <h2>All Tasks: {{ tasks.length }}</h2>
      <ul>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TaskItem v-for="task in tasks" :key="task.id" :task="task"></TaskItem>
          <!-- @remove="task.splice(index, 1)" -->
        </div>
      </ul>
    </template>

    <template v-else>
      <p v-if="!user">Loading...</p>
      <p v-else-if="!tasks">Tasks are loading..</p>
      <!-- If there are no tasks to display -->
      <p v-else>There are no tasks</p>
    </template>
  </main>
</template>

<style scoped></style>
