/**
 * Simple Markdown Renderer Component
 * Converts markdown text to styled HTML for displaying AI-generated notes
 */
export default function MarkdownRenderer({ content, className = '' }) {
  if (!content) return null;

  const renderMarkdown = (text) => {
    let html = text;

    // Escape HTML first
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks (triple backticks)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre class="bg-dark-900 text-white rounded-xl p-4 my-4 overflow-x-auto text-sm leading-relaxed"><code>${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Links: [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary-500 hover:text-primary-600 underline font-medium break-words">$1</a>');

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr />');

    // Tables
    html = html.replace(
      /(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+)/g,
      (match, header, separator, body) => {
        const headers = header.split('|').filter(Boolean).map(h => h.trim());
        const rows = body.trim().split('\n').map(row =>
          row.split('|').filter(Boolean).map(cell => cell.trim())
        );

        let table = '<table><thead><tr>';
        headers.forEach(h => { table += `<th>${h}</th>`; });
        table += '</tr></thead><tbody>';
        rows.forEach(row => {
          table += '<tr>';
          row.forEach(cell => { table += `<td>${cell}</td>`; });
          table += '</tr>';
        });
        table += '</tbody></table>';
        return table;
      }
    );

    // Unordered lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

    // Ordered lists
    html = html.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');

    // Blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    // Paragraphs (lines not starting with HTML tags)
    html = html.replace(/^(?!<[a-z/]|$)(.+)$/gm, '<p>$1</p>');

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');

    // Clean up double line breaks
    html = html.replace(/\n\n/g, '\n');

    return html;
  };

  return (
    <div
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}
