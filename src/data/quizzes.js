// src/data/quizzes.js
// Hard-mode quizzes for QuantumOS

import { lessons } from "./lessons";

/**
 * Shape of each question:
 * {
 *   question: string,
 *   choices: string[4],
 *   correctIndex: 0|1|2|3,
 *   explanationsByChoice?: string[4]
 * }
 */

export const quizzesBySlug = {
  // --------------------------------------------------
  // Lesson 1 – Bit vs Qubit  (slug: "bit-vs-qubit")
  // --------------------------------------------------
  "bit-vs-qubit": [
    {
      question:
        "In the lesson, a classical bit is compared with a qubit in terms of possible states. Which statement best captures the key difference?",
      choices: [
        "A bit can be 0 or 1, while a qubit can only be 0, 1, or exactly 50% of each.",
        "A bit can be 0 or 1, while a qubit can be in a complex superposition α|0⟩ + β|1⟩ with |α|² + |β|² = 1.",
        "A bit can be 0 or 1, while a qubit is always exactly halfway between 0 and 1 until measured.",
        "A bit can be 0 or 1, while a qubit rapidly switches between 0 and 1 over time."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "Superposition isn’t limited to a 50/50 mix. The amplitudes can be any complex numbers satisfying |α|² + |β|² = 1.",
        "Correct. A qubit’s state is a complex superposition α|0⟩ + β|1⟩ with total probability 1, which is richer than just '0 or 1'.",
        "The qubit isn’t forced to be 'halfway' – that’s just one special case (like |+⟩).",
        "Rapid switching is a classical animation picture, not how qubits are defined in the lesson."
      ]
    },
    {
      question:
        "According to the lesson, why does the Bloch sphere picture *not* exist for classical bits?",
      choices: [
        "Because classical bits do not allow probabilistic behavior of any kind.",
        "Because classical bits do not support continuous rotations between valid pure states.",
        "Because classical bits cannot be stored in physical devices.",
        "Because classical bits always have negative probabilities."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "Classical bits *can* represent probabilities (e.g., a biased coin), but that’s a probability distribution over discrete states, not a geometric space of pure states.",
        "Correct. Qubits have a continuum of pure states that can be reached by rotations on the Bloch sphere. Classical bits only have two pure states (0 and 1) and no continuous family between them.",
        "The lesson explicitly assumes bits *are* stored physically (transistors, charges, etc.).",
        "Nothing in the lesson implies negative probabilities for classical bits."
      ]
    },
    {
      question:
        "The lesson emphasizes that measurement of a qubit in the computational basis gives a classical result. Which description matches this behavior most accurately?",
      choices: [
        "Measurement reveals which pure superposition the qubit is in without disturbing it.",
        "Measurement randomly collapses the state to |0⟩ or |1⟩ with probabilities given by |α|² and |β|².",
        "Measurement deterministically forces the qubit into |0⟩ regardless of its initial state.",
        "Measurement gradually nudges the qubit toward |0⟩ or |1⟩ over many repeated weak measurements, never fully collapsing."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "In the lesson’s model, a projective measurement *does* disturb the state; it doesn’t just 'reveal' it.",
        "Correct. The lesson defines computational-basis measurement as a probabilistic collapse with probabilities |α|² and |β|².",
        "There’s no basis in the lesson for 'always to |0⟩'; the outcome depends on the amplitudes.",
        "Weak measurement isn’t the basic model used in this introductory lesson."
      ]
    }
  ],

  // --------------------------------------------------
  // Lesson 2 – Superposition (slug: "superposition")
  // --------------------------------------------------
  superposition: [
    {
      question:
        "The lesson uses the state |+⟩ = (|0⟩ + |1⟩)/√2 as a canonical example. Why is |+⟩ considered a *balanced* superposition in the computational basis?",
      choices: [
        "Because its global phase is 0, which makes it balanced.",
        "Because the amplitudes of |0⟩ and |1⟩ have equal magnitude, giving equal probabilities 1/2.",
        "Because it is the only state that is an eigenstate of both X and Z simultaneously.",
        "Because it can be written only with real numbers, unlike general qubit states."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "Global phase doesn’t affect probabilities and isn’t the definition of 'balanced' here.",
        "Correct. In the lesson, 'balanced' means the measurement probabilities for |0⟩ and |1⟩ are equal; |+⟩ has |α|² = |β|² = 1/2.",
        "No single-qubit state is an eigenstate of both X and Z with nontrivial eigenvalues.",
        "Many non-balanced states also have real amplitudes; real vs complex isn’t the definition."
      ]
    },
    {
      question:
        "Suppose a qubit is prepared in a superposition α|0⟩ + β|1⟩ with |α|² = 0.9 and |β|² = 0.1, as discussed in the lesson. Which statement best matches the lesson’s interpretation?",
      choices: [
        "The qubit spends 90% of its time as |0⟩ and 10% as |1⟩ before measurement.",
        "Measurement outcomes are 90% likely to be 0 and 10% likely to be 1, but the state itself is not literally switching between |0⟩ and |1⟩.",
        "The qubit is 90% |0⟩ and 10% |1⟩ in the sense that it contains 90% of one electron and 10% of another.",
        "The superposition is actually a classical lottery ticket: either |0⟩ or |1⟩ is chosen once at preparation time and kept hidden until measurement."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "The lesson avoids the 'spends time as' picture; that’s a classical intuition, not the formal description.",
        "Correct. Probabilities refer to measurement outcomes, not the qubit 'jumping around' between classical states.",
        "The lesson does not define superposition in terms of 'partial electrons' or literal fractions of particles.",
        "A hidden classical lottery would be a 'hidden-variable' interpretation, which the lesson contrasts with genuine quantum superposition."
      ]
    },
    {
      question:
        "According to the lesson, why is it misleading to say that superposition means a qubit is 'both 0 and 1 at the same time' in a purely classical sense?",
      choices: [
        "Because superposition never allows the outcome 1 to be observed.",
        "Because the phrase ignores the role of complex phases and interference between amplitudes.",
        "Because superposition only exists for multi-qubit systems, not a single qubit.",
        "Because the lesson defines superposition purely as classical randomness over 0 and 1."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "The lesson definitely allows 1 to be observed with nonzero probability.",
        "Correct. The lesson stresses that phases cause interference in later gates and measurements; 'both at once' without phases misses the essential structure.",
        "A single qubit can absolutely be in superposition; multi-qubit comes later.",
        "The lesson explicitly distinguishes superposition from classical randomness."
      ]
    }
  ],

  // --------------------------------------------------
  // Lesson 3 – Measurement (slug: "measurement")
  // --------------------------------------------------
  measurement: [
    {
      question:
        "The lesson explains that measurement is basis-dependent. What does it mean to 'measure in the X-basis' for a single qubit?",
      choices: [
        "You first apply an H gate, measure in the computational (Z) basis, and interpret outcomes as |+⟩ or |−⟩.",
        "You project directly onto |0⟩ and |1⟩ without any gates.",
        "You apply a Z gate, then measure in the computational basis.",
        "You measure twice in a row: once in Z and once in X, and multiply the results."
      ],
      correctIndex: 0,
      explanationsByChoice: [
        "Correct. The lesson notes that X-basis measurement can be implemented by rotating into that basis (with H) then using the standard Z-basis measurement.",
        "That’s just Z-basis measurement, not X-basis.",
        "Z before measuring still corresponds to Z-basis measurement; it just flips phases/signs.",
        "Sequential incompatible measurements aren’t how 'X-basis' is defined in the lesson."
      ]
    },
    {
      question:
        "In the lesson’s description, what happens to a qubit state immediately *after* a projective measurement in the computational (Z) basis?",
      choices: [
        "It collapses to either |0⟩ or |1⟩, matching the observed outcome, and stays there (until further evolution).",
        "It stays in the original superposition, but we now simply 'know' whether it is 0 or 1.",
        "It always becomes |+⟩, regardless of the outcome.",
        "It becomes a classical bit and can no longer be affected by quantum gates."
      ],
      correctIndex: 0,
      explanationsByChoice: [
        "Correct. The lesson uses the standard projective post-measurement rule: the state becomes the eigenvector corresponding to the outcome.",
        "The act of measurement changes the state; it doesn’t leave the superposition untouched.",
        "There is no reason for it to become |+⟩; that’s an X-basis eigenstate.",
        "The lesson still allows further quantum evolution after measurement (e.g., re-preparing, applying gates)."
      ]
    },
    {
      question:
        "The lesson contrasts single-shot measurement with 'many runs of the same circuit'. What is the purpose of repeating the same experiment many times?",
      choices: [
        "To deterministically force the qubit into the more likely outcome over time.",
        "To estimate the underlying Born-rule probabilities |α|² and |β|² from relative frequencies.",
        "To gradually erase the global phase from the state.",
        "To prevent decoherence by constant observation."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "Each shot is still random; repetition doesn’t force a particular outcome in any single run.",
        "Correct. The lesson explains that repeating the experiment lets us estimate probabilities from statistics.",
        "Global phase is unobservable; repetition doesn’t 'erase' it in this sense.",
        "The lesson does not claim that frequent measurement suppresses decoherence this way."
      ]
    }
  ],

  // --------------------------------------------------
  // Lesson 4 – The Bloch Sphere (slug: "bloch-sphere")
  // --------------------------------------------------
  "bloch-sphere": [
    {
      question:
        "On the Bloch sphere, pure qubit states are represented as points on the surface. What does a point on the *north pole* correspond to in the lesson’s convention?",
      choices: [
        "The state |1⟩.",
        "The maximally mixed state (I/2).",
        "The state |0⟩.",
        "The state (|0⟩ + |1⟩)/√2."
      ],
      correctIndex: 2,
      explanationsByChoice: [
        "In the standard convention used in the lesson, |1⟩ is the *south* pole.",
        "Mixed states live *inside* the sphere, not on the surface.",
        "Correct. The lesson uses |0⟩ as the north pole and |1⟩ as the south pole.",
        "This is a point on the equator, not a pole."
      ]
    },
    {
      question:
        "According to the lesson, what is the geometric meaning of applying a single-qubit unitary such as X, Y, or Z on the Bloch sphere?",
      choices: [
        "It translates the Bloch vector to a different radius.",
        "It reflects the Bloch vector across the equatorial plane only.",
        "It rotates the Bloch vector around some axis by a fixed angle.",
        "It scales the Bloch vector by a factor less than 1, moving it inward."
      ],
      correctIndex: 2,
      explanationsByChoice: [
        "Unitary gates preserve the radius (pure states stay on the surface).",
        "Some gates could look like reflections for special states, but the general description is rotation around an axis.",
        "Correct. The lesson presents single-qubit unitaries as rotations of the Bloch vector on the sphere.",
        "Scaling inward would correspond to decoherence or mixing, which isn’t unitary."
      ]
    },
    {
      question:
        "The lesson explains that global phase does not change the point on the Bloch sphere. Why is this true?",
      choices: [
        "Because global phase always has magnitude 1 and cancels out in the density matrix |ψ⟩⟨ψ|.",
        "Because global phase is always 0 for qubits.",
        "Because the Bloch sphere only represents mixed states.",
        "Because the Pauli matrices commute with global phase."
      ],
      correctIndex: 0,
      explanationsByChoice: [
        "Correct. Multiplying |ψ⟩ by e^{iφ} leaves |ψ⟩⟨ψ| unchanged, so the Bloch vector is unaffected.",
        "Global phase can be any angle; it’s not restricted to 0.",
        "The Bloch sphere (surface) represents *pure* states; mixed states live inside.",
        "Pauli matrices don’t 'commute with phase' in a way that explains this; the key is how states are represented up to global phase."
      ]
    }
  ],

  // --------------------------------------------------
  // Lesson 5 – Single-Qubit Gates (slug: "single-qubit-gates")
  // --------------------------------------------------
  "single-qubit-gates": [
    {
      question:
        "In the lesson, the X gate is described as a 'quantum NOT'. What does this operation correspond to on the Bloch sphere?",
      choices: [
        "A rotation by π around the X-axis.",
        "A rotation by π around the Z-axis.",
        "A rotation by π around the Y-axis (taking |0⟩ to |1⟩ and vice versa).",
        "A translation moving the north pole to the equator."
      ],
      correctIndex: 2,
      explanationsByChoice: [
        "A π rotation around X leaves |+⟩ and |−⟩ fixed; it doesn’t swap |0⟩ and |1⟩.",
        "A π rotation around Z adds a phase between |0⟩ and |1⟩ but doesn’t exchange them.",
        "Correct. In Bloch-sphere language, X is a π rotation around the X-axis, which effectively swaps |0⟩ and |1⟩; the lesson ties this to the NOT analogy.",
        "Unitary gates don’t do translations or change the radius; they do rotations."
      ]
    },
    {
      question:
        "The lesson introduces the H (Hadamard) gate as mapping basis states to superpositions. Which mapping best matches the lesson’s definition?",
      choices: [
        "H|0⟩ = |0⟩, H|1⟩ = |1⟩.",
        "H|0⟩ = (|0⟩ + |1⟩)/√2, H|1⟩ = (|0⟩ − |1⟩)/√2.",
        "H|0⟩ = (|0⟩ − |1⟩)/√2, H|1⟩ = (|0⟩ + |1⟩)/√2.",
        "H|0⟩ = |+⟩, H|1⟩ = |+⟩."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "That would be the identity gate, not H.",
        "Correct. This is the standard definition used in the lesson; H maps Z-basis states to X-basis states.",
        "This swaps the roles of |+⟩ and |−⟩ compared to the usual convention.",
        "Both outputs can’t be the same nonzero state; that wouldn’t be unitary."
      ]
    },
    {
      question:
        "According to the lesson, why is it important that single-qubit gates are **unitary**?",
      choices: [
        "Because unitarity ensures that the gate can create entanglement between qubits.",
        "Because unitarity guarantees that measurement outcomes become deterministic.",
        "Because unitarity preserves the total probability (norm) of the state.",
        "Because unitarity ensures that global phase is always zero."
      ],
      correctIndex: 2,
      explanationsByChoice: [
        "Entanglement involves multi-qubit unitaries; single-qubit gates themselves don’t create entanglement from product states.",
        "Measurements are still probabilistic after unitary evolution.",
        "Correct. The lesson stresses that quantum evolution between measurements should preserve normalization, which is exactly what unitarity guarantees.",
        "Global phase can still be nonzero; unitarity doesn’t force it to vanish."
      ]
    }
  ],

  // --------------------------------------------------
  // Lesson 6 – Entanglement (slug: "entanglement")
  // --------------------------------------------------
  entanglement: [
    {
      question:
        "The lesson introduces the Bell state (|00⟩ + |11⟩)/√2. Why is this state considered entangled?",
      choices: [
        "Because each qubit individually is always in state |0⟩.",
        "Because the joint state cannot be written as |ψ⟩⊗|φ⟩ for any single-qubit states |ψ⟩ and |φ⟩.",
        "Because measuring one qubit instantly forces the other into |+⟩.",
        "Because it is a probabilistic mixture of |00⟩ and |11⟩."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "The reduced state of each qubit is actually maximally mixed, not always |0⟩.",
        "Correct. The key definition from the lesson is that entangled states are not tensor products of single-qubit states.",
        "Measurement correlates outcomes, but not specifically to |+⟩.",
        "A classical mixture would be 50% |00⟩, 50% |11⟩ with no phase coherence; the Bell state is a coherent superposition."
      ]
    },
    {
      question:
        "According to the lesson, what happens if you measure the first qubit of the Bell state (|00⟩ + |11⟩)/√2 in the computational basis and obtain 0?",
      choices: [
        "The second qubit becomes |0⟩ with certainty.",
        "The second qubit becomes |1⟩ with probability 1/2 and |0⟩ with probability 1/2.",
        "The second qubit becomes |+⟩.",
        "The second qubit remains entangled with the first until you also measure it."
      ],
      correctIndex: 0,
      explanationsByChoice: [
        "Correct. Conditioning on the first outcome being 0 collapses the joint state to |00⟩, so the second qubit is |0⟩.",
        "Once the first outcome is known, the second qubit is fixed (for this state).",
        "There’s no X-basis measurement here; the second qubit is in |0⟩.",
        "After the first projective measurement and conditioning on the outcome, the post-measurement state is a product state."
      ]
    },
    {
      question:
        "The lesson stresses that entanglement is *not* just classical correlation. Which feature best captures this distinction?",
      choices: [
        "Entangled states always give perfectly matching outcomes for all possible measurements.",
        "Entangled states allow correlations that cannot be reproduced by any classical shared randomness model.",
        "Entangled states only show correlations when you measure in the computational basis.",
        "Entangled states always violate energy conservation."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "Not all entangled states give perfect correlations for every measurement choice.",
        "Correct. The lesson hints at Bell-inequality-type reasoning: quantum correlations can’t be mimicked by classical shared randomness.",
        "Entanglement can manifest in many different measurement bases.",
        "Energy conservation isn’t the defining feature of entanglement here."
      ]
    }
  ],

  // --------------------------------------------------
  // Lesson 7 – Interference (slug: "interference")
  // --------------------------------------------------
  interference: [
    {
      question:
        "In the lesson’s interferometer analogy, why does adding a relative phase of π between two paths sometimes *eliminate* the probability of a particular outcome?",
      choices: [
        "Because a phase of π always forces the system into state |1⟩.",
        "Because amplitudes from different paths can add destructively when they have opposite phases.",
        "Because a phase of π reduces the total probability of the state to zero.",
        "Because the detector ignores any path that has a nonzero phase."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "The final state depends on the full circuit; phase π does not always produce |1⟩.",
        "Correct. The lesson illustrates that interference comes from adding complex amplitudes; opposite signs can cancel.",
        "Probabilities are normalized; you can’t get total probability zero.",
        "Detectors measure probabilities; they don’t 'ignore phase'. Phase influences interference, not direct detection rules."
      ]
    },
    {
      question:
        "According to the lesson, what is the key difference between classical and quantum interference in this context?",
      choices: [
        "Classical interference requires three or more paths, while quantum needs exactly two.",
        "Classical interference adds probabilities, while quantum interference adds complex amplitudes before squaring.",
        "Classical interference only occurs for particles, not waves.",
        "Quantum interference never produces constructive effects, only destructive ones."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "Path count isn’t the essential distinction in the lesson.",
        "Correct. The lesson explains that quantum interference arises from adding amplitudes (including phases) and then squaring to get probabilities.",
        "Classical wave interference is a wave phenomenon; the lesson uses it as an analogy.",
        "Quantum interference can be both constructive and destructive, depending on phase relationships."
      ]
    },
    {
      question:
        "The lesson applies H–phase–H to a single qubit to demonstrate interference. If you apply H, then a Z gate, then H again to |0⟩, what outcome does the lesson highlight?",
      choices: [
        "You always get |0⟩ at the end.",
        "You always get |1⟩ at the end.",
        "You get a 50/50 chance of |0⟩ or |1⟩.",
        "The state becomes (|0⟩ + i|1⟩)/√2."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "H–Z–H on |0⟩ actually maps |0⟩ to |1⟩, not back to |0⟩.",
        "Correct. The lesson shows that introducing a relative phase (with Z) and then interfering again (with H) can flip the outcome deterministically.",
        "That’s the behavior of H alone, not H–Z–H.",
        "This is not the final state for the specific sequence used in the lesson."
      ]
    }
  ],

  // --------------------------------------------------
  // Lesson 8 – Multi-Qubit Circuits (slug: "multi-qubit-circuits")
  // --------------------------------------------------
  "multi-qubit-circuits": [
    {
      question:
        "The lesson describes how multi-qubit states live in a larger Hilbert space. For two qubits, how many computational-basis states are there?",
      choices: ["2", "3", "4", "8"],
      correctIndex: 2,
      explanationsByChoice: [
        "That’s the number of states for one qubit.",
        "There’s no reason for 3; basis states are powers of 2.",
        "Correct. Two qubits have 2² = 4 basis states: |00⟩, |01⟩, |10⟩, |11⟩.",
        "That’s the number of basis states for three qubits."
      ]
    },
    {
      question:
        "According to the lesson, why is it *not* sufficient to think of a 2-qubit state as 'two independent single-qubit Bloch vectors'?",
      choices: [
        "Because each qubit loses its Bloch representation once you add a second qubit.",
        "Because the full 2-qubit state can include entanglement, which has no description as independent single-qubit states.",
        "Because 2-qubit systems have only classical states, not quantum ones.",
        "Because the Bloch sphere only works for three or more qubits."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "Each qubit still has a valid reduced Bloch vector; that’s not the issue.",
        "Correct. The lesson emphasizes that entangled states require the full tensor-product description, not just 'two separate spheres'.",
        "Two-qubit systems are fully quantum and can be entangled.",
        "The Bloch sphere is specifically for one qubit; more qubits require higher-dimensional geometry."
      ]
    },
    {
      question:
        "The lesson shows circuits with controlled gates (like CNOT). What is the effect of a CNOT with control on qubit 0 and target on qubit 1, when applied to |10⟩?",
      choices: [
        "It leaves the state |10⟩ unchanged.",
        "It flips the first qubit, giving |00⟩.",
        "It flips the second qubit (because control is 1), giving |11⟩.",
        "It creates an equal superposition of |10⟩ and |11⟩."
      ],
      correctIndex: 2,
      explanationsByChoice: [
        "The target flips when the control is |1⟩.",
        "CNOT doesn’t flip the control qubit; it flips the target.",
        "Correct. With control qubit = 1, the target is flipped from 0 to 1, producing |11⟩.",
        "CNOT on a basis state doesn’t create a superposition; the input must already be in superposition."
      ]
    }
  ],

  // --------------------------------------------------
  // Lesson 9 – Deutsch’s Algorithm (slug: "deutsch-algorithm")
  // --------------------------------------------------
  "deutsch-algorithm": [
    {
      question:
        "In the lesson’s version of Deutsch’s algorithm, what property of a 1-bit function f(x) does the algorithm determine with a *single* query?",
      choices: [
        "Whether f(0) = 0.",
        "Whether f(1) = 1.",
        "Whether f is constant (f(0) = f(1)) or balanced (f(0) ≠ f(1)).",
        "The exact values of both f(0) and f(1)."
      ],
      correctIndex: 2,
      explanationsByChoice: [
        "The algorithm tells more than just f(0).",
        "It doesn’t only test f(1); it distinguishes two classes.",
        "Correct. Deutsch’s algorithm distinguishes constant vs balanced functions with one query.",
        "That would require, in general, two classical queries; Deutsch’s algorithm only determines the parity (constant vs balanced)."
      ]
    },
    {
      question:
        "According to the lesson, why is interference crucial for Deutsch’s algorithm?",
      choices: [
        "Because interference allows the oracle to be implemented without any gates.",
        "Because interference lets different computational paths for x = 0 and x = 1 combine so that the final measurement reveals f(0) ⊕ f(1).",
        "Because interference guarantees that measurement is deterministic for all possible oracles.",
        "Because interference replaces the need for preparing superposition states."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "The oracle is still a gate; interference is about how amplitudes combine after the oracle.",
        "Correct. The lesson highlights that the relative phase introduced by the oracle causes constructive or destructive interference in the final state, encoding f(0) ⊕ f(1).",
        "For some oracles, the outcome might still be probabilistic if you change the circuit; determinism is tied to the specific algorithm design.",
        "Interference works *because* we prepared superpositions; it doesn’t replace them."
      ]
    },
    {
      question:
        "The lesson constructs a specific input state before applying the oracle U_f. What is special about this input |ψ_in⟩ for Deutsch’s algorithm?",
      choices: [
        "It ensures that the second qubit is always measured as 1, regardless of f.",
        "It prepares the first qubit in a balanced superposition of |0⟩ and |1⟩, and the second in a state that turns f(x) into a phase kickback.",
        "It makes both qubits maximally entangled before the oracle is applied.",
        "It encodes the classical truth table of f in the amplitudes before the oracle is even used."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "The second qubit isn’t always measured; it’s often not even measured at the end.",
        "Correct. The lesson explains that the special |−⟩ preparation on the second qubit lets the oracle imprint f(x) as a phase on the first qubit via phase kickback.",
        "Entanglement can arise, but the key property is phase kickback, not pre-existing maximal entanglement.",
        "The truth table isn’t known beforehand; the oracle is the only source of information about f."
      ]
    }
  ],

  // --------------------------------------------------
  // Lesson 10 – Quantum vs Classical Thinking
  // (slug: "quantum-vs-classical-thinking")
  // --------------------------------------------------
  "quantum-vs-classical-thinking": [
    {
      question:
        "The lesson contrasts classical 'state tracking' with quantum amplitude evolution. Which mindset does it encourage for reasoning about quantum circuits?",
      choices: [
        "Track individual particles moving along definite trajectories and assign probabilities at the very end.",
        "Track complex amplitudes for basis states through each gate, and derive probabilities from their squared magnitudes at measurement.",
        "Treat every quantum gate as a classical logic gate with unknown noise.",
        "Ignore the intermediate states and only think about the final measurement rule."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "This is a classical picture; the lesson moves away from definite trajectories.",
        "Correct. The lesson encourages thinking in terms of amplitude evolution (vectors and matrices) rather than classical state trajectories.",
        "Quantum gates aren’t just noisy classical gates; they are unitary operations on amplitudes.",
        "Understanding intermediate amplitude transformations is exactly what the lesson wants you to practice."
      ]
    },
    {
      question:
        "According to the lesson, why can purely classical intuition be dangerous when reasoning about superposition and entanglement?",
      choices: [
        "Because classical intuition always underestimates how many qubits a real device can have.",
        "Because classical intuition tends to replace superposition with hidden classical randomness, missing interference and non-classical correlations.",
        "Because classical intuition forbids the use of complex numbers.",
        "Because classical intuition assumes measurement is impossible."
      ],
      correctIndex: 1,
      explanationsByChoice: [
        "Qubit count isn’t the main conceptual pitfall here.",
        "Correct. The lesson warns that thinking in terms of 'unknown classical states' hides phase and entanglement effects, which are crucial.",
        "Classical physics often uses complex numbers; that’s not the core issue.",
        "Classical models certainly allow measurement; the problem is how they model uncertainty and correlation."
      ]
    },
    {
      question:
        "The lesson suggests a 'quantum-native' way to think about algorithms like Deutsch’s or the Bell test. What is a key feature of this perspective?",
      choices: [
        "Focusing on how the algorithm would behave if all qubits were replaced by classical bits.",
        "Focusing on how gates transform probability distributions over classical truth tables.",
        "Focusing on how gates transform vectors of complex amplitudes and how interference patterns encode the answer.",
        "Focusing purely on hardware implementation details like gate voltage and chip layout."
      ],
      correctIndex: 2,
      explanationsByChoice: [
        "That’s more of a sanity check; the lesson wants you to lean into the quantum description, not replace it.",
        "Probability distributions alone don’t capture phase and interference.",
        "Correct. The lesson emphasizes amplitude-level reasoning and interference as the core of a quantum-native mindset.",
        "Engineering details matter, but the conceptual framework for algorithms is about state vectors and unitaries."
      ]
    }
  ]
};

// Map numeric lesson id -> slug using the lesson metadata
const slugById = {};
for (const lesson of lessons) {
  if (lesson.id != null && lesson.slug) {
    slugById[lesson.id] = lesson.slug;
  }
}

/**
 * Helper used by the quiz page.
 * It now accepts EITHER:
 *   - a numeric id (1..50), OR
 *   - a slug string like "bit-vs-qubit".
 */
export function getQuizForLessonId(idOrSlug) {
  // If we were given a non-numeric string, treat it as a slug directly.
  if (typeof idOrSlug === "string" && !/^\d+$/.test(idOrSlug)) {
    const slug = idOrSlug;
    return quizzesBySlug[slug] || null;
  }

  // Otherwise, try to interpret as a numeric id.
  const numericId =
    typeof idOrSlug === "string" ? parseInt(idOrSlug, 10) : idOrSlug;

  if (Number.isNaN(numericId)) return null;

  const slug = slugById[numericId];
  if (!slug) return null;
  return quizzesBySlug[slug] || null;
}
