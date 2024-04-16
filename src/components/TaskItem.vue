<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// DELETE
const _deleteTask = async () => {
  await tasksStore.deleteTask(props.task.id)
  tasksStore.fetchTasks()
}

// EDIT
const editMode = ref(false)
const newTitle = ref(props.task.title)

const _editTask = async () => {
  if (editMode.value) {
    try {
      await tasksStore.updateTaskTitle(props.task.id, newTitle.value)
      editMode.value = false
    } catch (error) {
      console.error(error)
    }
  } else {
    editMode.value = true
  }
}

const toggleTaskCompletion = async () => {
  if (props.task.is_complete) {
    await tasksStore.markTaskAsCompleteById(props.task.id)
  } else {
    await tasksStore.markTaskAsIncompleteById(props.task.id)
  }
  // needed?
  await tasksStore.fetchTasks()
}
</script>

<template>
  <li class="bg-[#3490dc52]">
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
    <!-- Unique ID for each checkbox to prevent toggling the first checkbo clicking on any "completed" label-->
    <input
      type="checkbox"
      id="completionCheckbox"
      :id="`completionCheckbox-${task.id}`"
      v-model="task.is_complete"
      @change="toggleTaskCompletion"
    />
    <label :for="`completionCheckbox-${task.id}`"> Completed </label>

    <!-- EDIT & DELETE BUTTONS -->
    <button @click="_editTask" class="btn edit-btn">{{ editMode ? 'Save' : 'Edit' }}</button>
    <button @click="_deleteTask" class="btn delete-btn">Delete</button>
  </li>
</template>

<style scoped>
li {
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type='checkbox'] {
  margin-right: 10px;
}

.btn {
  margin-left: 5px;
}
</style>
