vi.resetModules()
// import callMockMeComponent from "../components/CallMockMe.vue"
import {render} from "@testing-library/vue";
// import {callMockMe} from "../modules/callModuleFunction";
import {mockMe} from "../modules/moduleToMock";

describe("Test doMock in Component", () => {
    beforeEach(() => {
        // vi.unmock("../modules/moduleToMock")
        // vi.doUnmock("../modules/moduleToMock")
        vi.doMock("../modules/moduleToMock", async () => ({
            mockMe: vi.fn(() => {
                return 'doMock definition'
            })
        }));
        vi.resetModules();
    })
    test('doMock with in module call', async () => {
        const {callMockMe} = await import("../modules/callModuleFunction")
        const {mockMe} = await import("../modules/moduleToMock");
        console.log('imported in test:', mockMe)
        const value = callMockMe();
        expect(mockMe).toBeCalledTimes(1)
    })
    test('doMock with in component call', async () => {
        const {mockMe} = await import("../modules/moduleToMock")
        console.log('imported inside test')
        console.log(mockMe)
        const component = render(callMockMeComponent)
        component.debug();
        component.getByText('Component mounted.')
        expect(mockMe).toBeCalledTimes(1)
    })
    test.only('doMock with in component call and implementation', async () => {
        const {mockMe} = await import("../modules/moduleToMock")
        mockMe.mockImplementation(() => {
            return 'This is doMocked with in component call and implementation';
        })
        const component = render(callMockMeComponent)
        component.getByText('Component mounted.')
        expect(mockMe).toBeCalledTimes(1)
        component.getByText('This is doMocked with in component call and implementation')
    })
})