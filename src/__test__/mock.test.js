import { beforeEach, describe, expect, test, vi } from "vitest";
import { mockMe } from "../modules/moduleToMock";
import {callMockMe} from "../modules/callModuleFunction";
import callMockMeComponent from "../components/CallMockMe.vue"
import {render} from "@testing-library/vue";

describe("test mock module", async () => {
    beforeEach(async () => {
        vi.mock("../modules/moduleToMock");
        vi.clearAllMocks()
    })
    test('mock with in test call', () => {
        mockMe()
        expect(mockMe).toBeCalledTimes(1)
    })
    test('mock with in test call and implementation', () => {
        mockMe.mockImplementation(() => {
            return 'This is mocked in test and implementation version';
        })
        const value = mockMe()
        expect(mockMe).toBeCalledTimes(1)
        expect(value).toBe('This is mocked in test and implementation version')
    })
    test('mock with in module call', () => {
        callMockMe()
        expect(mockMe).toBeCalledTimes(1)
    })
    test('mock with in module call and implementation', () => {
        mockMe.mockImplementation(() => {
            return 'This is mocked in module and implementation version';
        })
        const value = callMockMe()
        expect(mockMe).toBeCalledTimes(1)
        expect(value).toBe('This is mocked in module and implementation version')
    })
    test('mock with in component call', () => {
        const component = render(callMockMeComponent)
        component.getByText('Component mounted.')
        expect(mockMe).toBeCalledTimes(1)
    })
    test('mock with in component call and implementation', () => {
        mockMe.mockImplementation(() => {
            return 'This is mocked in component call and implementation';
        })
        const component = render(callMockMeComponent)
        component.getByText('Component mounted.')
        expect(mockMe).toBeCalledTimes(1)
        component.getByText('This is mocked in component call and implementation')
    })
})

describe('test doMock', async () => {
    vi.doMock("../modules/moduleToMock");
    beforeEach(async () => {
        vi.clearAllMocks()
        vi.resetModules();
    })
    test('doMock with in test call', async () => {
        const {mockMe} = await import("../modules/moduleToMock")
        mockMe();
        expect(mockMe).toBeCalledTimes(1)
    })
    test('doMock with in test call and implementation', async () => {
        const {mockMe} = await import("../modules/moduleToMock")
        mockMe.mockImplementation(() => {
            return 'This is mocked version';
        })
        const value = mockMe();
        expect(mockMe).toBeCalledTimes(1)
        expect(value).toBe('This is mocked version')
    })
    test('doMock with in module call', async () => {
        const {mockMe} = await import("../modules/moduleToMock")
        const {callMockMe} = await import("../modules/callModuleFunction")
        const value = callMockMe();
        expect(mockMe).toBeCalledTimes(1)
    })
    test('doMock with in module call and implementation', async () => {
        const {mockMe} = await import("../modules/moduleToMock")
        const {callMockMe} = await import("../modules/callModuleFunction")
        mockMe.mockImplementation(() => {
            return 'This is mocked version';
        })
        const value = callMockMe();
        expect(mockMe).toBeCalledTimes(1)
        expect(value).toBe('This is mocked version')
    })
})

describe("Test doMock in Component", () => {
    vi.doMock("../modules/moduleToMock");
    beforeEach(async () => {
        vi.clearAllMocks()
        vi.resetModules();
    })
    test('doMock with in component call', async () => {
        const component = render(callMockMeComponent)
        component.getByText('Component mounted.')
        expect(mockMe).toBeCalledTimes(1)
    })
    test('doMock with in component call and implementation', async () => {
        mockMe.mockImplementation(() => {
            return 'This is mocked with in component call and implementation';
        })
        const component = render(callMockMeComponent)
        component.getByText('Component mounted.')
        expect(mockMe).toBeCalledTimes(1)
        component.getByText('This is mocked with in component call and implementation')
    })
})