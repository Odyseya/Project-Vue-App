<!-- example of taskList, not applied anywhere -->

<template>
  <h3>Tasks</h3>
  <ul id="list" class="list">
    <li
      v-for="task in tasks"
      :key="task.id"
      :class="task.value === true ? 'completed' : 'incompleted'"
    >
      {{ task.text }} <span> {{ task.description }}</span
      ><button class="delete-btn" @click="deleteTask(task.id)">x</button>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  task: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['taskDeleted'])

const deleteTask = (id) => {
  emit('taskDeleted', id)
}
</script>
