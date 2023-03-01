import {render, fireEvent} from '@testing-library/vue'
import TheWelcome from '../TheWelcome.vue'

test('properly handles v-model', async () => {
  const {getByLabelText, getByText} = render(TheWelcome)

  // Asserts initial state.
  getByText('Support Vue');
})