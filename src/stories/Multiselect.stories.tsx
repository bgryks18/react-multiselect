import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MultiselectComponent, { ChoiceItem } from "../components/Multiselect";

const list = [
  { id: 1, value: "a", x: "aswda", y: true },
  { id: 2, value: "b", x: "www", default: false },
  { id: 4, value: "c", x: "kkk" },
  { id: 6, value: "c", x: "kkk" },
  { id: 7, value: "a", x: "aswda", y: true },
  { id: 8, value: "b", x: "www", default: false },
  { id: 9, value: "c", x: "kkk" },
  { id: 10, value: "c", x: "kkk" },
  { id: 11, value: "a", x: "aswda", y: true },
  { id: 12, value: "b", x: "www", default: false },
  { id: 14, value: "c", x: "kkk" },
  { id: 16, value: "c", x: "kkk" },
] as ChoiceItem[];

const meta = {
  title: "Components/Multiselect",
  component: MultiselectComponent,
  args: {
    choices: list,
  },
} satisfies Meta<typeof MultiselectComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Multiselect: Story = {
  render: ({ choices }) => <MultiselectComponent choices={choices} />,
};
