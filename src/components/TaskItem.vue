<script setup>
import { defineProps, ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// Initialize a reactive reference to the task
const task = ref(props.task)

const _deleteTask = async () => {
  await tasksStore.deleteTask(props.task.id)
  tasksStore.fetchTasks()
}
</script>

<template>
  <li>
    {{ task.title }}

    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">Completed</label>

    <button @click="_editTask" class="btn edit-btn">Edit</button>
    <button @click="_deleteTask" class="btn delete-btn">Delete</button>
  </li>
</template>
