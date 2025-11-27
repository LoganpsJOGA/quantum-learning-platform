// src/data/lessonQuizzes.js
// Each lesson gets an array of 3+ harder multiple-choice questions.
// choices: [A,B,C,D], answerIndex: correct choice index, explanation: short reasoning.

export const lessonQuizzes = {
  "bit-vs-qubit": [
    {
      id: "bit-vs-qubit-1",
      question:
        "Which statement best captures the key advantage a qubit has over a classical bit?",
      choices: [
        "A qubit can store the values 0, 1, 2, and 3 at the same time.",
        "A qubit can be in a superposition of 0 and 1, letting algorithms explore many possibilities in parallel.",
        "A qubit never loses information when measured.",
        "A qubit can only be 0 or 1, but it switches faster than a classical bit."
      ],
      answerIndex: 1,
      explanation:
        "The power of a qubit is superposition: before measurement it can be in a quantum combination of |0⟩ and |1⟩ that algorithms exploit to explore many possibilities at once."
    },
    {
      id: "bit-vs-qubit-2",
      question:
        "Why is the phrase “a qubit is both 0 and 1 at the same time” somewhat misleading?",
      choices: [
        "Because a qubit is always exactly 0 until we flip it with a gate.",
        "Because the qubit actually cycles deterministically between 0 and 1.",
        "Because superposition encodes probability amplitudes for 0 and 1, not two definite classical values stored simultaneously.",
        "Because a qubit can only ever be 1 in real hardware."
      ],
      answerIndex: 2,
      explanation:
        "Superposition is described by amplitudes, which turn into probabilities at measurement. The qubit isn’t literally storing two classical bits; it is in a quantum state that behaves like a weighted combination of |0⟩ and |1⟩."
    },
    {
      id: "bit-vs-qubit-3",
      question:
        "For n classical bits you can store one of 2ⁿ possible patterns at a time. For n qubits, what is special about the state space?",
      choices: [
        "It can only represent n distinct states total.",
        "It also has 2ⁿ states and each qubit state is always one of them with certainty.",
        "It has 2ⁿ basis states and a quantum state can be a superposition of all of them at once.",
        "It has infinitely many basis states because amplitudes are continuous."
      ],
      answerIndex: 2,
      explanation:
        "The computational basis still has 2ⁿ states, but a quantum state can be a superposition over all 2ⁿ basis states simultaneously, which is what gives quantum computing its huge expressive power."
    }
  ],

  superposition: [
    {
      id: "superposition-1",
      question:
        "If we prepare H|0⟩ = (|0⟩ + |1⟩)/√2, what do the squared magnitudes of the amplitudes represent physically?",
      choices: [
        "The exact value the qubit will collapse to.",
        "The probabilities of measuring 0 or 1, each equal to 1/2.",
        "How fast the qubit oscillates between 0 and 1.",
        "The number of qubits entangled with this one."
      ],
      answerIndex: 1,
      explanation:
        "The Born rule says the squared magnitude of an amplitude is the probability of that outcome. For H|0⟩, both outcomes occur with probability 1/2."
    },
    {
      id: "superposition-2",
      question:
        "Why can’t we simply “peek” at the amplitudes of a superposition without disturbing the state?",
      choices: [
        "Because amplitudes are stored in classical RAM outside the chip.",
        "Because measurement projects the state onto a basis vector, destroying phase information.",
        "Because amplitudes are only defined for multi-qubit systems, not one qubit.",
        "Because amplitudes are always zero in realistic circuits."
      ],
      answerIndex: 1,
      explanation:
        "Projective measurement collapses the state onto a basis vector. We never see amplitudes directly; we estimate them statistically by repeating experiments."
    },
    {
      id: "superposition-3",
      question:
        "The lesson compares superposition to a “probability cloud”. What feature of superposition is this analogy trying to emphasize?",
      choices: [
        "That the qubit rapidly flips between 0 and 1 on a schedule.",
        "That the qubit has a definite hidden value we just haven’t looked at yet.",
        "That before measurement we only have a distribution over possible outcomes, not a single definite classical state.",
        "That probabilities are always exactly 50/50 in any quantum state."
      ],
      answerIndex: 2,
      explanation:
        "Superposition doesn’t assign a hidden definite value. Instead it gives a distribution over what you can get if you measure, similar to a cloud of possible positions."
    }
  ],

  measurement: [
    {
      id: "measurement-1",
      question:
        "You repeatedly prepare H|0⟩ and measure in the computational basis. Over many shots, what should you observe?",
      choices: [
        "Always 0.",
        "Always 1.",
        "Approximately half 0 and half 1, up to statistical noise.",
        "A perfectly repeating pattern 0,1,0,1,…"
      ],
      answerIndex: 2,
      explanation:
        "Each shot is random, but the probabilities are 1/2 and 1/2, so many shots give roughly half 0 and half 1."
    },
    {
      id: "measurement-2",
      question:
        "In the simple projective measurement model, why does measurement destroy the original superposition state?",
      choices: [
        "Because the hardware deletes the qubit after each clock cycle.",
        "Because projection onto an eigenstate removes the coherent phase information between basis states.",
        "Because the state is copied into classical bits while also staying quantum.",
        "Because only |1⟩ collapses while |0⟩ stays in superposition."
      ],
      answerIndex: 1,
      explanation:
        "After projection onto |0⟩ or |1⟩, relative phases between components disappear; the post-measurement state no longer contains the previous superposition information."
    },
    {
      id: "measurement-3",
      question:
        "Why do quantum programmers talk about running circuits for many “shots”?",
      choices: [
        "Because one shot is useless; we need many to implement a gate.",
        "Because each shot uses a different unitary operator.",
        "Because every shot gives only one random outcome; many are needed to estimate probabilities or expectation values.",
        "Because the hardware can only run in blocks of exactly 1024 shots."
      ],
      answerIndex: 2,
      explanation:
        "Each execution yields a single sample from the outcome distribution. To recover the distribution, we repeat and look at the frequencies of each result."
    }
  ],

  "bloch-sphere": [
    {
      id: "bloch-sphere-1",
      question:
        "On the Bloch sphere, which states correspond to points on the north and south poles?",
      choices: [
        "|+⟩ and |−⟩ respectively",
        "|0⟩ and |1⟩ respectively",
        "|0⟩+|1⟩ and |0⟩−|1⟩ respectively",
        "Any two orthogonal states of our choosing"
      ],
      answerIndex: 1,
      explanation:
        "By convention the computational basis is at the poles: |0⟩ at the north pole, |1⟩ at the south pole."
    },
    {
      id: "bloch-sphere-2",
      question:
        "What does a rotation around the Z-axis on the Bloch sphere primarily change?",
      choices: [
        "The measurement probabilities in the Z basis.",
        "Only the global phase, leaving the state physically identical.",
        "The relative phase between |0⟩ and |1⟩ while keeping Z-basis probabilities the same.",
        "The length of the Bloch vector, shrinking it below 1."
      ],
      answerIndex: 2,
      explanation:
        "Z-axis rotations change the relative phase between |0⟩ and |1⟩ but keep their probabilities unchanged, so the Bloch vector spins around the Z axis."
    },
    {
      id: "bloch-sphere-3",
      question:
        "Which description best matches a pure state on the Bloch sphere?",
      choices: [
        "Any point strictly inside the sphere.",
        "Any point on the surface of the sphere.",
        "Only the north and south poles.",
        "Only the equator."
      ],
      answerIndex: 1,
      explanation:
        "Pure states correspond to points on the unit sphere’s surface; mixed states live inside the sphere."
    }
  ],

  "single-qubit-gates": [
    {
      id: "sqg-1",
      question:
        "Which matrix represents the Hadamard gate H in the computational basis?",
      choices: [
        "[[1, 0],[0, -1]] / √2",
        "[[0, 1],[1, 0]]",
        "[[1, 1],[1, -1]] / √2",
        "[[0, -i],[i, 0]]"
      ],
      answerIndex: 2,
      explanation:
        "H maps |0⟩ → (|0⟩+|1⟩)/√2 and |1⟩ → (|0⟩−|1⟩)/√2, corresponding to [[1, 1],[1, -1]]/√2."
    },
    {
      id: "sqg-2",
      question:
        "What is special about single-qubit gates in terms of unitarity?",
      choices: [
        "They must be orthogonal but not necessarily unitary.",
        "They must be reversible and represented by 2×2 unitary matrices.",
        "They can be non-invertible as long as probabilities are conserved.",
        "They always commute with each other."
      ],
      answerIndex: 1,
      explanation:
        "Quantum evolution must be reversible and norm-preserving, so single-qubit gates are 2×2 unitary matrices."
    },
    {
      id: "sqg-3",
      question:
        "Which gate turns computational basis states into ±X eigenstates?",
      choices: ["Z", "X", "H", "S"],
      answerIndex: 2,
      explanation:
        "The Hadamard H maps |0⟩ and |1⟩ to |+⟩ and |−⟩, which are eigenstates of the X operator."
    }
  ],

  entanglement: [
    {
      id: "ent-1",
      question:
        "Which two-qubit state is maximally entangled (a Bell state)?",
      choices: [
        "(|00⟩ + |01⟩)/√2",
        "(|00⟩ + |11⟩)/√2",
        "(|00⟩)/√2",
        "(|01⟩ + |10⟩)/2"
      ],
      answerIndex: 1,
      explanation:
        "(|00⟩+|11⟩)/√2 is one of the four standard Bell states and is maximally entangled."
    },
    {
      id: "ent-2",
      question:
        "What is a key signature that a two-qubit state is entangled?",
      choices: [
        "It can be written as a tensor product of single-qubit states.",
        "You cannot express it as |ψ⟩⊗|φ⟩ for any single-qubit |ψ⟩, |φ⟩.",
        "Measuring one qubit has no effect on any probabilities.",
        "Its amplitudes are all real numbers."
      ],
      answerIndex: 1,
      explanation:
        "Entanglement means the state is not separable: there are no single-qubit states whose tensor product equals the joint state."
    },
    {
      id: "ent-3",
      question:
        "In an ideal Bell pair, what happens if you measure both qubits in the same basis?",
      choices: [
        "Their outcomes are perfectly correlated or anti-correlated, depending on the state.",
        "Their outcomes are always independent.",
        "You always get 0 on both qubits.",
        "You always collapse to a product state with equal probabilities."
      ],
      answerIndex: 0,
      explanation:
        "Bell states produce strong correlations: e.g. (|00⟩+|11⟩)/√2 gives perfectly matched outcomes in the Z basis."
    }
  ],

  interference: [
    {
      id: "int-1",
      question:
        "In the lesson’s interference picture, what is required for amplitudes to interfere?",
      choices: [
        "They must correspond to different basis states.",
        "They must correspond to indistinguishable paths leading to the same final state.",
        "They must be purely real numbers.",
        "They must come from classical probabilities."
      ],
      answerIndex: 1,
      explanation:
        "Interference arises when different paths leading to the same outcome are indistinguishable; their amplitudes add and can reinforce or cancel."
    },
    {
      id: "int-2",
      question:
        "What is destructive interference in quantum circuits?",
      choices: [
        "When two qubits cancel each other and disappear.",
        "When amplitudes for a basis state add to zero so its probability is suppressed.",
        "When measurement gives the opposite result of what we expected.",
        "When a gate fails due to noise."
      ],
      answerIndex: 1,
      explanation:
        "Destructive interference happens when amplitudes with opposite phase combine, giving nearly zero amplitude and thus low probability."
    },
    {
      id: "int-3",
      question:
        "Which experiment is a classic illustration of quantum interference?",
      choices: [
        "Stern–Gerlach spin measurement.",
        "Double-slit experiment with single photons or electrons.",
        "Measuring resistance in a wire.",
        "Classical coin flipping."
      ],
      answerIndex: 1,
      explanation:
        "The double-slit experiment shows an interference pattern even when particles are sent one at a time, revealing quantum interference."
    }
  ],

  "multi-qubit-circuits": [
    {
      id: "mqc-1",
      question:
        "What does a CNOT gate do to the target qubit when the control is |1⟩?",
      choices: [
        "Nothing; it only acts when the control is |0⟩.",
        "It resets the target to |0⟩.",
        "It flips the target: |0⟩↔|1⟩.",
        "It creates a new qubit."
      ],
      answerIndex: 2,
      explanation:
        "CNOT is a controlled-X: when control is |1⟩, the target is flipped."
    },
    {
      id: "mqc-2",
      question:
        "Why do multi-qubit circuits quickly become hard to simulate classically?",
      choices: [
        "Because each qubit doubles the number of wires.",
        "Because the number of amplitudes grows linearly with the number of gates.",
        "Because the Hilbert space dimension grows as 2ⁿ with n qubits.",
        "Because qubits move faster than classical bits."
      ],
      answerIndex: 2,
      explanation:
        "To track a general n-qubit pure state we need 2ⁿ complex amplitudes, which becomes huge as n grows."
    },
    {
      id: "mqc-3",
      question:
        "In a circuit diagram, what do horizontal lines typically represent?",
      choices: [
        "Time steps.",
        "Individual qubits evolving left-to-right in time.",
        "Measurement outcomes.",
        "Classical bits only."
      ],
      answerIndex: 1,
      explanation:
        "Each horizontal line corresponds to one qubit’s worldline; gates are placed along it to show evolution through time."
    }
  ],

  "deutsch-algorithm": [
    {
      id: "deutsch-1",
      question:
        "What property of a black-box Boolean function does Deutsch’s algorithm distinguish with a single quantum query?",
      choices: [
        "Whether the function is monotone.",
        "Whether the function is constant or balanced.",
        "Whether the function is linear.",
        "Whether the function is injective."
      ],
      answerIndex: 1,
      explanation:
        "Deutsch’s original algorithm (and Deutsch–Jozsa generalization) distinguishes constant vs balanced functions with fewer queries than classically."
    },
    {
      id: "deutsch-2",
      question:
        "Which ingredient is crucial in Deutsch’s algorithm to create interference between f(0) and f(1)?",
      choices: [
        "Entanglement with many ancilla qubits.",
        "A classical random number generator.",
        "Superposition of the input and a phase kickback from the oracle.",
        "Repeated measurement of the oracle output."
      ],
      answerIndex: 2,
      explanation:
        "The algorithm prepares a superposition of |0⟩ and |1⟩, then uses the oracle so f(x) information is stored as a phase, which interferes in the final Hadamard."
    },
    {
      id: "deutsch-3",
      question:
        "Classically, how many evaluations of f(x) are needed in the worst case to be sure whether f is constant or balanced (for the 1-bit case)?",
      choices: ["0", "1", "2", "More than 2"],
      answerIndex: 2,
      explanation:
        "With one classical query you only see f(0) or f(1), not both; you need two evaluations in the worst case. Deutsch does it with one quantum query."
    }
  ],

  "quantum-vs-classical-thinking": [
    {
      id: "qvsc-1",
      question:
        "Which mindset shift is *most* important when moving from classical to quantum algorithms?",
      choices: [
        "Thinking in terms of loops instead of gates.",
        "Thinking in terms of amplitudes and interference instead of just probabilities.",
        "Avoiding randomness entirely.",
        "Ignoring hardware noise."
      ],
      answerIndex: 1,
      explanation:
        "Quantum algorithms are built around manipulating amplitudes to interfere constructively or destructively, not just classical probabilities."
    },
    {
      id: "qvsc-2",
      question:
        "Why is simply running a classical algorithm on a quantum computer usually a bad idea?",
      choices: [
        "Quantum hardware cannot implement logical operations.",
        "Quantum operations are slower than classical ones.",
        "Quantum hardware is too precise.",
        "It ignores superposition/interference and offers no speed benefit, while paying a noise/overhead penalty."
      ],
      answerIndex: 3,
      explanation:
        "Quantum resources are expensive and noisy; you only gain when the algorithm actually uses quantum effects such as interference or entanglement."
    },
    {
      id: "qvsc-3",
      question:
        "Which type of problems have strong evidence for *exponential* quantum speedups (based on current knowledge)?",
      choices: [
        "All NP-complete problems.",
        "Integer factoring and discrete log (via Shor’s algorithm).",
        "Sorting numbers.",
        "Basic arithmetic operations."
      ],
      answerIndex: 1,
      explanation:
        "Shor’s algorithm gives polynomial-time quantum algorithms for factoring and discrete log, where the best known classical algorithms are super-polynomial."
    }
  ],

  "state-vectors": [
    {
      id: "sv-1",
      question:
        "For a normalized single-qubit state α|0⟩ + β|1⟩, what condition must α and β satisfy?",
      choices: [
        "|α| + |β| = 1",
        "|α|² + |β|² = 1",
        "α + β = 1",
        "αβ = 0"
      ],
      answerIndex: 1,
      explanation:
        "The total probability must be 1, so the squared magnitudes sum to 1."
    },
    {
      id: "sv-2",
      question:
        "Which of the following state vectors is *not* normalized?",
      choices: [
        "(1/√2)|0⟩ + (1/√2)|1⟩",
        "(√3/2)|0⟩ + (1/2)|1⟩",
        "(2/3)|0⟩ + (2/3)|1⟩",
        "|1⟩"
      ],
      answerIndex: 2,
      explanation:
        "|2/3|² + |2/3|² = 8/9 ≠ 1, so the state is not normalized."
    },
    {
      id: "sv-3",
      question:
        "If a two-qubit state is written as a length-4 complex column vector, what do the entries correspond to?",
      choices: [
        "Probabilities of four classical bits.",
        "Amplitudes for the basis states |00⟩, |01⟩, |10⟩, |11⟩.",
        "Four independent single-qubit states.",
        "Measurement outcomes in any basis."
      ],
      answerIndex: 1,
      explanation:
        "The ordering is typically |00⟩, |01⟩, |10⟩, |11⟩; each component is the amplitude of one basis state."
    }
  ],

  "dirac-notation": [
    {
      id: "dirac-1",
      question:
        "In Dirac notation, what does ⟨φ|ψ⟩ represent?",
      choices: [
        "A tensor product state.",
        "The outer product of |φ⟩ and |ψ⟩.",
        "The inner product, a single complex number.",
        "The probability of getting |φ⟩ when measuring |ψ⟩."
      ],
      answerIndex: 2,
      explanation:
        "⟨φ|ψ⟩ is the inner product of two kets, yielding a complex scalar. Its squared magnitude gives the probability if |φ⟩ is a measurement outcome."
    },
    {
      id: "dirac-2",
      question:
        "Which expression corresponds to the projector onto |0⟩?",
      choices: [
        "|0⟩⟨0|",
        "|0⟩ + ⟨0|",
        "⟨0|0⟩",
        "|0⟩⟨1| + |1⟩⟨0|"
      ],
      answerIndex: 0,
      explanation:
        "The outer product |0⟩⟨0| is the rank-1 projector onto the |0⟩ state."
    },
    {
      id: "dirac-3",
      question:
        "If U is a unitary matrix, what is the relationship between its bra-ket form and its adjoint?",
      choices: [
        "U†U = 0",
        "U†U = I",
        "UU† = 0",
        "U† = U⁻¹ only for real matrices"
      ],
      answerIndex: 1,
      explanation:
        "Unitarity means U†U = UU† = I; the adjoint is the inverse."
    }
  ],

  "tensor-products": [
    {
      id: "tp-1",
      question:
        "If |ψ⟩ = a|0⟩ + b|1⟩ and |φ⟩ = c|0⟩ + d|1⟩, what is |ψ⟩⊗|φ⟩?",
      choices: [
        "(a+c)|00⟩ + (b+d)|11⟩",
        "ac|00⟩ + ad|01⟩ + bc|10⟩ + bd|11⟩",
        "ac|00⟩ + bd|11⟩",
        "a|0⟩ + b|1⟩ + c|0⟩ + d|1⟩"
      ],
      answerIndex: 1,
      explanation:
        "Tensor products distribute over addition: multiply each amplitude pair to get ac, ad, bc, bd on the four basis states."
    },
    {
      id: "tp-2",
      question:
        "Which of these two-qubit states is clearly separable (not entangled)?",
      choices: [
        "(|00⟩ + |11⟩)/√2",
        "(|01⟩ + |10⟩)/√2",
        "|0⟩⊗(1/√2)(|0⟩ + |1⟩)",
        "(|00⟩ − |11⟩)/√2"
      ],
      answerIndex: 2,
      explanation:
        "Explicitly written as a tensor product of a single-qubit state with another, so it is separable."
    },
    {
      id: "tp-3",
      question:
        "How does the dimension of the Hilbert space scale when you take tensor products of n qubits?",
      choices: [
        "It stays 2.",
        "It grows linearly with n.",
        "It grows quadratically with n.",
        "It grows as 2ⁿ."
      ],
      answerIndex: 3,
      explanation:
        "Each qubit doubles the dimension; for n qubits we have dimension 2ⁿ."
    }
  ],

  "circuits-and-matrices": [
    {
      id: "cam-1",
      question:
        "What is the matrix corresponding to applying two gates U then V to the same qubit?",
      choices: [
        "U + V",
        "UV (V applied after U)",
        "VU (U applied after V)",
        "U⊗V"
      ],
      answerIndex: 2,
      explanation:
        "Circuit order is right-to-left as matrix multiplication: |ψ⟩ → V(U|ψ⟩) = (VU)|ψ⟩."
    },
    {
      id: "cam-2",
      question:
        "If a circuit consists of only unitary gates (until measurement), how can we describe its overall action?",
      choices: [
        "As a stochastic matrix.",
        "As a general linear map.",
        "As a single big unitary matrix.",
        "As a non-invertible map that loses information."
      ],
      answerIndex: 2,
      explanation:
        "Composing unitaries yields another unitary; the circuit corresponds to one big unitary matrix acting on the state vector."
    },
    {
      id: "cam-3",
      question:
        "Why is linearity of quantum evolution so important when reasoning about circuits?",
      choices: [
        "It guarantees that quantum gates commute.",
        "It allows us to analyze how they act on basis states and extend by superposition.",
        "It means probabilities always add to 1.",
        "It prevents entanglement from forming."
      ],
      answerIndex: 1,
      explanation:
        "Because evolution is linear, knowing how a circuit acts on basis states lets us compute its action on any superposition."
    }
  ],

  "reversible-computation": [
    {
      id: "rev-1",
      question:
        "Why must quantum gates be reversible at the level of pure states?",
      choices: [
        "Because irreversibility violates energy conservation.",
        "Because unitarity implies a one-to-one mapping between input and output vectors.",
        "Because measurement is reversible.",
        "Because classical computers are also reversible."
      ],
      answerIndex: 1,
      explanation:
        "Unitary maps are bijective; you can always recover the input from the output by applying U†."
    },
    {
      id: "rev-2",
      question:
        "Which of the following classical operations is naturally reversible?",
      choices: [
        "AND of two bits.",
        "OR of two bits.",
        "XOR of two bits (with both inputs preserved).",
        "Resetting a bit to 0."
      ],
      answerIndex: 2,
      explanation:
        "If you keep both inputs, XOR is reversible: you can recover the inputs from outputs."
    },
    {
      id: "rev-3",
      question:
        "Why do we sometimes introduce ancilla qubits when making classical logic reversible?",
      choices: [
        "To measure more outcomes at once.",
        "To store garbage bits that keep the mapping one-to-one.",
        "To speed up computation.",
        "To suppress noise."
      ],
      answerIndex: 1,
      explanation:
        "Ancillas store intermediate information so that the overall transformation remains injective (reversible)."
    }
  ],

  "grover-intuition": [
    {
      id: "grover-1",
      question:
        "Classically, how many queries are required on average to find a marked item in an unstructured database of N items?",
      choices: [
        "O(1)",
        "O(log N)",
        "O(√N)",
        "O(N)"
      ],
      answerIndex: 3,
      explanation:
        "Without structure you must essentially check items one-by-one; on average you look at O(N) items."
    },
    {
      id: "grover-2",
      question:
        "What is Grover’s algorithm’s query complexity for unstructured search?",
      choices: [
        "O(1)",
        "O(log N)",
        "O(√N)",
        "O(N)"
      ],
      answerIndex: 2,
      explanation:
        "Grover’s algorithm achieves a quadratic speedup, finding a marked item with O(√N) oracle calls."
    },
    {
      id: "grover-3",
      question:
        "Conceptually, what operation does the Grover “diffusion operator” perform?",
      choices: [
        "It measures all qubits.",
        "It amplifies amplitudes of marked states by adding a constant.",
        "It reflects the state about the average amplitude, increasing weight on marked items.",
        "It erases all amplitudes and restarts from |0…0⟩."
      ],
      answerIndex: 2,
      explanation:
        "After the oracle flips the phase of marked states, the diffusion operator reflects about the mean amplitude, boosting marked states’ amplitudes."
    }
  ],

  "shor-intuition": [
    {
      id: "shor-1",
      question:
        "Which classical problem does Shor’s algorithm solve efficiently on a quantum computer?",
      choices: [
        "Traveling salesman.",
        "Integer factoring and discrete logarithms.",
        "Sorting huge arrays.",
        "Matrix multiplication."
      ],
      answerIndex: 1,
      explanation:
        "Shor’s algorithm gives polynomial-time quantum algorithms for factoring and discrete log, threatening RSA-type cryptosystems."
    },
    {
      id: "shor-2",
      question:
        "Which quantum subroutine is central to Shor’s algorithm?",
      choices: [
        "Grover’s search.",
        "Quantum teleportation.",
        "Quantum Fourier transform (QFT).",
        "Amplitude amplification."
      ],
      answerIndex: 2,
      explanation:
        "The QFT is used for period-finding, which underlies the factoring algorithm."
    },
    {
      id: "shor-3",
      question:
        "Why is Shor’s algorithm mainly of future interest, not immediate practical use today?",
      choices: [
        "Because it is mathematically incorrect.",
        "Because current quantum hardware is far from the scale and error-rates needed to factor realistic cryptographic keys.",
        "Because it only works for prime numbers.",
        "Because classical factoring is already polynomial time."
      ],
      answerIndex: 1,
      explanation:
        "Today’s devices are too noisy and small; Shor requires many logical qubits and fault-tolerant error correction."
    }
  ],

  "phase-estimation": [
    {
      id: "pe-1",
      question:
        "In quantum phase estimation, what is the “phase” we are trying to learn?",
      choices: [
        "A global phase of the whole register.",
        "The eigenphase φ in U|ψ⟩ = e^{2πiφ}|ψ⟩ for some eigenstate |ψ⟩.",
        "The phase of the classical clock driving the hardware.",
        "The phase of a laser used for control."
      ],
      answerIndex: 1,
      explanation:
        "Phase estimation estimates φ such that U|ψ⟩ = e^{2πiφ}|ψ⟩, where U is a unitary with known controlled powers."
    },
    {
      id: "pe-2",
      question:
        "Which algorithm uses phase estimation as a key subroutine?",
      choices: [
        "Grover search.",
        "Shor’s factoring algorithm.",
        "Deutsch–Jozsa algorithm.",
        "BB84 key distribution."
      ],
      answerIndex: 1,
      explanation:
        "Shor’s algorithm can be viewed as applying phase estimation to a modular multiplication unitary."
    },
    {
      id: "pe-3",
      question:
        "Why do we use multiple ancilla qubits in phase estimation?",
      choices: [
        "To store multiple eigenstates at once.",
        "To encode the phase in binary with controllable precision.",
        "To correct errors on the main register.",
        "To teleport the state between qubits."
      ],
      answerIndex: 1,
      explanation:
        "The ancilla register holds a superposition of time-steps whose interference after the inverse QFT encodes the phase in binary."
    }
  ],

  "noise-and-decoherence": [
    {
      id: "noise-1",
      question:
        "Which effect does *decoherence* primarily refer to?",
      choices: [
        "Random bit-flips only.",
        "Loss of quantum phase information due to interaction with the environment.",
        "Deterministic drift of gate parameters.",
        "Classical voltage noise on control lines."
      ],
      answerIndex: 1,
      explanation:
        "Decoherence is the loss of coherent phase relationships with the environment, turning superpositions into mixtures."
    },
    {
      id: "noise-2",
      question:
        "Which timescale measures how quickly a qubit forgets the phase between |0⟩ and |1⟩?",
      choices: ["T₁", "T₂", "Clock period", "Gate time"],
      answerIndex: 1,
      explanation:
        "T₂ (dephasing time) characterizes loss of phase coherence; T₁ characterizes energy relaxation."
    },
    {
      id: "noise-3",
      question:
        "Why is error *mitigation* (without full correction) important for NISQ devices?",
      choices: [
        "Because mitigation makes circuits perfectly error-free.",
        "Because full fault-tolerant error correction is too resource-intensive at current scales.",
        "Because qubits cannot be cooled enough.",
        "Because mitigation replaces the need for calibration."
      ],
      answerIndex: 1,
      explanation:
        "Fault-tolerant codes require many physical qubits per logical qubit; mitigation techniques try to reduce bias in results without full correction."
    }
  ],

  "error-correction": [
    {
      id: "ec-1",
      question:
        "What is the basic idea of a quantum error-correcting code?",
      choices: [
        "Encoding classical bits redundantly.",
        "Encoding one logical qubit into a larger entangled state of many physical qubits.",
        "Measuring the qubit more often to detect errors.",
        "Using only decoherence-free subspaces."
      ],
      answerIndex: 1,
      explanation:
        "A logical qubit is spread over many physical qubits so that local errors can be detected and corrected via syndrome measurements."
    },
    {
      id: "ec-2",
      question:
        "Why must error-syndrome measurements avoid directly revealing the logical state?",
      choices: [
        "Because measurement is too slow.",
        "Because revealing the logical state would collapse the encoded superposition.",
        "Because logical states are classical.",
        "Because we only correct classical errors."
      ],
      answerIndex: 1,
      explanation:
        "Syndrome measurements are designed to detect errors without learning the encoded logical information, preserving coherence."
    },
    {
      id: "ec-3",
      question:
        "What does the “threshold theorem” say in rough terms?",
      choices: [
        "Error correction is impossible beyond a threshold.",
        "If physical error rates are below a threshold, arbitrarily long quantum computation is possible with poly overhead.",
        "There is a maximum number of qubits you can correct.",
        "Only topological codes are useful."
      ],
      answerIndex: 1,
      explanation:
        "Below a certain error rate, concatenated or surface-code style error correction can suppress logical errors arbitrarily with reasonable overhead."
    }
  ],

  "hardware-superconducting": [
    {
      id: "hwsc-1",
      question:
        "Superconducting qubits are typically based on which physical element?",
      choices: [
        "Photons in an optical cavity.",
        "Electrons in a semiconductor quantum dot.",
        "Josephson junction circuits.",
        "Single trapped ions."
      ],
      answerIndex: 2,
      explanation:
        "Superconducting qubits use Josephson junctions to create anharmonic energy levels that behave like qubits."
    },
    {
      id: "hwsc-2",
      question:
        "What is a typical *advantage* of superconducting qubits compared to some other platforms?",
      choices: [
        "Very high operating temperatures (room temperature).",
        "Nanosecond-scale gates and lithographic scalability.",
        "No need for microwave control.",
        "Perfect immunity to noise."
      ],
      answerIndex: 1,
      explanation:
        "Superconducting qubits have fast gates and can be fabricated with existing chip technologies, though they require dilution refrigerators."
    },
    {
      id: "hwsc-3",
      question:
        "Which is a major challenge for superconducting qubit systems?",
      choices: [
        "Too long coherence times.",
        "Difficulty integrating control electronics at cryogenic temperatures.",
        "Inability to couple qubits at all.",
        "Lack of any readout mechanism."
      ],
      answerIndex: 1,
      explanation:
        "Scaling systems while bringing in control and readout wiring at millikelvin temperatures is a major engineering challenge."
    }
  ],

  "hardware-trapped-ions": [
    {
      id: "hwti-1",
      question:
        "What physical object encodes a trapped-ion qubit?",
      choices: [
        "The vibrational mode of a crystal.",
        "The internal electronic states of a single ion confined by electromagnetic fields.",
        "A microwave photon.",
        "A Cooper pair."
      ],
      answerIndex: 1,
      explanation:
        "Trapped-ion qubits use two long-lived internal levels of individual ions held in electromagnetic traps."
    },
    {
      id: "hwti-2",
      question:
        "What is a notable *advantage* of trapped-ion qubits?",
      choices: [
        "They require no vacuum systems.",
        "They have very long coherence times and high-fidelity gates.",
        "They operate at very high temperatures.",
        "They are inherently classical."
      ],
      answerIndex: 1,
      explanation:
        "Trapped ions can have coherence times of seconds or more and support high-fidelity gates, though they are slower than superconducting qubits."
    },
    {
      id: "hwti-3",
      question:
        "A challenge for trapped-ion architectures is:",
      choices: [
        "Generating laser light at all.",
        "Individual addressing and scaling long ion chains while keeping gate quality high.",
        "Cooling ions to any low temperature.",
        "Measuring ions at all."
      ],
      answerIndex: 1,
      explanation:
        "As chains grow, controlling and coupling ions while maintaining gate quality and speed becomes challenging."
    }
  ],

  "nisq-era": [
    {
      id: "nisq-1",
      question:
        "What does NISQ stand for?",
      choices: [
        "Near-Intermediate Superconducting Qubits",
        "Noisy Intermediate-Scale Quantum",
        "Non-Ideal Superconducting Quantum",
        "Numerically Integrated Super Quantum"
      ],
      answerIndex: 1,
      explanation:
        "NISQ = Noisy Intermediate-Scale Quantum: tens–thousands of noisy qubits without full error correction."
    },
    {
      id: "nisq-2",
      question:
        "Which type of algorithms are currently realistic on NISQ devices?",
      choices: [
        "Fully fault-tolerant Shor factoring for 4096-bit RSA.",
        "Very deep circuits with millions of gates.",
        "Variational/hybrid algorithms with relatively shallow circuits.",
        "Only classical algorithms emulated on hardware."
      ],
      answerIndex: 2,
      explanation:
        "Noise limits circuit depth, so hybrid variational algorithms (VQE, QAOA, etc.) are the main NISQ-era approaches."
    },
    {
      id: "nisq-3",
      question:
        "Why is demonstrating a *practical* quantum advantage on NISQ devices challenging?",
      choices: [
        "Because classical computers are no longer improving.",
        "Because NISQ devices cannot run any quantum algorithms.",
        "Because noise and limited qubit counts make it hard to outperform optimized classical heuristics on real-world tasks.",
        "Because quantum algorithms do not use superposition."
      ],
      answerIndex: 2,
      explanation:
        "Even if a quantum circuit exists, noise and size limits can erase the theoretical advantage for practical problem sizes."
    }
  ],

  "quantum-sdks": [
    {
      id: "sdks-1",
      question:
        "Which of the following is an example of a quantum SDK?",
      choices: ["TensorFlow", "Qiskit", "Docker", "Kubernetes"],
      answerIndex: 1,
      explanation:
        "Qiskit, Cirq, Braket SDKs, etc., provide tools for building and running quantum circuits."
    },
    {
      id: "sdks-2",
      question:
        "What is a common workflow when using a quantum SDK?",
      choices: [
        "Write a circuit, transpile/compile it for a backend, then run on a simulator or real device.",
        "Write assembly by hand and send it directly to hardware.",
        "Only use graphical circuit editors.",
        "Directly manipulate analog control pulses."
      ],
      answerIndex: 0,
      explanation:
        "Typically you define circuits at a high level, let the SDK transpile them, and then submit jobs to simulators or hardware."
    },
    {
      id: "sdks-3",
      question:
        "Why do SDKs provide both simulators and hardware backends?",
      choices: [
        "Because hardware is always slower than simulation.",
        "Because simulators are needed for debugging and exploration before running on limited, noisy hardware.",
        "Because hardware cannot run any circuits.",
        "Because simulators are required for error correction."
      ],
      answerIndex: 1,
      explanation:
        "Developers prototype and test circuits on simulators first, then use hardware when needed despite queue times and noise."
    }
  ],

  "first-qiskit-circuit": [
    {
      id: "fq-1",
      question:
        "In Qiskit, what does the line `qc.measure(q, c)` conceptually do?",
      choices: [
        "Applies a Hadamard gate.",
        "Allocates a new qubit.",
        "Measures qubit register q into classical register c.",
        "Deletes the qubit."
      ],
      answerIndex: 2,
      explanation:
        "The `measure` instruction maps quantum measurement outcomes into classical bits."
    },
    {
      id: "fq-2",
      question:
        "Why is it often helpful to draw or visualize your circuit before running it?",
      choices: [
        "Because visual circuits run faster.",
        "To check gate ordering, entangling structure, and confirm that the circuit matches the intended algorithm.",
        "Because Qiskit requires a diagram for execution.",
        "To avoid using classical control."
      ],
      answerIndex: 1,
      explanation:
        "Visualization makes it easier to spot missing gates, wrong control/target choices, or unnecessary depth."
    },
    {
      id: "fq-3",
      question:
        "What is the main difference between running on a Qiskit simulator backend vs a real device backend?",
      choices: [
        "Simulators cannot run multi-qubit circuits.",
        "Simulators are noiseless (or configurable noise) and run on classical hardware; real devices are noisy but physically quantum.",
        "Real devices return exact amplitudes while simulators only return measurement samples.",
        "There is no difference."
      ],
      answerIndex: 1,
      explanation:
        "Simulators emulate the ideal (or modelled) quantum evolution on classical hardware; devices run on actual qubits and include real noise."
    }
  ],

  "variational-algorithms": [
    {
      id: "var-1",
      question:
        "What is the key idea behind a variational quantum algorithm?",
      choices: [
        "Use only classical optimization.",
        "Use a parameterized quantum circuit and a classical optimizer that updates parameters based on measured costs.",
        "Avoid any measurements until the end.",
        "Run infinitely deep circuits."
      ],
      answerIndex: 1,
      explanation:
        "Variational algorithms form a hybrid loop: quantum hardware evaluates a cost function; a classical optimizer updates the parameters."
    },
    {
      id: "var-2",
      question:
        "Why are shallow, parameterized circuits attractive for NISQ hardware?",
      choices: [
        "Because shallow circuits are impossible to simulate classically.",
        "Because they require no calibration.",
        "Because they reduce the total error accumulated before measurement.",
        "Because they never entangle qubits."
      ],
      answerIndex: 2,
      explanation:
        "Shorter depth means less time for decoherence and gate errors to accumulate."
    },
    {
      id: "var-3",
      question:
        "Which challenge can arise when training variational circuits?",
      choices: [
        "Too many exact analytical gradients.",
        "Barren plateaus where gradients become exponentially small.",
        "Deterministic oscillations in accuracy.",
        "Inability to run on simulators."
      ],
      answerIndex: 1,
      explanation:
        "For some architectures, gradients vanish exponentially with system size, making optimization difficult (barren plateaus)."
    }
  ],

  "quantum-ml-overview": [
    {
      id: "qml-1",
      question:
        "Which description best matches current quantum machine learning research?",
      choices: [
        "Drop-in replacements that are always better than classical ML.",
        "Exploration of where quantum subroutines might offer speedups or better inductive biases for specific tasks.",
        "Mature industry-ready models used everywhere.",
        "Purely classical algorithms with a quantum brand name."
      ],
      answerIndex: 1,
      explanation:
        "Most work is exploratory: identifying tasks and settings where quantum methods may eventually outperform or complement classical ML."
    },
    {
      id: "qml-2",
      question:
        "What is a common pattern for QML models on NISQ devices?",
      choices: [
        "Deep neural networks with billions of parameters.",
        "Variational quantum circuits embedded inside classical ML pipelines.",
        "Purely classical networks with no quantum part.",
        "Only Grover-based models."
      ],
      answerIndex: 1,
      explanation:
        "Hybrid models use parameterized quantum circuits as layers or kernels inside classical ML frameworks."
    },
    {
      id: "qml-3",
      question:
        "Why is benchmarking QML models against classical baselines essential?",
      choices: [
        "Because quantum models cannot be trained otherwise.",
        "To check whether any quantum advantage exists beyond hype or noise-induced artifacts.",
        "Because classical models require quantum references.",
        "To avoid overfitting."
      ],
      answerIndex: 1,
      explanation:
        "We need solid comparisons to determine if quantum approaches actually help on given tasks and datasets."
    }
  ],

  "quantum-communication": [
    {
      id: "qcomm-1",
      question:
        "What is a key resource enabling quantum key distribution (e.g., BB84)?",
      choices: [
        "Faster classical encryption algorithms.",
        "Noisy classical channels.",
        "Quantum states that cannot be copied perfectly (no-cloning).",
        "Large classical databases."
      ],
      answerIndex: 2,
      explanation:
        "No-cloning means eavesdropping inevitably disturbs the states, allowing detection."
    },
    {
      id: "qcomm-2",
      question:
        "In entanglement-based QKD, why do Alice and Bob compare a subset of their measurement results publicly?",
      choices: [
        "To generate the key directly from those results.",
        "To check for error rates indicative of eavesdropping.",
        "To calibrate their clocks.",
        "To send classical messages."
      ],
      answerIndex: 1,
      explanation:
        "If an eavesdropper interacts with the entangled pairs, error rates increase; sampling detects this."
    },
    {
      id: "qcomm-3",
      question:
        "Which statement about quantum teleportation is true?",
      choices: [
        "It moves matter faster than light.",
        "It sends a copy of the state without destroying the original.",
        "It uses shared entanglement and classical communication to transfer an unknown quantum state.",
        "It only works for classical bits."
      ],
      answerIndex: 2,
      explanation:
        "Teleportation consumes entanglement plus classical bits to recreate an unknown state at a remote location while destroying the original."
    }
  ],

  "quantum-crypto-post-quantum": [
    {
      id: "qcpost-1",
      question:
        "Why are today’s widely used public-key schemes (RSA, ECC) considered vulnerable to future quantum computers?",
      choices: [
        "Because they rely on symmetric keys.",
        "Because Shor’s algorithm can efficiently solve the underlying number-theoretic problems.",
        "Because Grover’s algorithm breaks them instantly.",
        "Because they use too short passwords."
      ],
      answerIndex: 1,
      explanation:
        "Shor’s algorithm can factor integers and compute discrete logs in polynomial time, undermining RSA and ECC."
    },
    {
      id: "qcpost-2",
      question:
        "What is the goal of post-quantum (quantum-safe) cryptography?",
      choices: [
        "Building cryptosystems that run on quantum hardware only.",
        "Designing protocols that are provably insecure.",
        "Designing *classical* schemes believed to resist attacks from both classical and quantum adversaries.",
        "Encrypting only quantum data."
      ],
      answerIndex: 2,
      explanation:
        "Post-quantum schemes remain classical but should withstand quantum attacks."
    },
    {
      id: "qcpost-3",
      question:
        "Which family of schemes is a major candidate for post-quantum cryptography?",
      choices: [
        "Factorization-based schemes.",
        "Lattice-based schemes.",
        "Purely symmetric-key schemes.",
        "Hash-only schemes with tiny keys."
      ],
      answerIndex: 1,
      explanation:
        "Lattice-based schemes (e.g., based on LWE) are leading PQC candidates and are being standardized."
    }
  ],

  "where-to-go-next": [
    {
      id: "next-1",
      question:
        "If you want to deepen your understanding after this course, which combination makes most sense?",
      choices: [
        "Ignore math and only read marketing blogs.",
        "Study linear algebra, probability, and then dive into a standard quantum computing textbook or online course.",
        "Learn only hardware details and skip algorithms.",
        "Focus exclusively on classical web development."
      ],
      answerIndex: 1,
      explanation:
        "A solid math base (linear algebra, probability) plus a good QC textbook or MOOC is the natural next step."
    },
    {
      id: "next-2",
      question:
        "What is a realistic short-term goal for someone at your stage?",
      choices: [
        "Prove quantum complexity theory results immediately.",
        "Implement small algorithms (Grover, phase estimation variants) on simulators and maybe cloud hardware.",
        "Build a fault-tolerant quantum computer alone.",
        "Replace all classical services with quantum ones."
      ],
      answerIndex: 1,
      explanation:
        "Running small circuits and experiments is an achievable next step that builds intuition."
    },
    {
      id: "next-3",
      question:
        "Why is it useful to follow both academic papers and industry roadmaps?",
      choices: [
        "Because roadmaps always ignore hardware constraints.",
        "Because papers never influence practice.",
        "Because together they show both the theoretical frontier and what is becoming practical on real devices.",
        "Because both are required to run code."
      ],
      answerIndex: 2,
      explanation:
        "Papers show what might be possible; hardware/industry roadmaps show what is likely to become usable in the near term."
    }
  ]
};
