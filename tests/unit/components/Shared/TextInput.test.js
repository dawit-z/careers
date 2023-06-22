import { render, screen, fireEvent } from "@testing-library/vue";

import TextInput from "@/components/Shared/TextInput.vue";

describe("TextInput", () => {
  it("communicates user has entered characters", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: "",
      },
    });

    const input = screen.getByRole("textbox");
    await fireEvent.update(input, "NYC");
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([["NYC"]]);
  });
});
