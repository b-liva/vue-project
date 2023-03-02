<script setup>
import {filterCustomer} from "../graphql/query/customer.graphql"
import {useQuery} from "@vue/apollo-composable";
import {onUpdated, ref, computed, onMounted} from "vue";
const {result: customers, loading, error, onResult} = useQuery(filterCustomer, {
  customerName: "cu01"
});
const cus = computed(() => customers.data?.filterCustomer.edges ?? [])
</script>
<template>
    <div>
      <input placeholder="مشتری">
      <p>cus: {{cus}}</p>
      <p v-for="cu in cus">{{cu.node.name}}</p>
    </div>
</template>