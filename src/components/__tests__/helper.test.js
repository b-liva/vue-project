import { expect, test } from "vitest"

function add(a, b){
    return a + b
}
describe('test helpers', () => {
    test("one: ", () =>{
        expect(1).toBe(1)
    })
    test('test add', () => {
        expect(add(1, 2)).toBe(3)
    })
})