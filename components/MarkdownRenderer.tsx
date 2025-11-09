import React from 'react';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const styleHeader = `style="color: var(--c0)"`;
  const styleText = `style="color: var(--text-color-base)"`;
  const styleMuted = `style="color: var(--text-color-muted)"`;

  const htmlContent = (content || '')
    .trim()
    .split('\n')
    .map((line) => {
      if (line.startsWith('## ')) {
        return `<h2 class="text-3xl font-bold font-heading mt-10 mb-4" ${styleHeader}>${line.substring(
          3
        )}</h2>`;
      }
      if (line.startsWith('### ')) {
        return `<h3 class="text-2xl font-bold font-heading mt-8 mb-3" ${styleHeader}>${line.substring(
          4
        )}</h3>`;
      }
      if (line.startsWith('*   ')) {
        return `<li class="ml-8 list-disc mb-2" ${styleMuted}>${line.substring(
          4
        )}</li>`;
      }
      if (line.trim() === '') {
        return '<br />';
      }
      return `<p class="mb-4 leading-relaxed" ${styleText}>${line}</p>`;
    })
    .join('');

  return (
    <div
      className="prose-base"
      dangerouslySetInnerHTML={{
        __html: htmlContent.replace(/<br \/>(\s*<li)/g, '$1'),
      }}
    />
  );
};

export default MarkdownRenderer;
