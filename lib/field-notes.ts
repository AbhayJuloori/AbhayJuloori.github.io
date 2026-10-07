import type { FieldNote } from "@/lib/types";

export const fieldNotes = [
  {
    label: "Current build",
    title: "Streaming, simulation, and the cost of added complexity.",
    detail: "The newest work asks what a system must survive in production—and whether each extra piece earns its place.",
  },
  {
    label: "Current question",
    title: "How much uncertainty should a decision interface expose at once?",
    detail: "Enough to make judgment possible, without transferring the entire modelling burden to the user.",
  },
  {
    label: "Working pattern",
    title: "Build the data, model, and interface as one argument.",
    detail: "The strongest projects make it possible to trace a recommendation back through the system that produced it.",
  },
  {
    label: "Off duty",
    title: "Manga, patient world-building, and the next technical rabbit hole.",
    detail: "I like systems that reveal their rules gradually—fictional or otherwise.",
  },
] as const satisfies readonly FieldNote[];
