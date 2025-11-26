export const presets = {
  // --- Intro presets ---

  superposition: {
    title: "Simple superposition",
    description: "Apply H to |0> to get (|0> + |1>)/√2.",
    mode: "single",
    operations: ["H on qubit 0"],
  },

  bellPair: {
    title: "Bell state |Φ⁺>",
    description: "Creates an entangled Bell pair using H and CNOT.",
    mode: "entangled",
    operations: ["H on qubit 0", "CNOT 0->1"],
  },

  interference: {
    title: "Interference: H • H",
    description:
      "Apply H twice to see interference bring |0> back to |0> (probability 1).",
    mode: "single",
    operations: ["H on qubit 0", "H on qubit 0"],
  },

  // --- Advanced presets for lessons 44–49 ---

  amplitudeEstimationToy: {
    title: "Toy amplitude estimation circuit",
    description:
      "Prepares a biased superposition and applies a Grover-style iterate once.",
    mode: "single",
    operations: [
      "H on qubit 0",
      "RZ(pi/4) on qubit 0",
      "Grover-iterate once",
    ],
  },

  qaoaMaxCut3: {
    title: "QAOA for 3-node MaxCut",
    description:
      "One QAOA layer for MaxCut on a triangle graph: cost unitary then mixer.",
    mode: "entangled",
    operations: [
      "H on all qubits",
      "ZZ cost unitary on triangle edges",
      "RX(beta) on all qubits (mixer)",
    ],
  },

  vqeH2Minimal: {
    title: "VQE ansatz for H₂ (minimal basis)",
    description:
      "A simple two-qubit VQE-style ansatz for the H₂ molecule: two RY rotations and a CNOT.",
    mode: "entangled",
    operations: [
      "Prepare |00>",
      "RY(theta1) on qubit 0",
      "RY(theta2) on qubit 1",
      "CNOT 0->1",
    ],
  },

  qmlClassifierToy: {
    title: "Variational quantum classifier (2D toy data)",
    description:
      "Encodes a 2D point with RX/RY, then applies a small variational layer before measuring Z.",
    mode: "single",
    operations: [
      "Data-encode: RX(x) on qubit 0",
      "Data-encode: RY(y) on qubit 0",
      "Variational: RZ(a) on qubit 0",
      "Variational: RX(b) on qubit 0",
      "Variational: RY(c) on qubit 0",
      "Measure Z",
    ],
  },

  qmlKernelToy: {
    title: "Quantum kernel feature map (2 qubits)",
    description:
      "Applies a simple entangling feature map that could be used inside a quantum kernel method.",
    mode: "entangled",
    operations: [
      "H on both qubits",
      "Data-encode: ZZ(x, x') interaction",
      "Data-encode: RZ(z1) on qubit 0",
      "Data-encode: RZ(z2) on qubit 1",
    ],
  },

  manyBodyChain: {
    title: "Short spin chain time evolution",
    description:
      "A tiny 3–4 site spin chain with nearest-neighbour ZZ interactions and a transverse X field (few Trotter steps).",
    mode: "entangled",
    operations: [
      "Prepare |000...>",
      "Apply ZZ on neighbours (0-1, 1-2, ...)",
      "Apply RX(h) on all qubits (transverse field)",
      "Repeat 2–3 Trotter steps",
    ],
  },
};
