// src/data/quizzes.js

import { lessons } from "./lessons";

/**
 * Shape of a quiz question:
 * {
 *   question: string,
 *   choices: string[4],
 *   correctIndex: number (0-3),
 *   explanation: string
 * }
 *
 * We'll provide custom sets for some core lessons,
 * and fall back to a generic builder for the rest
 * so every lesson always has a quiz.
 */

// --- Custom quiz banks for specific lessons ---

const customQuizzes = {
  "bit-vs-qubit": [
    {
      question: "Which statement best describes the key difference between a classical bit and a qubit?",
      choices: [
        "A bit can be 0, 1, or any complex value, while a qubit can only be 0 or 1.",
        "A qubit can exist in a superposition of 0 and 1, while a classical bit is always exactly 0 or 1.",
        "Bits and qubits are identical; the difference is only the name.",
        "A bit is stored on a quantum device, while a qubit is stored on a USB stick."
      ],
      correctIndex: 1,
      explanation:
        "Classical bits are always exactly 0 or 1. Qubits can exist in a superposition of 0 and 1 until measured."
    },
    {
      question:
        "If you measure a qubit that is in an equal superposition of |0⟩ and |1⟩, what do you expect to see over many repeated measurements?",
      choices: [
        "Always 0, because measurement destroys the 1 component.",
        "Always 1, because 1 dominates in superposition.",
        "Roughly 50% outcomes 0 and 50% outcomes 1.",
        "Outcomes are completely impossible to predict, even statistically."
      ],
      correctIndex: 2,
      explanation:
        "An equal superposition gives equal probability amplitudes, which translate into ~50% probability for each outcome when measured many times."
    },
    {
      question:
        "Why can’t you simply copy an arbitrary unknown qubit state the way you copy a classical bit?",
      choices: [
        "Because quantum computers don’t support copy-paste operations.",
        "Because of the no-cloning theorem, which says unknown quantum states cannot be perfectly copied.",
        "Because qubits only support logical AND and OR operations.",
        "Because quantum states are stored as files that cannot be duplicated."
      ],
      correctIndex: 1,
      explanation:
        "The no-cloning theorem is a fundamental result in quantum mechanics: you cannot perfectly copy an arbitrary unknown quantum state."
    }
  ],

  superposition: [
    {
      question:
        "Which operation is most commonly used to put a qubit initially in |0⟩ into an equal superposition of |0⟩ and |1⟩?",
      choices: [
        "A Pauli-Z gate",
        "A Hadamard (H) gate",
        "A measurement in the computational basis",
        "Resetting the qubit to |0⟩"
      ],
      correctIndex: 1,
      explanation:
        "The Hadamard gate maps |0⟩ to (|0⟩ + |1⟩)/√2, creating an equal superposition."
    },
    {
      question:
        "What changes when you apply another Hadamard gate to a qubit that is already in the equal superposition created by H|0⟩?",
      choices: [
        "The state stays in the same superposition.",
        "The state becomes |1⟩ with certainty.",
        "The state returns to |0⟩ with certainty.",
        "The state becomes completely undefined."
      ],
      correctIndex: 2,
      explanation:
        "H applied twice is the identity on |0⟩, so H(H|0⟩) = |0⟩. Superposition is reversible with the right gates."
    },
    {
      question:
        "Why is superposition powerful for quantum algorithms like Grover’s search?",
      choices: [
        "Because it lets qubits store more classical bits physically.",
        "Because superposition lets a single qubit represent many possible classical states at once, enabling interference-based speedups.",
        "Because superposition makes quantum computers immune to noise.",
        "Because superposition automatically finds the correct answer on the first try."
      ],
      correctIndex: 1,
      explanation:
        "Superposition lets the system explore many basis states in parallel. Algorithms then use interference to amplify correct answers and cancel incorrect ones."
    }
  ],

  measurement: [
    {
      question:
        "What happens to a qubit’s state when you perform a projective measurement in the computational (Z) basis?",
      choices: [
        "Nothing; measurement does not affect the state.",
        "The state collapses to |0⟩ or |1⟩ with probabilities determined by the state’s amplitudes.",
        "The state always becomes a uniform superposition of |0⟩ and |1⟩.",
        "The state becomes classical but can still interfere with other qubits."
      ],
      correctIndex: 1,
      explanation:
        "Projective measurement collapses the qubit onto a basis state (|0⟩ or |1⟩), with probabilities equal to the squared magnitudes of the corresponding amplitudes."
    },
    {
      question:
        "After you measure a qubit and obtain the outcome |1⟩, what is its new state (immediately after the measurement, ignoring noise)?",
      choices: [
        "It remains in its original superposition.",
        "It becomes |0⟩.",
        "It becomes |1⟩.",
        "It becomes an equal mixture of |0⟩ and |1⟩."
      ],
      correctIndex: 2,
      explanation:
        "Measurement collapses the state to the observed outcome. If you measure |1⟩, the state is now |1⟩."
    },
    {
      question:
        "Which of the following best describes the difference between classical randomness and quantum randomness from measurement?",
      choices: [
        "Classical randomness is always perfectly predictable; quantum randomness is not.",
        "Quantum randomness is fundamentally unpredictable even with complete knowledge of the state; classical randomness often comes from ignorance about details.",
        "Both are identical and come from rolling dice.",
        "Quantum randomness can be removed with enough computing power."
      ],
      correctIndex: 1,
      explanation:
        "In quantum mechanics, even with full knowledge of the state, measurement outcomes are intrinsically probabilistic. Classical randomness often reflects hidden or uncontrolled variables."
    }
  ],

  "bloch-sphere": [
    {
      question:
        "On the Bloch sphere, what do the north and south poles typically represent?",
      choices: [
        "The states |+⟩ and |−⟩",
        "The states |0⟩ and |1⟩",
        "Two arbitrary mixed states",
        "The states after and before measurement"
      ],
      correctIndex: 1,
      explanation:
        "On the Bloch sphere, the north pole is usually |0⟩ and the south pole is |1⟩."
    },
    {
      question:
        "A state on the equator of the Bloch sphere corresponds to which property?",
      choices: [
        "A classical bit",
        "A state with only real amplitudes",
        "An equal superposition of |0⟩ and |1⟩ (up to phase)",
        "A completely mixed state"
      ],
      correctIndex: 2,
      explanation:
        "Points on the equator correspond to equal-magnitude superpositions of |0⟩ and |1⟩, differing by a phase around the equator."
    },
    {
      question:
        "What does rotating a qubit around an axis on the Bloch sphere represent?",
      choices: [
        "Changing the measurement basis without affecting the state",
        "A unitary operation that changes the state’s amplitudes and relative phases",
        "Resetting the qubit to |0⟩",
        "Measuring the qubit in that axis"
      ],
      correctIndex: 1,
      explanation:
        "Unitary gates correspond to rotations of the Bloch vector around specific axes, changing amplitudes and phases in a controlled way."
    }
  ],

  "single-qubit-gates": [
    {
      question:
        "Which of the following sets of gates is universal for single-qubit rotations (up to a global phase)?",
      choices: [
        "Only the Pauli-X gate",
        "Hadamard (H) and Pauli-Z",
        "Rotations around at least two non-parallel axes, such as Rx and Rz",
        "Measurement in the Z basis and reset"
      ],
      correctIndex: 2,
      explanation:
        "Rotations around two non-parallel axes can generate any single-qubit unitary (up to a global phase)."
    },
    {
      question:
        "What does the Pauli-X gate do to the computational basis states?",
      choices: [
        "Leaves both |0⟩ and |1⟩ unchanged",
        "Maps |0⟩ → |1⟩ and |1⟩ → |0⟩",
        "Maps |0⟩ → |0⟩ and |1⟩ → -|1⟩",
        "Maps any state to |0⟩"
      ],
      correctIndex: 1,
      explanation:
        "Pauli-X acts like a quantum NOT: it swaps |0⟩ and |1⟩."
    },
    {
      question:
        "What is the main effect of the Pauli-Z gate on a general state α|0⟩ + β|1⟩?",
      choices: [
        "It swaps |0⟩ and |1⟩.",
        "It multiplies the |0⟩ component by -1 and leaves |1⟩ unchanged.",
        "It multiplies the |1⟩ component by -1 and leaves |0⟩ unchanged.",
        "It discards the phase information entirely."
      ],
      correctIndex: 2,
      explanation:
        "Pauli-Z adds a phase of -1 to the |1⟩ component: α|0⟩ + β|1⟩ → α|0⟩ - β|1⟩."
    }
  ]
  // You can keep adding explicit custom question sets for more lesson IDs here.
};

