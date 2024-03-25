<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const tasksStore = useTasksStore()
const { tasks, incompletedTasks } = storeToRefs(tasksStore)

const taskTitle = ref('')

const _addTask = async () => {
  const task = {
    // FIX USER ID THING
    user_id: 'd5622b20-cb6a-4e98-8287-9ad212ccc77c',
    title: taskTitle.value,
    isComplete: false
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

    <!-- cos nie dziala na dole  -->
    <!-- <span>Tasks: {{ tasks.length }}</span>
    <span>Incompleted tasks: {{ incompletedTasks.length }}</span>
    <ul>
      <li v-for="task in tasks" :key="task.id"></li>
      {{
        tasks.title
      }}
    </ul>

    <label>
      Task title:
      <input type="text" v-model="taskTitle" />
    </label>

    <button @click="_addTask">Add a task</button> -->
  </main>
</template>

<style scoped></style>
