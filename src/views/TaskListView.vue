<!-- example of taskList, not applied anywhere -->

<template>
  <h3>Tasks</h3>
  <ul id="list" class="list">
    <li
      v-for="task in tasks"
      :key="task.id"
      :class="task.value === true ? 'completed' : 'incompleted'"
    >
      {{ task.title }} - {{ task.isDone ? 'Done' : 'Not Done' }}
      ><button class="delete-btn" @click="deleteTask(task.id)">x</button>
    </li>
  </ul>
</template>

<script>
import { fetchAllTasks } from '@/api/tasksApi';

export default {
 data() {
    return {
      tasks: [],
    };
 },
 async created() {
    try {
      const fetchedTasks = await fetchAllTasks();
      console.log('Fetched tasks:', fetchedTasks);
      this.tasks = fetchedTasks;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
 },
};
</script>