import {screen, fireEvent, getByText, getAllByText, render} from "@testing-library/vue";
import {useCustomerStore} from "../../helpers/store";
import customers from "../Customers.vue";
import {customersGqlQuery} from "../../helpers/mock";
import {ref} from "vue";
import router from "../../helpers/router";
import {createTestingPinia} from "@pinia/testing";

describe('customer filter', () => {
    vi.mock("@vue/apollo-composable", async () => {
        const actual = await vi.importActual("@vue/apollo-composable")
        return {
            ...actual,
            // your mocked methods
            useLazyQuery: vi.fn(() => ({
                error: ref(null),
                loading: ref(false),
                result: ref(customersGqlQuery.then(res => res)),
                load: vi.fn()
            }))
        }
    })
    const component = render(customers, {
        global: {
            plugins: [
                createTestingPinia(),
                router
            ]
        }
    })

    test('Update store customers on typing customer name', async () => {
        const customerStore = useCustomerStore();
        const customerNameInput = component.getByPlaceholderText("مشتری")
        await fireEvent.update(customerNameInput, "cu01")
        console.log('count: ', customerStore.customers.length)
        const l = await component.getAllByText("cu01")
    })
})
