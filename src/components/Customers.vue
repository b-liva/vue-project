<script setup>
import {filterCustomer} from "../graphql/query/customer.graphql"
import {useQuery} from "@vue/apollo-composable";
import {onUpdated, ref, computed, onMounted} from "vue";
const {result: customers, loading, error, onResult} = useQuery(filterCustomer, {
  customerName: "cu01"
});
const cus = computed(() => {
  console.log('cu on computed: ', customers.data?.filterCustomer.edges ?? [])
  return customers.data?.filterCustomer.edges ?? []
})
onUpdated(() => {
  console.log('cu on updated: ', customers)
})
onMounted(() => {
  console.log('cu on mounted: ', customers)
})

</script>
<template>
    <div>
      <input placeholder="مشتری">
      <p>cus: {{cus}}</p>
      <p v-for="cu in cus">{{cu.node.name}}</p>
<!--      <p>cu01</p>-->
<!--      <p v-for="cu in cus" >{{cu}}</p>-->
    </div>
</template>