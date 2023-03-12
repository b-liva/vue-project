<script setup>
import {mockMe} from "../modules/moduleToMock";

console.log('imported inside component')
</script>

<template>
<div>
  <p>Component mounted.</p>
  <p>{{mockMe}}</p>
  <p>{{mockMe()}}</p>
</div>
</template>

<style scoped>

</style>