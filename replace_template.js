const fs = require('fs');

const targetFile = 'frontend/src/services/ai.js';
let content = fs.readFileSync(targetFile, 'utf8');

const startMarker = "content: `# ${topic} - Study Notes";
const endMarker = "tags: `CBSE, ${subject}, ${topic}, Study Notes, ${levelLabel}`\n  };";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const fullEndIndex = endIndex + endMarker.length;
    
    const newContent = `content: \`# \${topic} - Comprehensive Study Guide

## 📌 Detailed Overview: What is \${topic}?
**\${topic}** is a fundamental, advanced, and crucial concept in **\${subject}** for \${levelLabel} students. 
At its core, \${topic} provides the foundational principles and structural methodology needed to solve complex problems, build robust frameworks, and understand the intricate characteristics of \${subject}. A rigorous understanding of what \${topic} actually means, its origin, and its core principles is essential for both your academic exams and real-world implementations.

## 💡 Why use \${topic}? (Use-Cases & Necessity)
### Why \${topic} and not anything else?
Understanding *why* we apply \${topic} is just as important as knowing what it is. 
Compared to other alternative concepts or approaches, \${topic} provides unique, unbeatable benefits:
- **Optimal Efficiency:** It offers a highly structured, scientifically proven way to organize and solve data or problems.
- **Real-world Application:** It acts as the backbone for multiple practical scenarios.
- **Industry & Academic Standard:** It is the universally accepted standard methodology taught globally.

### 🌟 Advantages
- Drastically improves problem-solving speed, logical thinking, and analytical capabilities.
- Extremely scalable, adaptable, and versatile across different scenarios.
- Lays the absolute necessary foundation for mastering the most advanced concepts in \${subject}.

### ⚠️ Disadvantages / Challenges
- Can be initially complex and overwhelming to grasp for absolute beginners.
- Requires rigorous, consistent practice and strong theoretical understanding.

## 🔠 Types & Variations in detail
*The study of \${topic} is vast and is generally categorized into several vital types/variations depending on the exact use case:*

**1. Standard / Basic Type**
The most fundamental form of \${topic}, primarily focusing on definitions, basic properties, and simple real-world applications. Excellent for getting started.

**2. Advanced / Specialized Type**
This involves combining principles of \${topic} with other complex concepts within \${subject}. Often constrained by strict conditions and specific edge cases.

**3. Hybrid / Integrated Systems**
Advanced scenarios and highly complex integrations. This type is critical for cutting-edge applications and frequently tested in competitive entrance exams.

## 🚀 How to Start Learning & Implementing \${topic}?
### The Step-by-Step Roadmap to Mastery
Here is a proven, step-by-step roadmap to effectively learn and master \${topic} from scratch, whether you are coding it or solving it mathematically:

**✅ Phase 1: Clear the Basics (Days 1-3)**
- Start by understanding the core definition, architecture, and basic formulas or syntax.
- Refer to simplified block diagrams, flowcharts, or visual aids representing \${topic}.

**✅ Phase 2: Hands-on Implementation (Days 4-7)**
- Write basic examples, solve introductory numerical problems, or build a simple model using \${topic}.
- Do not move forward until you can confidently solve simple applications without looking at the solutions.

**✅ Phase 3: Advanced Problem Solving (Week 2)**
- Dive deep into edge-cases, exceptions, and highly complex numericals/scenarios.
- Identify patterns in how questions are framed around \${topic} in previous exams.

**✅ Phase 4: Practice & Mock Tests (Week 3 onwards)**
- Test your rigorous knowledge using timed assignments.
- Complete all NCERT/University textbook exercises related to \${topic}.
- Re-evaluate mistakes constantly and refer back to core principles.\`,
    tags: \`CBSE, \${subject}, \${topic}, Study Notes, \${levelLabel}\`
  };`;

    content = content.slice(0, startIndex) + newContent + content.slice(fullEndIndex);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('Successfully replaced content.');
} else {
    console.log('Markers not found: start is -1 ? ', startIndex, ' end is -1 ? ', endIndex);
}
