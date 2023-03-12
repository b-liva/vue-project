import { mockMe } from "./moduleToMock";
console.log('imported in module:', mockMe)

export function callMockMe(){
    return mockMe()
}