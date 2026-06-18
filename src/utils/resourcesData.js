export const semesterData = [
  {
    id: 'sem1',
    name: 'Semester 1',
    subjects: [
      {
        id: 'sem1-sub1',
        name: 'Engineering Mathematics I',
        code: 'KAS-101',
        units: [
          {
            id: 'sem1-sub1-1',
            name: 'Differential Calculus',
            resources: [
              { id: 'r1', type: 'video', title: 'Limits & Continuity', url: '#' },
              { id: 'r2', type: 'video', title: 'Differentiation Basics', url: '#' },
              { id: 'r3', type: 'notes', title: 'Calculus Notes PDF', url: '#' },
              { id: 'r4', type: 'pyq', title: 'PYQ 2023-24', url: '#' },
            ],
          },
          {
            id: 'sem1-sub1-2',
            name: 'Integral Calculus',
            resources: [
              { id: 'r5', type: 'video', title: 'Integration Methods', url: '#' },
              { id: 'r6', type: 'notes', title: 'Integral Formulae Sheet', url: '#' },
              { id: 'r7', type: 'pyq', title: 'PYQ 2022-23', url: '#' },
            ],
          },
          {
            id: 'sem1-sub1-3',
            name: 'Vector Calculus',
            resources: [
              { id: 'r8', type: 'video', title: 'Gradient & Divergence', url: '#' },
              { id: 'r9', type: 'notes', title: 'Vector Calculus Notes', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'sem1-sub2',
        name: 'Engineering Physics',
        code: 'KAS-102',
        units: [
          {
            id: 'sem1-sub2-1',
            name: 'Relativity & Quantum Mechanics',
            resources: [
              { id: 'r10', type: 'video', title: 'Theory of Relativity', url: '#' },
              { id: 'r11', type: 'notes', title: 'Quantum Mechanics Notes', url: '#' },
            ],
          },
          {
            id: 'sem1-sub2-2',
            name: 'Semiconductor Physics',
            resources: [
              { id: 'r12', type: 'video', title: 'Band Theory', url: '#' },
              { id: 'r13', type: 'pyq', title: 'PYQ 2023-24', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'sem1-sub3',
        name: 'Basic Electrical Engineering',
        code: 'KEE-101',
        units: [
          {
            id: 'sem1-sub3-1',
            name: 'DC Circuits',
            resources: [
              { id: 'r14', type: 'video', title: 'Kirchhoff Laws', url: '#' },
              { id: 'r15', type: 'notes', title: 'Circuit Analysis Notes', url: '#' },
              { id: 'r16', type: 'pdf', title: 'DC Circuits Reference', url: '#' },
            ],
          },
          {
            id: 'sem1-sub3-2',
            name: 'AC Circuits',
            resources: [
              { id: 'r17', type: 'video', title: 'Phasor Analysis', url: '#' },
              { id: 'r18', type: 'pyq', title: 'PYQ 2022-23', url: '#' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sem2',
    name: 'Semester 2',
    subjects: [
      {
        id: 'sem2-sub1',
        name: 'Engineering Mathematics II',
        code: 'KAS-201',
        units: [
          {
            id: 'sem2-sub1-1',
            name: 'Ordinary Differential Equations',
            resources: [
              { id: 'r19', type: 'video', title: 'First Order ODE', url: '#' },
              { id: 'r20', type: 'notes', title: 'ODE Notes', url: '#' },
              { id: 'r21', type: 'pyq', title: 'PYQ 2023-24', url: '#' },
            ],
          },
          {
            id: 'sem2-sub1-2',
            name: 'Partial Differential Equations',
            resources: [
              { id: 'r22', type: 'video', title: 'PDE Classification', url: '#' },
              { id: 'r23', type: 'notes', title: 'PDE Formula Sheet', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'sem2-sub2',
        name: 'Programming for Problem Solving',
        code: 'KCS-201',
        units: [
          {
            id: 'sem2-sub2-1',
            name: 'C Fundamentals',
            resources: [
              { id: 'r24', type: 'video', title: 'Variables & Data Types', url: '#' },
              { id: 'r25', type: 'video', title: 'Control Structures', url: '#' },
              { id: 'r26', type: 'notes', title: 'C Programming Notes', url: '#' },
            ],
          },
          {
            id: 'sem2-sub2-2',
            name: 'Arrays & Strings',
            resources: [
              { id: 'r27', type: 'video', title: 'Arrays in C', url: '#' },
              { id: 'r28', type: 'pyq', title: 'PYQ 2023-24', url: '#' },
              { id: 'r29', type: 'pdf', title: 'Array Problems', url: '#' },
            ],
          },
          {
            id: 'sem2-sub2-3',
            name: 'Functions & Pointers',
            resources: [
              { id: 'r30', type: 'video', title: 'Function Pointers', url: '#' },
              { id: 'r31', type: 'notes', title: 'Pointer Notes', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'sem2-sub3',
        name: 'Environmental Science',
        code: 'KAS-202',
        units: [
          {
            id: 'sem2-sub3-1',
            name: 'Ecosystems & Biodiversity',
            resources: [
              { id: 'r32', type: 'notes', title: 'Ecosystem Notes', url: '#' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sem3',
    name: 'Semester 3',
    subjects: [
      {
        id: 'sem3-sub1',
        name: 'Data Structures',
        code: 'KCS-301',
        units: [
          {
            id: 'sem3-sub1-1',
            name: 'Arrays & Linked Lists',
            resources: [
              { id: 'r33', type: 'video', title: 'Singly Linked List', url: '#' },
              { id: 'r34', type: 'video', title: 'Doubly Linked List', url: '#' },
              { id: 'r35', type: 'notes', title: 'LinkedList Notes', url: '#' },
              { id: 'r36', type: 'pyq', title: 'PYQ 2023-24', url: '#' },
            ],
          },
          {
            id: 'sem3-sub1-2',
            name: 'Stacks & Queues',
            resources: [
              { id: 'r37', type: 'video', title: 'Stack Implementation', url: '#' },
              { id: 'r38', type: 'video', title: 'Queue Types', url: '#' },
              { id: 'r39', type: 'notes', title: 'Stack & Queue Notes', url: '#' },
            ],
          },
          {
            id: 'sem3-sub1-3',
            name: 'Trees & Graphs',
            resources: [
              { id: 'r40', type: 'video', title: 'BST Operations', url: '#' },
              { id: 'r41', type: 'notes', title: 'Tree Traversal Notes', url: '#' },
              { id: 'r42', type: 'pyq', title: 'PYQ 2022-23', url: '#' },
              { id: 'r43', type: 'pdf', title: 'Graph Algorithms', url: '#' },
            ],
          },
          {
            id: 'sem3-sub1-4',
            name: 'Sorting & Searching',
            resources: [
              { id: 'r44', type: 'video', title: 'Quick Sort & Merge Sort', url: '#' },
              { id: 'r45', type: 'notes', title: 'Sorting Notes', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'sem3-sub2',
        name: 'Digital Electronics',
        code: 'KEC-301',
        units: [
          {
            id: 'sem3-sub2-1',
            name: 'Logic Gates & Boolean Algebra',
            resources: [
              { id: 'r46', type: 'video', title: 'K-Map Simplification', url: '#' },
              { id: 'r47', type: 'notes', title: 'Boolean Algebra Notes', url: '#' },
            ],
          },
          {
            id: 'sem3-sub2-2',
            name: 'Combinational Circuits',
            resources: [
              { id: 'r48', type: 'video', title: 'Multiplexers & Demux', url: '#' },
              { id: 'r49', type: 'pyq', title: 'PYQ 2023-24', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'sem3-sub3',
        name: 'Discrete Mathematics',
        code: 'KCS-302',
        units: [
          {
            id: 'sem3-sub3-1',
            name: 'Set Theory & Logic',
            resources: [
              { id: 'r50', type: 'video', title: 'Propositional Logic', url: '#' },
              { id: 'r51', type: 'notes', title: 'Set Theory Notes', url: '#' },
            ],
          },
          {
            id: 'sem3-sub3-2',
            name: 'Graph Theory',
            resources: [
              { id: 'r52', type: 'video', title: 'Graph Isomorphism', url: '#' },
              { id: 'r53', type: 'pyq', title: 'PYQ 2022-23', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'sem3-sub4',
        name: 'Python Programming',
        code: 'KCS-351',
        units: [
          {
            id: 'sem3-sub4-1',
            name: 'Python Basics',
            resources: [
              { id: 'r54', type: 'video', title: 'Data Types & Loops', url: '#' },
              { id: 'r55', type: 'notes', title: 'Python Cheatsheet', url: '#' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sem4',
    name: 'Semester 4',
    subjects: [
      {
        id: 'sem4-sub1',
        name: 'Operating Systems',
        code: 'KCS-401',
        units: [
          {
            id: 'sem4-sub1-1',
            name: 'Process Management',
            resources: [
              { id: 'r56', type: 'video', title: 'CPU Scheduling', url: '#' },
              { id: 'r57', type: 'notes', title: 'Process Sync Notes', url: '#' },
              { id: 'r58', type: 'pyq', title: 'PYQ 2023-24', url: '#' },
            ],
          },
          {
            id: 'sem4-sub1-2',
            name: 'Memory Management',
            resources: [
              { id: 'r59', type: 'video', title: 'Paging & Segmentation', url: '#' },
              { id: 'r60', type: 'notes', title: 'Memory Notes', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'sem4-sub2',
        name: 'Computer Networks',
        code: 'KCS-402',
        units: [
          {
            id: 'sem4-sub2-1',
            name: 'Network Layer',
            resources: [
              { id: 'r61', type: 'video', title: 'IP Addressing', url: '#' },
              { id: 'r62', type: 'notes', title: 'Network Layer Notes', url: '#' },
              { id: 'r63', type: 'pdf', title: 'Routing Protocols', url: '#' },
            ],
          },
          {
            id: 'sem4-sub2-2',
            name: 'Transport Layer',
            resources: [
              { id: 'r64', type: 'video', title: 'TCP & UDP', url: '#' },
              { id: 'r65', type: 'pyq', title: 'PYQ 2023-24', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'sem4-sub3',
        name: 'Design & Analysis of Algorithms',
        code: 'KCS-403',
        units: [
          {
            id: 'sem4-sub3-1',
            name: 'Divide & Conquer',
            resources: [
              { id: 'r66', type: 'video', title: 'Merge Sort Analysis', url: '#' },
              { id: 'r67', type: 'notes', title: 'D&C Notes', url: '#' },
            ],
          },
          {
            id: 'sem4-sub3-2',
            name: 'Dynamic Programming',
            resources: [
              { id: 'r68', type: 'video', title: 'Knapsack & LCS', url: '#' },
              { id: 'r69', type: 'notes', title: 'DP Table Notes', url: '#' },
              { id: 'r70', type: 'pyq', title: 'PYQ 2023-24', url: '#' },
            ],
          },
          {
            id: 'sem4-sub3-3',
            name: 'Greedy Algorithms',
            resources: [
              { id: 'r71', type: 'video', title: 'Huffman Coding', url: '#' },
              { id: 'r72', type: 'notes', title: 'Greedy Notes', url: '#' },
            ],
          },
        ],
      },
    ],
  },
];
