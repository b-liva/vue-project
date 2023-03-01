import {defineStore} from "pinia";

export const useCustomerStore = defineStore('customerStore', {
    state: () => {
        return {
            customers: []
        }
    }
})
