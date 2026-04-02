// EDUCERA AI Notes Generation Service
// Uses built-in intelligence to generate educational content for Indian curricula

const CBSE_TOPICS = {
  school: {
    'Mathematics': [
      'Number Systems', 'Algebra', 'Geometry', 'Coordinate Geometry',
      'Trigonometry', 'Statistics', 'Probability', 'Mensuration',
      'Linear Equations', 'Quadratic Equations', 'Polynomials'
    ],
    'Science': [
      'Motion and Force', 'Gravitation', 'Sound', 'Light',
      'Atoms and Molecules', 'Chemical Reactions', 'Carbon Compounds',
      'Electricity', 'Magnetic Effects', 'Cell Biology', 'Heredity'
    ],
    'English': [
      'Grammar - Tenses', 'Grammar - Active/Passive Voice',
      'Grammar - Direct/Indirect Speech', 'Essay Writing',
      'Letter Writing', 'Comprehension Passages', 'Poetry Analysis'
    ],
    'Hindi': [
      'व्याकरण - संज्ञा', 'व्याकरण - सर्वनाम', 'व्याकरण - क्रिया',
      'निबंध लेखन', 'पत्र लेखन', 'अपठित गद्यांश'
    ],
    'Social Science': [
      'Indian History - Ancient', 'Medieval India', 'Modern India',
      'Indian Geography', 'Indian Constitution', 'Economics Basics',
      'French Revolution', 'World Wars', 'Globalization'
    ],
    'Computer Science': [
      'Python Basics', 'Data Types', 'Loops and Conditions',
      'Functions', 'Lists and Tuples', 'HTML/CSS Basics',
      'Database Concepts', 'Cyber Safety'
    ]
  },
  college: {
    'Physics': [
      'Mechanics', 'Thermodynamics', 'Optics', 'Electrostatics',
      'Current Electricity', 'Magnetism', 'Electromagnetic Waves',
      'Modern Physics', 'Nuclear Physics', 'Semiconductor Physics'
    ],
    'Chemistry': [
      'Atomic Structure', 'Chemical Bonding', 'Thermodynamics',
      'Equilibrium', 'Organic Chemistry', 'Electrochemistry',
      'Chemical Kinetics', 'Surface Chemistry', 'Polymers'
    ],
    'Biology': [
      'Cell Biology', 'Genetics', 'Evolution', 'Ecology',
      'Human Physiology', 'Plant Physiology', 'Biotechnology',
      'Molecular Biology', 'Microorganisms'
    ],
    'Mathematics': [
      'Relations and Functions', 'Matrices', 'Determinants',
      'Calculus - Differentiation', 'Calculus - Integration',
      'Vectors', 'Three-Dimensional Geometry', 'Probability',
      'Linear Programming', 'Differential Equations'
    ],
    'Computer Science': [
      'Python Advanced', 'Data Structures', 'SQL and Databases',
      'Networking', 'Boolean Algebra', 'File Handling',
      'Object-Oriented Programming', 'Algorithms'
    ],
    'Economics': [
      'Microeconomics', 'Macroeconomics', 'Indian Economy',
      'National Income', 'Money and Banking', 'Government Budget',
      'Balance of Payments', 'Statistics in Economics'
    ],
    'Accountancy': [
      'Accounting Principles', 'Journal Entries', 'Ledger',
      'Trial Balance', 'Final Accounts', 'Partnership Accounting',
      'Company Accounts', 'Cash Flow Statement'
    ]
  }
};

