import { beforeEach, describe, expect, test, vi } from "vitest";
import { mockMe } from "../modules/moduleToMock";

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