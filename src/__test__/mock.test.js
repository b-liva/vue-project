import { beforeEach, describe, expect, test, vi } from "vitest";
import { mockMe } from "../modules/moduleToMock";
import {callMockMe} from "../modules/callModuleFunction";

describe("mock module", () => {
    beforeEach(() => {
        vi.mock("../modules/moduleToMock");
        vi.clearAllMocks()
    })
    test('call mockMe', () => {
        mockMe()
        expect(mockMe).toBeCalledTimes(1)
    })
    test('call mockMe', () => {
        mockMe.mockImplementation(() => {
            return 'This is mocked version';
        })
        const value = mockMe()
        expect(mockMe).toBeCalledTimes(1)
        expect(value).toBe('This is mocked version')
    })
})

describe('test doMock', async () => {
    beforeEach(() => {
        vi.doMock("../modules/moduleToMock");
    })
    test('doMock with inline call', async () => {
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
        const value = callMockMe();
        expect(mockMe).toBeCalledTimes(1)
        expect(value).toBe('This function should be mocked.')
    })
    test('doMock with in test module call and implementation', async () => {
        const {mockMe} = await import("../modules/moduleToMock")
        mockMe.mockImplementation(() => {
            return 'This is mocked version';
        })
        const value = callMockMe();
        expect(mockMe).toBeCalledTimes(1)
        expect(value).toBe('This is mocked version')
    })
})