// Comprehensive note templates for many topics
const DETAILED_TEMPLATES = {
  // ===== SCHOOL MATH =====
  'Number Systems': {
    content: `# Number Systems - CBSE Class 9/10

## Introduction
Number systems form the foundation of mathematics. Understanding different types of numbers helps us solve complex mathematical problems.

## Types of Numbers

### 1. Natural Numbers (ℕ)
Natural numbers are counting numbers starting from 1.
**Examples:** 1, 2, 3, 4, 5, ...

### 2. Whole Numbers (W)
Whole numbers include natural numbers and zero.
**Examples:** 0, 1, 2, 3, 4, ...

### 3. Integers (ℤ)
Integers include all positive and negative whole numbers.
**Examples:** ..., -3, -2, -1, 0, 1, 2, 3, ...

### 4. Rational Numbers (ℚ)
Numbers that can be expressed as p/q where q ≠ 0.
**Examples:** 1/2, 3/4, -2/5, 0.75

### 5. Irrational Numbers
Numbers that cannot be expressed as p/q.
**Examples:** √2, √3, π, e

### 6. Real Numbers (ℝ)
The set of all rational and irrational numbers.

## Key Formulas
- **Euclid's Division Lemma:** a = bq + r, where 0 ≤ r < b
- **Fundamental Theorem of Arithmetic:** Every composite number can be expressed as a product of primes

## Important Points for Exams
✅ Every natural number is a whole number
✅ Every whole number is an integer
✅ Every integer is a rational number
✅ π is irrational (not equal to 22/7)
✅ √2 ≈ 1.414, √3 ≈ 1.732

## Practice Questions
1. Classify the following numbers: √4, 2/3, π, -5, 0
2. Find the HCF and LCM of 12 and 18 using prime factorization
3. Prove that √2 is irrational`,
    tags: 'CBSE, Mathematics, Number Systems, Real Numbers'
  },

  'Quadratic Equations': {
    content: `# Quadratic Equations - CBSE Class 10

## Definition
A quadratic equation is an equation of the form **ax² + bx + c = 0**, where a ≠ 0.

## Methods to Solve

### 1. Factorization Method
Split the middle term into two parts whose product equals ac.
**Example:** x² + 5x + 6 = 0 → (x+2)(x+3) = 0 → x = -2 or x = -3

### 2. Quadratic Formula
**x = (-b ± √(b² - 4ac)) / 2a**

This is the most general method and works for all quadratic equations.

### 3. Completing the Square
Rewrite ax² + bx + c = 0 as a(x + b/2a)² = (b² - 4ac)/4a

## Discriminant (D = b² - 4ac)
| Condition | Nature of Roots |
|-----------|----------------|
| D > 0 | Two distinct real roots |
| D = 0 | Two equal real roots |
| D < 0 | No real roots (complex roots) |

## Sum and Product of Roots
If α and β are roots:
- **Sum:** α + β = -b/a
- **Product:** α × β = c/a

## Important Points for Exams
✅ Always check if a ≠ 0 otherwise it's linear
✅ The discriminant determines the nature of roots
✅ A quadratic equation has at most 2 real roots
✅ If one root is known, the other can be found using sum/product

## Practice Questions
1. Solve: 2x² - 7x + 3 = 0
2. Find the discriminant of 3x² + 4x + 5 = 0
3. If roots are 2 and -3, form the quadratic equation
4. Find k if x² + kx + 9 = 0 has equal roots`,
    tags: 'CBSE, Mathematics, Quadratic Equations, Algebra'
  },

  'Trigonometry': {
    content: `# Trigonometry - CBSE Class 10

## Basic Ratios
For a right triangle with angle θ:
- **sin θ** = Opposite / Hypotenuse
- **cos θ** = Adjacent / Hypotenuse
- **tan θ** = Opposite / Adjacent
- **cosec θ** = 1/sin θ    **sec θ** = 1/cos θ    **cot θ** = 1/tan θ

## Standard Values Table
| Angle | sin | cos | tan |
|-------|-----|-----|-----|
| 0° | 0 | 1 | 0 |
| 30° | 1/2 | √3/2 | 1/√3 |
| 45° | 1/√2 | 1/√2 | 1 |
| 60° | √3/2 | 1/2 | √3 |
| 90° | 1 | 0 | undefined |

## Key Identities
1. **sin²θ + cos²θ = 1**
2. **1 + tan²θ = sec²θ**
3. **1 + cot²θ = cosec²θ**
4. **tan θ = sin θ / cos θ**

## Complementary Angles
- sin(90° - θ) = cos θ
- cos(90° - θ) = sin θ
- tan(90° - θ) = cot θ

## Tips for Board Exams
✅ Memorize the standard values table thoroughly
✅ Practice converting between ratios using identities
✅ In proving identities, start from the complex side
✅ For word problems, always draw a figure first

## Practice Questions
1. Prove: (sin θ + cos θ)² = 1 + 2 sin θ cos θ
2. If sin A = 3/5, find cos A and tan A
3. Evaluate: sin 60° cos 30° + sin 30° cos 60°
4. Prove: tan²θ - sin²θ = tan²θ × sin²θ`,
    tags: 'CBSE, Mathematics, Trigonometry, Identities'
  },

  // ===== SCHOOL SCIENCE =====
  'Motion and Force': {
    content: `# Motion and Force - CBSE Class 9

## Types of Motion
- **Uniform Motion:** Equal distance in equal time intervals
- **Non-uniform Motion:** Unequal distances in equal time intervals
- **Circular Motion:** Motion in a circular path

## Key Terms
- **Distance:** Total path length covered (scalar)
- **Displacement:** Shortest distance between initial and final positions (vector)
- **Speed:** Distance/Time (scalar)
- **Velocity:** Displacement/Time (vector)
- **Acceleration:** Rate of change of velocity

## Equations of Motion
1. **v = u + at**
2. **s = ut + ½at²**
3. **v² = u² + 2as**

Where: u = initial velocity, v = final velocity, a = acceleration, t = time, s = displacement

## Newton's Laws
### First Law (Law of Inertia)
An object remains at rest or in uniform motion unless acted upon by an external force.

### Second Law (F = ma)
Force equals mass times acceleration. Unit: Newton (N)

### Third Law
Every action has an equal and opposite reaction.

## Important Formulas
- **Momentum (p):** p = mv (kg·m/s)
- **Impulse:** F × t = change in momentum
- **Free fall acceleration:** g = 9.8 m/s² ≈ 10 m/s²

## Practice Questions
1. A car travels 100m in 5 seconds. Calculate its speed.
2. An object falls freely from 20m height. Find time to reach ground. (g = 10 m/s²)
3. A force of 10N acts on an object of mass 2kg. Find acceleration.`,
    tags: 'CBSE, Science, Physics, Motion, Force, Newton Laws'
  },

  'Chemical Reactions': {
    content: `# Chemical Reactions and Equations - CBSE Class 10

## Types of Chemical Reactions

### 1. Combination Reaction
Two or more substances combine to form a single product.
**Example:** 2Mg + O₂ → 2MgO

### 2. Decomposition Reaction
A single compound breaks down into two or more products.
**Example:** 2H₂O → 2H₂ + O₂ (electrolysis)

### 3. Displacement Reaction
A more reactive element displaces a less reactive one.
**Example:** Zn + CuSO₄ → ZnSO₄ + Cu

### 4. Double Displacement Reaction
Exchange of ions between two compounds.
**Example:** NaCl + AgNO₃ → AgCl↓ + NaNO₃

### 5. Redox Reactions
- **Oxidation:** Loss of electrons / gain of oxygen
- **Reduction:** Gain of electrons / loss of oxygen

## Balancing Chemical Equations
1. Write the word equation
2. Write the chemical formula for each substance
3. Balance atoms on both sides
4. Verify: Same number of atoms for each element

## Important Concepts
✅ Reactivity Series: K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au
✅ A catalyst changes the rate but is not consumed
✅ Precipitate (↓) indicates an insoluble product
✅ Exothermic = releases heat, Endothermic = absorbs heat

## Practice Questions
1. Balance: Fe + H₂O → Fe₃O₄ + H₂
2. Identify the type: CaCO₃ → CaO + CO₂
3. What happens when iron nails are dipped in copper sulphate solution?`,
    tags: 'CBSE, Science, Chemistry, Chemical Reactions, Equations'
  },

  'Electricity': {
    content: `# Electricity - CBSE Class 10

## Basic Concepts
- **Electric Current (I):** Rate of flow of charge. I = Q/t (Ampere)
- **Potential Difference (V):** Work done per unit charge. V = W/Q (Volt)
- **Resistance (R):** Opposition to current flow (Ohm, Ω)

## Ohm's Law
**V = IR** (Voltage = Current × Resistance)

## Resistors in Series
- R_total = R₁ + R₂ + R₃ + ...
- Same current flows through all resistors
- Voltage divides among resistors

## Resistors in Parallel
- 1/R_total = 1/R₁ + 1/R₂ + 1/R₃ + ...
- Same voltage across all resistors
- Current divides among resistors

## Electrical Power & Energy
- **Power:** P = VI = I²R = V²/R (Watt)
- **Energy:** E = Pt = VIt (Joule)
- **1 kWh = 3.6 × 10⁶ J** (1 unit of electricity)

## Heating Effect of Current
H = I²Rt (Joule's Law of Heating)
Used in: Electric heater, iron, fuse, electric bulb

## Important Points
✅ Fuse wire: Low melting point, high resistance (alloy of tin and lead)
✅ Household circuits use parallel connections
✅ 1 Ampere = 1 Coulomb/second
✅ Direction of current is opposite to electron flow

## Practice Questions
1. Calculate resistance if V = 12V and I = 3A
2. Three resistors of 2Ω, 4Ω, 6Ω are in parallel. Find total resistance.
3. An appliance uses 1000W for 2 hours daily. Find monthly bill at ₹8/unit.`,
    tags: 'CBSE, Science, Physics, Electricity, Ohm Law'
  },

  'Cell Biology': {
    content: `# Cell Biology - CBSE Class 9

## The Cell: Basic Unit of Life
The cell is the fundamental structural and functional unit of all living organisms.

## Cell Discovery
- **Robert Hooke (1665):** First observed cells in cork
- **Cell Theory:** All living things are made of cells (Schleiden & Schwann)

## Types of Cells

### Prokaryotic Cells
- No true nucleus (nucleoid region)
- No membrane-bound organelles
- Examples: Bacteria, Blue-green algae
- Size: 1-10 μm

### Eukaryotic Cells
- True nucleus with nuclear membrane
- Membrane-bound organelles present
- Examples: Plant cells, Animal cells
- Size: 10-100 μm

## Cell Organelles

| Organelle | Function |
|-----------|----------|
| **Nucleus** | Controls cell activities, contains DNA |
| **Mitochondria** | Powerhouse of the cell (ATP production) |
| **Endoplasmic Reticulum** | Protein synthesis (Rough ER), Lipid synthesis (Smooth ER) |
| **Golgi Apparatus** | Packaging and secretion |
| **Lysosomes** | Digestion (suicide bags of the cell) |
| **Chloroplast** | Photosynthesis (only in plant cells) |
| **Cell Wall** | Rigidity and protection (only in plant cells) |
| **Vacuole** | Storage (large in plants, small in animals) |

## Plant Cell vs Animal Cell
| Feature | Plant Cell | Animal Cell |
|---------|-----------|-------------|
| Cell Wall | Present | Absent |
| Chloroplast | Present | Absent |
| Vacuole | Large, central | Small, multiple |
| Shape | Fixed, rectangular | Irregular |
| Centrioles | Absent | Present |

## Practice Questions
1. Draw a well-labeled diagram of an animal cell
2. Why are mitochondria called the "powerhouse of the cell"?
3. Differentiate between prokaryotic and eukaryotic cells
4. What is the function of lysosomes?`,
    tags: 'CBSE, Science, Biology, Cell, Organelles'
  },

  // ===== SCHOOL ENGLISH =====
  'Grammar - Tenses': {
    content: `# English Grammar - Tenses (CBSE)

## Overview
Tenses indicate the time of an action. There are **3 main tenses**, each with **4 forms** = **12 tenses** total.

## Present Tense

### 1. Simple Present
**Structure:** Subject + V1 (s/es for 3rd person)
**Example:** She *writes* daily. / They *play* cricket.
**Use:** Habits, general truths, schedules

### 2. Present Continuous
**Structure:** Subject + is/am/are + V-ing
**Example:** I *am reading* a book.
**Use:** Actions happening now

### 3. Present Perfect
**Structure:** Subject + has/have + V3
**Example:** She *has finished* her homework.
**Use:** Actions completed recently, with connection to the present

### 4. Present Perfect Continuous
**Structure:** Subject + has/have been + V-ing
**Example:** They *have been studying* for 3 hours.
**Use:** Actions started in the past and still continuing

## Past Tense

### 1. Simple Past
**Structure:** Subject + V2
**Example:** He *went* to school. / She *studied* well.

### 2. Past Continuous
**Structure:** Subject + was/were + V-ing
**Example:** I *was watching* TV when she called.

### 3. Past Perfect
**Structure:** Subject + had + V3
**Example:** He *had left* before I arrived.

### 4. Past Perfect Continuous
**Structure:** Subject + had been + V-ing
**Example:** She *had been waiting* for two hours.

## Future Tense

### 1. Simple Future
**Structure:** Subject + will/shall + V1
**Example:** I *will study* tomorrow.

### 2. Future Continuous
**Structure:** Subject + will be + V-ing

### 3. Future Perfect
**Structure:** Subject + will have + V3

### 4. Future Perfect Continuous
**Structure:** Subject + will have been + V-ing

## Board Exam Tips
✅ Read the sentence carefully to identify the time frame
✅ Look for time markers: yesterday (past), now (present), tomorrow (future)
✅ Practice converting sentences between tenses
✅ Focus on irregular verb forms (go-went-gone, write-wrote-written)

## Practice Questions
1. Fill in the blanks with the correct tense form
2. Identify the tense: "They have been playing since morning"
3. Change to passive voice: "She writes a letter"`,
    tags: 'CBSE, English, Grammar, Tenses, Board Exam'
  },

  // ===== COLLEGE PHYSICS =====
  'Electrostatics': {
    content: `# Electrostatics - CBSE Class 12

## Coulomb's Law
**F = kq₁q₂/r²**
Where: k = 9 × 10⁹ Nm²/C², q = charge, r = distance

## Electric Field
**E = F/q₀ = kQ/r²** (N/C or V/m)
Direction: Away from positive, toward negative charges

## Electric Potential
**V = kQ/r** (Volt)
- Work done to bring unit positive charge from infinity
- Equipotential surfaces are perpendicular to field lines

## Gauss's Law
**∮ E⃗ · dA⃗ = Q_enclosed / ε₀**
Where: ε₀ = 8.85 × 10⁻¹² C²/Nm²

### Applications of Gauss's Law:
1. **Infinite line charge:** E = λ/(2πε₀r)
2. **Infinite plane sheet:** E = σ/(2ε₀)
3. **Uniformly charged sphere:** E = kQ/r² (outside), E = kQr/R³ (inside)

## Capacitance
**C = Q/V** (Farad)

### Parallel Plate Capacitor
C = ε₀A/d (with dielectric: C = Kε₀A/d)

### Series: 1/C_total = 1/C₁ + 1/C₂ + ...
### Parallel: C_total = C₁ + C₂ + ...

## Energy Stored in Capacitor
**U = ½CV² = ½QV = Q²/2C**

## Important Points for JEE/Board
✅ Electric field inside a conductor is zero
✅ Charge resides on the outer surface of a conductor
✅ Electric field lines never cross each other
✅ Dielectric constant (K) increases capacitance

## Practice Questions
1. Find the force between charges of 2μC and 3μC separated by 30cm
2. Calculate the capacitance of a parallel plate capacitor with A = 100cm², d = 2mm
3. Three capacitors of 2μF, 4μF, 6μF are in series. Find total capacitance.`,
    tags: 'CBSE, Physics, Electrostatics, Coulomb Law, Capacitance, Class 12'
  },

  // ===== COLLEGE MATH =====
  'Calculus - Differentiation': {
    content: `# Calculus: Differentiation - CBSE Class 12

## Concept
Differentiation is the process of finding the rate of change of a function.
**dy/dx** represents the derivative of y with respect to x.

## Basic Rules

### 1. Power Rule
d/dx(xⁿ) = nxⁿ⁻¹

### 2. Constant Rule
d/dx(c) = 0

### 3. Sum/Difference Rule
d/dx(f ± g) = f' ± g'

### 4. Product Rule
d/dx(fg) = f'g + fg'

### 5. Quotient Rule
d/dx(f/g) = (f'g - fg')/g²

### 6. Chain Rule
d/dx[f(g(x))] = f'(g(x)) · g'(x)

## Standard Derivatives
| Function | Derivative |
|----------|-----------|
| sin x | cos x |
| cos x | -sin x |
| tan x | sec²x |
| eˣ | eˣ |
| ln x | 1/x |
| aˣ | aˣ ln a |

## Applications
1. **Finding slope of tangent:** dy/dx at a point
2. **Rate of change:** dV/dt, dA/dt, etc.
3. **Maxima/Minima:** Set dy/dx = 0, check d²y/dx²
   - d²y/dx² > 0 → Minimum
   - d²y/dx² < 0 → Maximum
4. **Increasing/Decreasing:** dy/dx > 0 (increasing), dy/dx < 0 (decreasing)

## Implicit Differentiation
When y is not explicitly defined as a function of x:
- Differentiate both sides with respect to x
- Treat y as a function of x (use chain rule)
- Solve for dy/dx

## Board Exam Tips
✅ Master the chain rule — it's used everywhere
✅ Practice logarithmic differentiation for complex expressions
✅ For word problems, identify the variable and the function first
✅ Always simplify your answer

## Practice Questions
1. Find dy/dx if y = x³ + 3x² - 2x + 5
2. Differentiate: y = sin(3x² + 1)
3. Find the maximum value of f(x) = -x² + 4x + 1
4. If x² + y² = 25, find dy/dx by implicit differentiation`,
    tags: 'CBSE, Mathematics, Calculus, Differentiation, Class 12'
  },

  // ===== COLLEGE CHEMISTRY =====
  'Organic Chemistry': {
    content: `# Organic Chemistry - CBSE Class 12

## Introduction
Organic chemistry is the study of carbon compounds. Carbon can form 4 covalent bonds (tetravalency).

## Classification of Organic Compounds

### By Carbon Chain
- **Open chain/Acyclic:** Straight or branched chains
- **Closed chain/Cyclic:** Ring structures

### Functional Groups
| Group | Name | Example |
|-------|------|---------|
| -OH | Alcohol | CH₃OH (Methanol) |
| -CHO | Aldehyde | HCHO (Formaldehyde) |
| -COOH | Carboxylic Acid | CH₃COOH (Acetic acid) |
| -NH₂ | Amine | CH₃NH₂ (Methylamine) |
| C=C | Alkene | C₂H₄ (Ethylene) |
| C≡C | Alkyne | C₂H₂ (Acetylene) |

## IUPAC Nomenclature Rules
1. Find the longest carbon chain (parent chain)
2. Number from the end nearest to the first branch
3. Name substituents with position numbers
4. Use prefixes: meth-, eth-, prop-, but-, pent-...

## Isomerism
- **Structural Isomers:** Same formula, different structure
- **Geometrical Isomers:** cis- and trans- forms
- **Optical Isomers:** Mirror image forms (chirality)

## Important Reactions

### 1. Substitution (Alkanes)
CH₄ + Cl₂ → CH₃Cl + HCl (UV light)

### 2. Addition (Alkenes)
CH₂=CH₂ + H₂ → CH₃-CH₃ (Ni catalyst)

### 3. Elimination
CH₃CH₂OH → CH₂=CH₂ + H₂O (H₂SO₄, heat)

## Exam Important Points
✅ Carbon always forms 4 bonds
✅ Homologous series differ by -CH₂-
✅ IUPAC naming is frequently asked in boards
✅ Practice drawing structural formulas

## Practice Questions
1. Give IUPAC name for CH₃CH(CH₃)CH₂OH
2. Write the structural formula of 2-methylpropane
3. How many isomers does C₄H₁₀ have? Draw them.`,
    tags: 'CBSE, Chemistry, Organic Chemistry, IUPAC, Class 12'
  },

  // ===== COLLEGE COMPUTER SCIENCE =====
  'Data Structures': {
    content: `# Data Structures - CBSE Class 12

## What are Data Structures?
A data structure is a way of organizing data in a computer so it can be used efficiently.

## Types of Data Structures

### 1. Arrays
- Fixed-size sequential collection of elements
- **Access:** O(1) — Direct index access
- **Search:** O(n) — Linear search, O(log n) — Binary search (sorted)
- **Insert/Delete:** O(n) — Need to shift elements

### 2. Stack (LIFO - Last In First Out)
**Operations:**
- **push(item):** Add item to top
- **pop():** Remove item from top
- **peek():** View top item without removing

**Applications:** Expression evaluation, undo operations, function calls

\`\`\`python
stack = []
stack.append(10)  # push
stack.append(20)
top = stack.pop()  # pop → 20
\`\`\`

### 3. Queue (FIFO - First In First Out)
**Operations:**
- **enqueue(item):** Add item to rear
- **dequeue():** Remove item from front

**Applications:** Print queue, BFS, CPU scheduling

### 4. Linked List
- Dynamic data structure with nodes
- Each node contains: data + pointer to next node
- **Advantages:** Dynamic size, easy insertion/deletion
- **Disadvantages:** No random access, extra memory for pointers

### 5. Dictionary / Hash Map
- Key-value pair storage
- **Access:** O(1) average
- Python: \`dict\`, \`{key: value}\`

## Searching Algorithms

### Linear Search: O(n)
Check each element one by one.

### Binary Search: O(log n)
Only works on **sorted** data. Compare with middle, eliminate half each time.

## Sorting Algorithms

### Bubble Sort: O(n²)
Compare adjacent elements and swap if needed. Repeat until sorted.

### Insertion Sort: O(n²)
Build sorted array one element at a time.

## Important Points for Boards
✅ Understand time complexity (Big O notation)
✅ Stack = LIFO, Queue = FIFO — never confuse these
✅ Binary search requires a sorted array
✅ Practice Python implementations for each

## Practice Questions
1. Implement a stack using Python list
2. Write a binary search function
3. Trace bubble sort for: [5, 3, 8, 1, 2]
4. What is the time complexity of searching in a dictionary?`,
    tags: 'CBSE, Computer Science, Data Structures, Stack, Queue, Class 12'
  },

  'Linked Lists': {
    content: `# Linked Lists - Comprehensive Study Guide

## 📌 Detailed Overview: What is a Linked List?
A **linked list** is a fundamental data structure in computer science. It mainly allows efficient insertion and deletion operations compared to arrays. Like arrays, it is also used to implement other data structures like stack, queue, and deque.

A linked list is a type of linear data structure where individual items are not necessarily at contiguous locations. The individual items are called **nodes** and are connected with each other using links.

A node contains two things:
1. **Data:** The actual value or information stored.
2. **Next Pointer / Link:** A reference that connects it with another node.

The first node is called the **head node** and we can traverse the whole list using this head and the next links. 

![A basic singly linked list](https://media.geeksforgeeks.org/wp-content/uploads/20220816144425/LLdrawio.png)

## 💡 Why use Linked Lists? (Use-Cases & Necessity)
### Why Linked Lists instead of Arrays?
Understanding *why* we apply Linked Lists is just as important as knowing what it is. 
Compared to Arrays, Linked Lists provide unique benefits:
- **Dynamic Size:** Unlike arrays, a linked list can grow or shrink dynamically, so we don't have to pre-allocate memory.
- **Efficient Insertions/Deletions:** Inserting or removing an element in a linked list is extremely efficient (O(1) if you have the pointer) because it doesn't require shifting elements like an array does.

### 🌟 Advantages
- Drastically improves performance for queues, stacks, and applications needing dynamic sizing (like dynamic memory allocation or music playlists).
- Prevents memory wastage by only allocating nodes when needed.

### ⚠️ Disadvantages / Challenges
- **No Random Access:** You cannot directly access the nth element (like \`arr[3]\`). You must traverse from the head, taking O(n) time.
- **Extra Memory Required:** Each node requires extra memory to store the pointer/link.
- **Reverse Traversal Complexity:** Traversing heavily requires careful pointer management, which can lead to memory leaks or segmentation faults if not handled well.

## 🔠 Types & Variations in detail

**1. Singly Linked List**
The most fundamental form. Each node points only to the next node. You can only traverse in one direction (forward).
![Singly Linked List](https://media.geeksforgeeks.org/wp-content/uploads/20220817185025/LinkedList-660x171.png)

**2. Doubly Linked List**
A specialized variation where each node contains *two* pointers: one pointing to the next node and one pointing to the previous node. This allows for forward and backward traversal.
![Doubly Linked List](https://media.geeksforgeeks.org/wp-content/uploads/20240213155822/Doubly-Linked-List-in-C.png)

**3. Circular Linked List**
Advanced variation where the last node points back to the first node (head), forming a circle. Useful for round-robin scheduling or continuous loops.

## 🚀 How to Start Learning & Implementing Linked Lists?
### The Step-by-Step Roadmap to Mastery

**✅ Phase 1: Clear the Basics (Days 1-3)**
- Start by understanding the core definition, architecture, and memory mapping.
- Goal: Learn how to manually define a \`Node\` class or \`struct\` in your preferred language.

**✅ Phase 2: Hands-on Implementation (Days 4-7)**
- Write basic examples to insert a node at the beginning, end, and middle.
- Try traversing the list and printing all elements.

**✅ Phase 3: Advanced Problem Solving (Week 2)**
- Dive deep into edge cases (what if the list is empty? What if you delete the only element?).
- Learn classic interview problems: Reversing a linked list, finding the middle element, cycle detection (Floyd's algorithm).

**✅ Phase 4: Practice & Mock Tests (Week 3 onwards)**
- Test your rigorous knowledge using timed LeetCode assignments.
- Re-evaluate pointer arithmetic mistakes constantly.`,
    tags: 'Data Structures, Linked Lists, Study Notes, College'
  },

  'SQL and Databases': {
    content: `# SQL and Databases - CBSE Class 12

## Database Concepts
- **Database:** Organized collection of structured data
- **DBMS:** Software to manage databases (MySQL, PostgreSQL)
- **RDBMS:** Relational DBMS — stores data in tables with relationships

## SQL Commands

### DDL (Data Definition Language)
\`\`\`sql
-- Create a table
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  class VARCHAR(10),
  marks DECIMAL(5,2)
);

-- Modify table
ALTER TABLE students ADD email VARCHAR(150);

-- Delete table
DROP TABLE students;
\`\`\`

### DML (Data Manipulation Language)
\`\`\`sql
-- Insert data
INSERT INTO students (name, class, marks) VALUES ('Rahul', '10th', 85.5);

-- Update data
UPDATE students SET marks = 90 WHERE name = 'Rahul';

-- Delete data
DELETE FROM students WHERE id = 1;

-- Select data
SELECT * FROM students WHERE marks > 80 ORDER BY marks DESC;
\`\`\`

### Aggregate Functions
| Function | Description |
|----------|-------------|
| COUNT(*) | Number of rows |
| SUM(col) | Sum of values |
| AVG(col) | Average value |
| MAX(col) | Maximum value |
| MIN(col) | Minimum value |

### GROUP BY and HAVING
\`\`\`sql
SELECT class, AVG(marks) as avg_marks
FROM students
GROUP BY class
HAVING AVG(marks) > 75;
\`\`\`

### Joins
- **INNER JOIN:** Matching rows from both tables
- **LEFT JOIN:** All rows from left + matching from right
- **RIGHT JOIN:** All rows from right + matching from left

## Keys
- **Primary Key:** Unique identifier for each row
- **Foreign Key:** References primary key of another table
- **Candidate Key:** All possible primary keys

## Board Exam Tips
✅ Practice writing queries by hand
✅ Remember: WHERE filters rows, HAVING filters groups
✅ DISTINCT removes duplicates
✅ ORDER BY defaults to ASC (ascending)

## Practice Questions
1. Write a query to find students with marks > 90 in class '10th'
2. Find the average marks per class
3. Write a query to join students and marks tables`,
    tags: 'CBSE, Computer Science, SQL, Databases, Class 12'
  },

  // ===== SOCIAL SCIENCE =====
  'Indian Constitution': {
    content: `# Indian Constitution - CBSE Social Science

## Key Facts
- Written by Dr. B.R. Ambedkar (Chairman of Drafting Committee)
- Constituent Assembly formed in 1946
- Adopted on **26th November 1949** (Constitution Day)
- Came into effect on **26th January 1950** (Republic Day)
- Currently has 470+ Articles and 12 Schedules

## Preamble
The Preamble declares India as a:
**SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC**

Goals: Justice, Liberty, Equality, Fraternity

## Fundamental Rights (Part III)
1. **Right to Equality** (Art. 14-18)
2. **Right to Freedom** (Art. 19-22)
3. **Right against Exploitation** (Art. 23-24)
4. **Right to Freedom of Religion** (Art. 25-28)
5. **Cultural and Educational Rights** (Art. 29-30)
6. **Right to Constitutional Remedies** (Art. 32)

## Directive Principles (Part IV)
- Guide the state in making laws for welfare
- Not enforceable by courts
- Examples: Free education, equal pay, protection of environment

## Fundamental Duties (Art. 51A)
- Added by 42nd Amendment (1976)
- 11 duties of citizens
- Examples: Respect the Constitution, protect sovereignty, promote harmony

## Structure of Government
| Level | Legislature | Executive |
|-------|-----------|-----------|
| Central | Parliament (Lok Sabha + Rajya Sabha) | President, PM, Council of Ministers |
| State | State Legislature | Governor, CM, Council of Ministers |
| Local | Panchayats / Municipalities | Sarpanch / Mayor |

## Important Amendments
- **42nd (1976):** Added "Socialist" and "Secular" to Preamble
- **44th (1978):** Right to Property removed from Fundamental Rights
- **73rd & 74th (1992):** Panchayati Raj and Municipal bodies
- **86th (2002):** Right to Education (Art. 21A)

## Practice Questions
1. What are the key features of the Preamble?
2. List all 6 Fundamental Rights with article numbers
3. Differentiate between Fundamental Rights and Directive Principles
4. Explain the significance of the 73rd Amendment`,
    tags: 'CBSE, Social Science, Indian Constitution, Civics, Polity'
  },

  // ===== ECONOMICS =====
  'Microeconomics': {
    content: `# Microeconomics - CBSE Class 12

## What is Microeconomics?
Study of individual economic units — consumers, firms, and markets.

## Demand

### Law of Demand
When price increases, quantity demanded decreases (ceteris paribus).

### Demand Function
Qd = f(P, Y, Ps, Pc, T, E)
Where: P = price, Y = income, Ps = price of substitutes, Pc = price of complements

### Elasticity of Demand
**Ed = (% change in Qd) / (% change in P)**

| Ed Value | Type | Example |
|----------|------|---------|
| Ed > 1 | Elastic | Luxury goods |
| Ed = 1 | Unitary | — |
| Ed < 1 | Inelastic | Necessities |
| Ed = 0 | Perfectly Inelastic | Salt, medicines |
| Ed = ∞ | Perfectly Elastic | Theoretical |

## Supply

### Law of Supply
When price increases, quantity supplied increases (ceteris paribus).

### Supply Function
Qs = f(P, Pf, T, G, E)

## Market Equilibrium
Equilibrium occurs when **Qd = Qs** (demand equals supply).
- **Excess Demand:** Qd > Qs → Price rises
- **Excess Supply:** Qs > Qd → Price falls

## Production Concepts
- **Total Product (TP):** Total output
- **Average Product (AP):** TP/Units of input
- **Marginal Product (MP):** Change in TP / Change in input
- **Law of Diminishing Returns:** MP eventually decreases

## Cost Concepts
- **Fixed Costs (FC):** Don't change with output (rent, salary)
- **Variable Costs (VC):** Change with output (raw materials)
- **Total Cost:** TC = FC + VC
- **Marginal Cost:** MC = Change in TC / Change in output

## Board Exam Tips
✅ Draw and label diagrams properly
✅ Know the difference between movement along and shift of curves
✅ Practice numerical problems on elasticity
✅ Understand the relationship between TP, AP, and MP

## Practice Questions
1. Explain the law of demand with a diagram
2. Calculate price elasticity if price changes from ₹10 to ₹12 and Qd changes from 100 to 80
3. Differentiate between fixed and variable costs with examples`,
    tags: 'CBSE, Economics, Microeconomics, Demand, Supply, Class 12'
  },
};

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || localStorage.getItem('GROQ_API_KEY') || '';

