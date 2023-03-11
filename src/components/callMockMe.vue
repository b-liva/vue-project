<script setup>
import {mockMe} from "../modules/moduleToMock";
</script>

<template>
<div>
  <p>Component mounted.</p>
  <p>{{mockMe()}}</p>
</div>
</template>

<style scoped>

</style>