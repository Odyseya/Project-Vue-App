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

// reactive reference to the task
const task = ref(props.task)

// DELETE
const _deleteTask = async () => {
  await tasksStore.deleteTask(props.task.id)
  tasksStore.fetchTasks()
}

// EDIT
const editMode = ref(false)
const newTitle = ref(task.value.title)

const _editTask = async () => {
  if (editMode.value) {
    try {
      await tasksStore.updateTaskTitle(task.value.id, newTitle.value)
      task.value.title = newTitle.value
      editMode.value = false
    } catch (error) {
      console.error(error)
    }
  } else {
    editMode.value = true
  }
}

const toggleTaskCompletion = async () => {
  if (task.value.is_complete) {
    await tasksStore.markTaskAsCompleteById(task.value.id)
  } else {
    await tasksStore.markTaskAsIncompleteById(task.value.id)
  }
  // needed?
  await tasksStore.fetchTasks()
}
</script>

<template>
  <li>
    <!-- EDIT TITLE  -->
    <div v-if="!editMode">
      {{ task.title }}
    </div>
    <input
      v-else
      type="text"
      v-model="newTitle"
      class="border rounded px-2 py-1 w-full md:w-auto"
    />

    <!-- CHECKBOX TO TOGGLE TASK COMPLETION -->
    <input
      type="checkbox"
      id="completionCheckbox"
      v-model="task.is_complete"
      @change="toggleTaskCompletion"
    />
    <label for="completionCheckbox"> Completed </label>

    <!-- EDIT & DELETE BUTTONS -->
    <button @click="_editTask" class="btn edit-btn">{{ editMode ? 'Save' : 'Edit' }}</button>
    <button @click="_deleteTask" class="btn delete-btn">Delete</button>
  </li>
</template>