// AI-style note generation with proper educational content
const generateContent = async (topic, subject, level, board = '') => {
  const lowerTopic = topic.toLowerCase();
  const matchedKey = Object.keys(DETAILED_TEMPLATES).find(k => {
    const lowerK = k.toLowerCase();
    return lowerK === lowerTopic || lowerK.includes(lowerTopic) || lowerTopic.includes(lowerK);
  });

  const levelLabel = level === 'school' ? 'CBSE School' : 'Higher Secondary/College';
  const tags = `${level === 'school' && board ? board + ', ' : ''}${subject}, ${topic}, Study Notes, ${levelLabel}`;

  if (GROQ_API_KEY) {
    try {
      const prompt = `Act as an expert academic tutor. You MUST read the subject first, which is "${subject}", and then the topic, which is "${topic}". Write a Highly Detailed Comprehensive Study Guide in Markdown for this topic precisely within the context of this subject, aimed at ${levelLabel} students. Do not give a generic definition; define it specifically as it applies to ${subject}.
Structure the note exactly as follows:

## 📌 Detailed Overview: What is ${topic} in ${subject}?
Provide an extensive, in-depth definition and explanation explicitly within the context of ${subject}.

## 💡 How & Where is it Used?
Explain how it is used in ${subject}, its real-world/practical applications within this field, and why it's necessary.

## 🔠 Types & Variations
Break down the different types or variations of ${topic} as they apply to ${subject}.

## 🌟 Advantages & ⚠️ Disadvantages
List out pros and cons thoroughly related to its use in ${subject}.

## 🚀 Roadmap to Mastery
Provide a step-by-step phased guide spanning days/weeks to master it.

CRITICAL: Include exactly 2 conceptual markdown images inside the Overview or Types sections using this dynamic structure: ![Image](https://image.pollinations.ai/prompt/${encodeURIComponent(topic)}+diagram+educational+infographic+white+background+minimalist?width=800&height=400)
(Ensure to replace ${encodeURIComponent(topic)} with the actual URL-encoded topic name in the generated image link).
Do NOT output links to videos or PDFs at the end. Only output the markdown structure requested.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.5,
          max_tokens: 3000
        })
      });

      if (response.ok) {
        const data = await response.json();
        return { content: data.choices[0].message.content, tags };
      } else {
        console.error("Groq API fallback required.");
      }
    } catch (e) {
      console.error("Groq AI Error:", e);
    }
  }

  // Removing static mapping fallback to force dynamic generation

  // Fetch real details from Wiki if available
  let dynamicIntro = '';
  try {
    const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
    if (wikiRes.ok) {
      const wikiData = await wikiRes.json();
      if (wikiData.extract) {
        dynamicIntro = wikiData.extract;
      }
    }
  } catch (e) {}

  const finalIntro = dynamicIntro 
    ? dynamicIntro 
    : `**${topic}** is a fundamental, advanced, and crucial concept in **${subject}** for ${levelLabel} students. At its core, ${topic} provides the foundational principles and structural methodology needed to solve complex problems, build robust frameworks, and understand the intricate characteristics of ${subject}.`;

  // Fallback to rich template
  return {
    content: `# ${topic} - Comprehensive Study Guide (${subject})

## 📌 Detailed Overview: What is ${topic} in the context of ${subject}?
${dynamicIntro ? dynamicIntro : `In the study of **${subject}**, **${topic}** is a critical and foundational concept for ${levelLabel} students. It provides the core principles and structural methodology needed to solve complex problems and understand the intrinsic characteristics of this field.`}

![Conceptual Diagram](https://image.pollinations.ai/prompt/${encodeURIComponent(subject)}+${encodeURIComponent(topic)}+diagram+educational+infographic+white+background?width=800&height=400)

## 💡 How & Where is ${topic} Used in ${subject}?
- **Real-World Application:** Within ${subject}, ${topic} is widely used in practical scenarios to improve efficiency, structure, and problem-solving techniques.
- **Industry Use-Cases:** Professionals and academics in ${subject} rely on it to streamline workflows and solve domain-specific challenges.

## 🔠 Types & Variations
While ${topic} has many forms, within ${subject} it is generally divided into:
1. **Primary/Standard Applications**: The most common variation used in everyday problems of this field.
2. **Advanced/Complex Forms**: Used in specialized environments requiring deeper knowledge of ${subject}.

![Types of ${topic}](https://image.pollinations.ai/prompt/types+of+${encodeURIComponent(topic)}+in+${encodeURIComponent(subject)}+educational+chart+white+background?width=800&height=400)

## 🌟 Advantages & ⚠️ Disadvantages
### Advantages:
- Enhances problem-solving capabilities in ${subject}.
- Widely recognized and supported by standard frameworks.

### Disadvantages:
- Can have a steep learning curve for beginners.
- Requires consistent practice and deep conceptual clarity.

## 🚀 Roadmap to Mastery
1. **Understand the Core (Days 1-3):** Focus on the definition, syntax, or formula.
2. **Practice Basics (Days 4-7):** Apply ${topic} to simple problems.
3. **Advanced Implementation (Weeks 2+):** Integrate it with other concepts in ${subject}.

> **Note to Admin:** Please add a Groq API Key (\\\`VITE_GROQ_API_KEY\\\` in .env or via settings) to unlock highly detailed, dynamically written AI generation that fills in specific types, pros/cons, and real-world examples specifically for ${topic}!
`,
    tags
  };
};

// Main function to generate AI-powered notes
export const generateNotes = async (topic, subject = 'General', level = 'school', board = '') => {
  if (!GROQ_API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
  }

  const result = await generateContent(topic, subject, level, board);
  let finalContent = result.content;

  if (!finalContent.includes("🎓 Comprehensive Study Materials")) {
    const encodedTopic = encodeURIComponent(topic + ' ' + subject);
    const encodedSubject = encodeURIComponent(subject);
    const dsBase = 'http://localhost/educera-backend/api/download.php';

    const downloadsSection = level === 'college' ? `
## 🎓 Comprehensive Study Materials

We have organized all necessary resources to master **${topic}** in **${subject}**. You don't have to search anywhere else!

### 📺 1. Video Lectures
- 🎥 **[Watch NPTEL Video Lectures on ${topic}](https://www.youtube.com/results?search_query=${encodedTopic}+NPTEL+lecture)**
- 🎥 **[Watch In-Depth Video Lectures on ${topic}](https://www.youtube.com/results?search_query=${encodedTopic}+lecture)**
- 🎥 **[Animated Tutorials & Explanations](https://www.youtube.com/results?search_query=${encodedTopic}+animation+tutorial)**

### 📚 2. Textbooks & Reference Books
- 📖 **[Download ${subject} Standard Reference Books (PDF)](https://www.google.com/search?q=${encodedSubject}+${encodedTopic}+reference+book+filetype%3Apdf)**
- 📖 **[Simplified Handbooks for ${subject} (PDF)](https://www.google.com/search?q=${encodedSubject}+${encodedTopic}+handbook+study+material+filetype%3Apdf)**

### 📝 3. Detailed Topic Notes
- 📄 **[Download Detailed Notes on ${topic} (PDF)](https://www.google.com/search?q=${encodedTopic}+detailed+notes+filetype%3Apdf)**
- 📄 **[Topper Handwritten Notes (PDF)](https://www.google.com/search?q=${encodedTopic}+handwritten+notes+pdf)**

### 🎯 4. Previous Year Questions (PYQs)
- 🧠 **[GATE & University PYQs on ${topic} (PDF)](https://www.google.com/search?q=${encodedTopic}+GATE+previous+year+questions+with+solutions+filetype%3Apdf)**
- 📝 **[Topic-wise Practice Assignment (PDF)](https://www.google.com/search?q=${encodedTopic}+practice+assignment+questions+filetype%3Apdf)**
` : `
## 🎓 Comprehensive Study Materials

We have organized all necessary resources to master **${topic}** in **${subject}**. You don't have to search anywhere else!

### 📺 1. Video Lectures
- 🎥 **[Watch In-Depth Video Lectures on ${topic}](https://www.youtube.com/results?search_query=${encodedTopic}+class+lecture)**
- 🎥 **[One-Shot Revision Videos](https://www.youtube.com/results?search_query=${encodedTopic}+one+shot+revision)**

### 📚 2. Textbooks & NCERT Solutions
- 📖 **[Download NCERT Textbook Chapter (PDF)](https://www.google.com/search?q=${encodedTopic}+NCERT+chapter+pdf)**
- 📖 **[Reference Books for ${subject} (PDF)](https://www.google.com/search?q=${encodedSubject}+${encodedTopic}+reference+book+class+filetype%3Apdf)**

### 📝 3. Detailed Topic Notes
- 📄 **[Download Detailed Notes on ${topic} (PDF)](https://www.google.com/search?q=${encodedTopic}+class+notes+filetype%3Apdf)**
- 📄 **[Topper Handwritten Notes (PDF)](https://www.google.com/search?q=${encodedTopic}+handwritten+notes+pdf)**

### 🎯 4. Previous Year Questions (PYQs)
- 🧠 **[Board Exams PYQs on ${topic} (Last 10 Years) (PDF)](https://www.google.com/search?q=${encodedTopic}+board+exam+previous+10+year+questions+filetype%3Apdf)**
- 📝 **[Chapter-wise Practice Assignment (PDF)](https://www.google.com/search?q=${encodedTopic}+chapter+practice+questions+filetype%3Apdf)**
`;
    finalContent = finalContent.replace(/## 📥 Downloadable Resources[\s\S]*?(?=##|$)/g, '');
    finalContent += `\n\n${downloadsSection}`;
  }

  return {
    title: `${topic} - ${subject} Notes`,
    content: finalContent,
    subject,
    tags: result.tags,
    is_ai_generated: 1
  };
};

// Get available topics for a subject
export const getTopics = (subject, level = 'school') => {
  const levelTopics = CBSE_TOPICS[level] || CBSE_TOPICS.school;
  return levelTopics[subject] || [];
};

// Get all subjects for a level
export const getAvailableSubjects = (level = 'school') => {
  return Object.keys(CBSE_TOPICS[level] || CBSE_TOPICS.school);
};

// Quick summary generator
export const generateQuickSummary = async (topic, subject) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return `**Quick Summary: ${topic}**\n\n` +
    `This topic covers essential concepts in ${subject}. ` +
    `Focus on understanding definitions, key formulas, and practical applications. ` +
    `Regular practice with NCERT questions and previous year papers is recommended for mastery.`;
};

export default {
  generateNotes,
  getTopics,
  getAvailableSubjects,
  generateQuickSummary
};
