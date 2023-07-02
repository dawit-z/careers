import { screen, render } from "@testing-library/vue";
import axios from "axios";
vi.mock("axios");
import type { Mock } from "vitest";
import SpotLight from "@/components/JobSearch/SpotLight.vue";

const axiosGetMock = axios.get as Mock;

describe("SpotLight", () => {
  const mockSpotlightsReponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Image",
          title: "Title",
          description: "Description",
          ...spotlight,
        },
      ],
    });
  };

  it("provides image to parent component", async () => {
    mockSpotlightsReponse();

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
    mockSpotlightsReponse();

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
    mockSpotlightsReponse();

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
