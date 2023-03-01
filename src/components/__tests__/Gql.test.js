import {screen, fireEvent, getByText, getAllByText, render} from "@testing-library/vue";
import {useCustomerStore} from "../../helpers/store";
import customers from "../Customers.vue";
import {customersGqlQuery} from "../../helpers/mock";
import {ref} from "vue";
import router from "../../helpers/router";
import {createTestingPinia} from "@pinia/testing";
import {apolloClient} from "../../helpers/config";
import {useQuery} from "@vue/apollo-composable";
// import {useQuery} from "@vue/apollo-composable/dist/index.esm";

async function getMockCustomersList(){
    let v = ref({});
    customersGqlQuery.then(res => {
        v.value = res
        return v
    })
}

let cus;
beforeEach(async () => {
    customersGqlQuery.then(res => {
        cus = res;
    })
})
describe('customer filter', async () => {
    test('Update store customers on typing customer name', async () => {
        console.log("Main cus: ", cus)
        vi.mock("@vue/apollo-composable", async () => {
            const actual = await vi.importActual("@vue/apollo-composable")
            return {
                ...actual,
                // your mocked methods
                useQuery: vi.fn(() => ({
                    error: ref(null),
                    loading: ref(false),
                    result: cus
                }))
            }
        })
        const component = render(customers, {
            global: {
                provide:[apolloClient],
                plugins: [
                    createTestingPinia(),
                    router
                ]
            }
        })
        expect(useQuery).toHaveBeenCalledTimes(1)
        const customerStore = useCustomerStore();
        const customerNameInput = component.getByPlaceholderText("مشتری")
        await fireEvent.update(customerNameInput, "cu01")
        console.log('count: ', customerStore.customers.length)
        const l = await component.getAllByText("cu01")
    })
    // test('simple test', () => {
    //     console.log('cu simple: ', cus);
    //     expect(1).toBe(1)
    // })
})