import {screen, fireEvent, getByText, getAllByText, render} from "@testing-library/vue";
import {useCustomerStore} from "../../helpers/store";
import customers from "../Customers.vue";
import CustomersUseLazyQuery from "../CustomersUseLazyQuery.vue"
import {customersGqlQuery} from "../../helpers/mock";
import {ref} from "vue";
import router from "../../helpers/router";
import {createTestingPinia} from "@pinia/testing";
import {apolloClient} from "../../helpers/config";
import {useQuery, useLazyQuery} from "@vue/apollo-composable";

let cus;
beforeEach(async () => {
    customersGqlQuery.then(res => {
        cus = res;
    })
    vi.clearAllMocks()
})
describe('customer filter', async () => {
    vi.mock("@vue/apollo-composable", async () => {
        const actual = await vi.importActual("@vue/apollo-composable")
        return {
            ...actual,
            // your mocked methods
            useQuery: vi.fn(),
            useLazyQuery: vi.fn()
        }
    })
    test('Update store customers on typing customer name useQuery', async () => {
        useQuery.mockImplementation(() => ({
            error: ref(null),
            loading: ref(false),
            result: cus
        }))
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
        const l = await component.getAllByText("cu01")
    })

    test('Update store customers on typing customer name useLazyQuery', async () => {
        useLazyQuery.mockImplementation(() => ({
            result: cus,
            load: vi.fn()
        }))
        const component = render(CustomersUseLazyQuery, {
            global: {
                provide:[apolloClient],
                plugins: [
                    createTestingPinia(),
                    router
                ]
            }
        })
        expect(useLazyQuery).toHaveBeenCalledTimes(1)
        const customerStore = useCustomerStore();
        const customerNameInput = component.getByPlaceholderText("مشتری")
        await fireEvent.update(customerNameInput, "cu01")
        const l = await component.getAllByText("cu01")
        expect(l.length).toBe(3)
    })

    test('Update store customers on typing customer name useLazyQuery, loading true', async () => {
        useLazyQuery.mockImplementation(() => ({
            loading: true,
            result: cus,
            load: vi.fn()
        }))
        const component = render(CustomersUseLazyQuery, {
            global: {
                provide:[apolloClient],
                plugins: [
                    createTestingPinia(),
                    router
                ]
            }
        })
        expect(useLazyQuery).toHaveBeenCalledTimes(1)
        const customerStore = useCustomerStore();
        const customerNameInput = component.getByPlaceholderText("مشتری")
        await fireEvent.update(customerNameInput, "cu01")
        component.getByText("Is loading")
    })
})