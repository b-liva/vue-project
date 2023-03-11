import { render } from "@testing-library/vue";
import { describe, expect, test } from "vitest";
import Simple from "../components/Simple.vue";

describe("vue specific", () => {
    test("v-show", () => {
        const component = render(Simple)
        component.getByText('Both')
        const el = component.getByText('Show');
        component.getByText('Hide')
    })
})