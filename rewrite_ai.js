const fs = require('fs');

const targetFile = 'frontend/src/services/ai.js';
let content = fs.readFileSync(targetFile, 'utf8');

const startMarker = "// AI-style note generation with proper educational content";
const fallbackStringStart = "const generateContent = (topic, subject, level, board = '') => {";

const index = content.indexOf(startMarker);
if (index !== -1) {
    const endMarker = "  return levelTopics[subject] || [];\n};";
    const endIndex = content.indexOf(endMarker);
    const newFileContent = content.slice(0, index) + `const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || localStorage.getItem('GROQ_API_KEY') || '';

// AI-style note generation with proper educational content
const generateContent = async (topic, subject, level, board = '') => {
  const lowerTopic = topic.toLowerCase();
  const matchedKey = Object.keys(DETAILED_TEMPLATES).find(k => {
    const lowerK = k.toLowerCase();
    return lowerK === lowerTopic || lowerK.includes(lowerTopic) || lowerTopic.includes(lowerK);
  });

  const levelLabel = level === 'school' ? 'CBSE School' : 'Higher Secondary/College';
  const tags = \`\${level === 'school' && board ? board + ', ' : ''}\${subject}, \${topic}, Study Notes, \${levelLabel}\`;

  if (GROQ_API_KEY) {
    try {
      const prompt = \`Act as an expert academic tutor. Write a Highly Detailed Comprehensive Study Guide in Markdown for "\${topic}" in the subject "\${subject}" aimed at \${levelLabel} students.
Structure the note exactly as follows:
## 📌 Detailed Overview: What is \${topic}?
Provide an extensive, in-depth definition and explanation.

## 💡 Why use \${topic}? (Use-Cases & Necessity)
Explain why we use it, real-world examples, and why it's chosen over alternatives.

## 🌟 Advantages & ⚠️ Disadvantages
List out pros and cons thoroughly.

## 🔠 Types & Variations
Break down the different types or variations.

## 🚀 Roadmap to Mastery
Provide a step-by-step phased guide spanning days/weeks to master it.

CRITICAL: Include exactly 2 conceptual markdown images inside the Overview or Types sections using this dynamic structure: ![Image](https://image.pollinations.ai/prompt/\${encodeURIComponent(topic)}+diagram+educational+infographic+white+background+minimalist?width=800&height=400)
(Ensure to replace \${encodeURIComponent(topic)} with the actual URL-encoded topic name in the generated image link).
Do NOT output links to videos or PDFs at the end. Only output the markdown structure requested.\`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${GROQ_API_KEY}\`
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

  // Fallback to static mapping if API fails or no key is present
  if (matchedKey) {
    return DETAILED_TEMPLATES[matchedKey];
  }

  // Fallback to rich template
  return {
    content: \`# \${topic} - Comprehensive Study Guide

## 📌 Detailed Overview: What is \${topic}?
**\${topic}** is a fundamental, advanced, and crucial concept in **\${subject}** for \${levelLabel} students. 
At its core, \${topic} provides the foundational principles and structural methodology needed to solve complex problems, build robust frameworks, and understand the intricate characteristics of \${subject}. A rigorous understanding of what \${topic} actually means, its origin, and its core principles is essential for both your academic exams and real-world implementations.

![Conceptual Diagram](https://image.pollinations.ai/prompt/\${encodeURIComponent(topic)}+diagram+educational+infographic+white+background?width=800&height=400)

## 💡 Why use \${topic}? (Use-Cases & Necessity)
### Why \${topic} and not anything else?
Understanding *why* we apply \${topic} is just as important as knowing what it is. 
Compared to other alternative concepts or approaches, \${topic} provides unique, unbeatable benefits:
- **Optimal Efficiency:** It offers a highly structured, scientifically proven way to organize and solve data or problems.
- **Real-world Application:** It acts as the backbone for multiple practical scenarios.

### 🌟 Advantages
- Drastically improves problem-solving speed, logical thinking, and analytical capabilities.
- Extremely scalable, adaptable, and versatile across different scenarios.

### ⚠️ Disadvantages / Challenges
- Can be initially complex and overwhelming to grasp for absolute beginners.
- Requires rigorous, consistent practice and strong theoretical understanding.

## 🔠 Types & Variations in detail
*The study of \${topic} is vast and is generally categorized into several vital types/variations depending on the exact use case:*

**1. Standard / Basic Type**
The most fundamental form of \${topic}, primarily focusing on definitions, basic properties, and simple real-world applications. Excellent for getting started.

**2. Advanced / Specialized Type**
This involves combining principles of \${topic} with other complex concepts within \${subject}. Often constrained by strict conditions and specific edge cases.

## 🚀 How to Start Learning & Implementing \${topic}?
### The Step-by-Step Roadmap to Mastery
Here is a proven, step-by-step roadmap to effectively learn and master \${topic} from scratch, whether you are coding it or solving it mathematically:

**✅ Phase 1: Clear the Basics (Days 1-3)**
- Start by understanding the core definition, architecture, and basic formulas or syntax.
- Refer to simplified block diagrams, flowcharts, or visual aids representing \${topic}.

**✅ Phase 2: Hands-on Implementation (Days 4-7)**
- Write basic examples, solve introductory numerical problems, or build a simple model using \${topic}.

> **Note to Admin:** Please add a Groq API Key (\`VITE_GROQ_API_KEY\` in .env or via settings) to unlock fully dynamic, highly detailed AI generation for every topic!
\`,
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

    const downloadsSection = level === 'college' ? \`
## 🎓 Comprehensive Study Materials

We have organized all necessary resources to master **\${topic}** in **\${subject}**. You don't have to search anywhere else!

### 📺 1. Video Lectures
- 🎥 **[Watch In-Depth Video Lectures on \${topic}](https://www.youtube.com/results?search_query=\${encodedTopic}+lecture)**
- 🎥 **[Animated Tutorials & Explanations](https://www.youtube.com/results?search_query=\${encodedTopic}+animation+tutorial)**

### 📚 2. Textbooks & Reference Books
- 📖 **[Download \${subject} Standard Reference Books (PDF)](https://www.google.com/search?q=\${encodedSubject}+\${encodedTopic}+reference+book+filetype%3Apdf)**
- 📖 **[Simplified Handbooks for \${subject} (PDF)](https://www.google.com/search?q=\${encodedSubject}+\${encodedTopic}+handbook+study+material+filetype%3Apdf)**

### 📝 3. Detailed Topic Notes
- 📄 **[Download Detailed Notes on \${topic} (PDF)](https://www.google.com/search?q=\${encodedTopic}+detailed+notes+filetype%3Apdf)**
- 📄 **[Topper Handwritten Notes (PDF)](https://www.google.com/search?q=\${encodedTopic}+handwritten+notes+pdf)**

### 🎯 4. Previous Year Questions (PYQs)
- 🧠 **[GATE & University PYQs on \${topic} (PDF)](https://www.google.com/search?q=\${encodedTopic}+GATE+previous+year+questions+with+solutions+filetype%3Apdf)**
- 📝 **[Topic-wise Practice Assignment (PDF)](https://www.google.com/search?q=\${encodedTopic}+practice+assignment+questions+filetype%3Apdf)**
\` : \`
## 🎓 Comprehensive Study Materials

We have organized all necessary resources to master **\${topic}** in **\${subject}**. You don't have to search anywhere else!

### 📺 1. Video Lectures
- 🎥 **[Watch In-Depth Video Lectures on \${topic}](https://www.youtube.com/results?search_query=\${encodedTopic}+class+lecture)**
- 🎥 **[One-Shot Revision Videos](https://www.youtube.com/results?search_query=\${encodedTopic}+one+shot+revision)**

### 📚 2. Textbooks & NCERT Solutions
- 📖 **[Download NCERT Textbook Chapter (PDF)](https://www.google.com/search?q=\${encodedTopic}+NCERT+chapter+pdf)**
- 📖 **[Reference Books for \${subject} (PDF)](https://www.google.com/search?q=\${encodedSubject}+\${encodedTopic}+reference+book+class+filetype%3Apdf)**

### 📝 3. Detailed Topic Notes
- 📄 **[Download Detailed Notes on \${topic} (PDF)](https://www.google.com/search?q=\${encodedTopic}+class+notes+filetype%3Apdf)**
- 📄 **[Topper Handwritten Notes (PDF)](https://www.google.com/search?q=\${encodedTopic}+handwritten+notes+pdf)**

### 🎯 4. Previous Year Questions (PYQs)
- 🧠 **[Board Exams PYQs on \${topic} (Last 10 Years) (PDF)](https://www.google.com/search?q=\${encodedTopic}+board+exam+previous+10+year+questions+filetype%3Apdf)**
- 📝 **[Chapter-wise Practice Assignment (PDF)](https://www.google.com/search?q=\${encodedTopic}+chapter+practice+questions+filetype%3Apdf)**
\`;
    finalContent = finalContent.replace(/## 📥 Downloadable Resources[\\s\\S]*?(?=##|$)/g, '');
    finalContent += \`\\n\\n\${downloadsSection}\`;
  }

  return {
    title: \`\${topic} - \${subject} Notes\`,
    content: finalContent,
    subject,
    tags: result.tags,
    is_ai_generated: 1
  };
};

// Get available topics for a subject
export const getTopics = (subject, level = 'school') => {
` + content.slice(endIndex);
    fs.writeFileSync(targetFile, newFileContent, 'utf8');
}
