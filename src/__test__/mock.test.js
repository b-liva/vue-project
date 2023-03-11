import { beforeEach, describe, expect, test, vi } from "vitest";
import { mockMe } from "../modules/moduleToMock";

describe("mock module", () => {
    beforeEach(() => {
        vi.mock("../modules/moduleToMock");
    })
    test('call mockMe', () => {
        mockMe()
        expect(mockMe).toBeCalledTimes(1)
    })
})