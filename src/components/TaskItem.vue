<script setup>
defineProps(['title'])
defineEmits(['remove'])
</script>

<template>
  <li>
    {{ title }}

    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">Completed</label>

    <button @click="$emit('remove')">Remove</button>
  </li>
</template>
