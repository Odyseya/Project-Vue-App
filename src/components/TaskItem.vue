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

// UPDATE
const toggleTaskCompletion = async () => {
  if (props.task.is_complete) {
    await tasksStore.markTaskAsCompleteById(props.task.id)
  } else {
    await tasksStore.markTaskAsIncompleteById(props.task.id)
  }
  await tasksStore.fetchTasks()
}
</script>

<template>
  <div class="flex">
    <li class="items-start w-full bg-[#3490dc52] rounded-lg shadow-md p-4 mt-2">
      <!-- EDIT TITLE  -->
      <div v-if="!editMode" class="text-lg font-semibold text-white">
        {{ task.title }}
      </div>

      <input
        v-else
        type="text"
        v-model="newTitle"
        class="text-gray-500 border rounded px-2 py-1 w-full lg:w-full xl:w-full mr-4"
      />

      <!-- CHECKBOX TO TOGGLE TASK COMPLETION -->
      <!-- Unique ID for each checkbox to prevent toggling the first checkbox clicking on any "completed" label-->
      <div>
        <input
          type="checkbox"
          class="mr-1"
          id="completionCheckbox"
          :id="`completionCheckbox-${task.id}`"
          v-model="task.is_complete"
          @change="toggleTaskCompletion"
        />
        <label class="text-sm" :for="`completionCheckbox-${task.id}`"> Completed </label>

        <!-- EDIT & DELETE BUTTONS -->
        <div>
          <button @click="_editTask" class="btn edit-btn">{{ editMode ? 'Save' : 'Edit' }}</button>
          <button @click="_deleteTask" class="btn delete-btn">Delete</button>
        </div>
      </div>
    </li>
  </div>
</template>

<style scoped></style>
