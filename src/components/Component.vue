<template>
  <div>
    <p>Hi, my name is {{ user }}</p>
    <p v-for="i in [1,2]">item: {{ i }}</p>
    <label for="username">Username:</label>
    <input v-model="user" id="username" name="username" />
  </div>
</template>

<script>
  export default {
    data: () => ({
      user: 'Alice',
    }),
  }
</script>