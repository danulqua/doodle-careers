import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import TextInput from '@/components/common/TextInput.vue';

describe('TextInput', () => {
  it('communicates that user has entered character', async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: '',
      },
    });

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Ab1');

    const messages = emitted()['update:modelValue'];
    expect(messages).toEqual([['A'], ['Ab'], ['Ab1']]);
  });
});
