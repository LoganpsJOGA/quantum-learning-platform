// data/playgroundPresets.js

export const presets = {
  bitToOne: {
    title: "Prepare |1⟩ and measure",
    operations: ["X"],
  },
  superposition: {
    title: "Create superposition with H",
    operations: ["H"],
  },
  bellPair: {
    title: "Bell pair: H + CNOT",
    operations: ["H", "CNOT"],
  },
  interference: {
    title: "H → Z → H",
    operations: ["H", "Z", "H"],
  },
};