// --- Generic fallback quiz builder so every lesson has a quiz ---

function buildDefaultQuiz(lesson) {
  const title = lesson?.title || "this lesson";
  const tags = Array.isArray(lesson?.tags) ? lesson.tags : [];
  const mainTag = tags[0] || "quantum computing";

  return [
    {
      question: `Which option best matches the main topic of “${title}”?`,
      choices: [
        `It focuses on ${mainTag} and how it appears in basic quantum circuits.`,
        "It explains how to build classical logic gates out of transistors.",
        "It is mainly about web development frameworks for UI design.",
        "It describes how to store large classical databases on disk."
      ],
      correctIndex: 0,
      explanation:
        `This lesson is part of your quantum path, so the focus is on ${mainTag} in the context of quantum computing, not on classical hardware or web frameworks.`
    },
    {
      question:
        "How should you treat the mathematical symbols and diagrams that appear in this lesson?",
      choices: [
        "They are just decoration; you can ignore them.",
        "They are there to give precise meaning and are worth studying alongside the text.",
        "They are unrelated to the described algorithm.",
        "They are only for experts and never useful for beginners."
      ],
      correctIndex: 1,
      explanation:
        "Equations and diagrams are not decoration; they encode the precise rules for how the quantum system behaves and are worth reading carefully."
    },
    {
      question:
        "If something in this lesson feels confusing or abstract, what is the best strategy?",
      choices: [
        "Skip it and hope it never appears again.",
        "Memorize every formula without understanding any examples.",
        "Revisit earlier lessons, experiment in the Playground, and connect the new idea back to things you already know.",
        "Only read the multiple-choice answers for future quizzes."
      ],
      correctIndex: 2,
      explanation:
        "Reinforcing new concepts by connecting them to earlier material and trying them in the Playground is the most effective way to build intuition."
    }
  ];
}

/**
 * Returns a 3-question quiz for a given lesson id.
 * Uses custom questions when available, otherwise a generic but correlated quiz.
 */
export function getQuizForLessonId(id) {
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) {
    // If somehow the id is unknown, still return a safe generic quiz.
    return buildDefaultQuiz({ title: id || "this lesson", tags: ["quantum"] });
  }

  if (customQuizzes[id]) {
    return customQuizzes[id];
  }

  return buildDefaultQuiz(lesson);
}
