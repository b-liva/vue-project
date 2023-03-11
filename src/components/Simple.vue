<script setup>
import {ref} from "vue"
let show = ref(false)
</script>
<template>
    <div>
        <p>Both</p>
        <p v-show="show">Show</p>
        <p v-show="!show">Hide</p>
    </div>
</template>