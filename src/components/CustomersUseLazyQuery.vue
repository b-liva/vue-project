<script setup>
import {filterCustomer} from "../graphql/query/customer.graphql"
import {useLazyQuery} from "@vue/apollo-composable";
import {onUpdated, ref, computed, onMounted, watch} from "vue";
const {result: customers, loading, error, load} = useLazyQuery(filterCustomer);
let customerName = ref('');
const cus = computed(() => customers.data?.filterCustomer.edges ?? [])
watch(
    () => [customerName.value],
    () => {
      load(filterCustomer, {
        customerName: "cu01"
      })
    }
)
</script>
<template>
    <div>
      <input placeholder="مشتری" v-model="customerName">
      <p>cus: {{cus}}</p>
      <p style="color: aqua" v-if="loading">Is loading</p>
      <p v-else>Not loading</p>
      <p v-for="cu in cus">{{cu.node.name}}</p>
    </div>
</template>