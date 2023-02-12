import { screen, render } from "@testing-library/vue";
import axios from "axios";
vi.mock("axios");

import SpotLight from "@/components/JobSearch/SpotLight.vue";

describe("SpotLight", () => {
  it("provides image to parent component", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Image",
          title: "Title",
          description: "Description",
        },
      ],
    });

    render(SpotLight, {
      slots: {
        default: `<template #default="slotprops">
        <h1>{{ slotprops.img }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Image");
    expect(text).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Image",
          title: "Title",
          description: "Description",
        },
      ],
    });

    render(SpotLight, {
      slots: {
        default: `<template #default="slotprops">
        <h1>{{ slotprops.title }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Title");
    expect(text).toBeInTheDocument();
  });

  it("provides description to parent component", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Image",
          title: "Title",
          description: "Description",
        },
      ],
    });

    render(SpotLight, {
      slots: {
        default: `<template #default="slotprops">
        <h1>{{ slotprops.description }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Description");
    expect(text).toBeInTheDocument();
  });
});
