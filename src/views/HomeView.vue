<script setup>
import TaskItem from '@/components/TaskItem.vue'
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
  console.log('Tasks state before fetchTasks:', tasks.value);
  tasksStore.fetchTasks()
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
      <TaskItem v-for="(task, index) in tasks" :key="task.id" :title="task.title"></TaskItem>
      <!-- @remove="task.splice(index, 1)" -->
    </ul>

    <label>
      Task title:
      <input type="text" v-model="taskTitle" placeholder="new task" />
    </label>

    <button @click="_addTask">Add a task</button>
  </main>
</template>

<style scoped></style>
