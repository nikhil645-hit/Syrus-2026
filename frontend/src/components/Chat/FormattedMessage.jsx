function normalizeMessage(content) {
  return String(content || '')
    .replace(/\r\n?/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .trim();
}

function isTableSeparator(line) {
  return /^[\s|:-]+$/.test(line) && line.includes('-');
}

function looksLikeTableHeader(line, nextLine) {
  return line.includes('|') && isTableSeparator(nextLine);
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function parseBlocks(content) {
  const normalized = normalizeMessage(content);
  if (!normalized) {
    return [];
  }

  const lines = normalized.split('\n');
  const blocks = [];

  for (let index = 0; index < lines.length;) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const codeLines = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({
        type: 'code',
        language,
        content: codeLines.join('\n').trimEnd(),
      });
      continue;
    }

    if (looksLikeTableHeader(line, (lines[index + 1] || '').trim())) {
      const headers = splitTableRow(line);
      const rows = [];
      index += 2;

      while (index < lines.length) {
        const rowLine = lines[index].trim();
        if (!rowLine || !rowLine.includes('|')) {
          break;
        }
        if (!isTableSeparator(rowLine)) {
          rows.push(splitTableRow(rowLine));
        }
        index += 1;
      }

      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      index += 1;
      continue;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      const items = [];
      while (index < lines.length) {
        const itemMatch = lines[index].trim().match(/^[-*]\s+(.+)$/);
        if (!itemMatch) {
          break;
        }
        items.push(itemMatch[1]);
        index += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      const items = [];
      while (index < lines.length) {
        const itemMatch = lines[index].trim().match(/^\d+\.\s+(.+)$/);
        if (!itemMatch) {
          break;
        }
        items.push(itemMatch[1]);
        index += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (index < lines.length) {
      const nextLine = lines[index].trim();
      const lineAfter = (lines[index + 1] || '').trim();
      if (
        !nextLine ||
        nextLine.startsWith('```') ||
        /^#{1,6}\s/.test(nextLine) ||
        /^[-*]\s+/.test(nextLine) ||
        /^\d+\.\s+/.test(nextLine) ||
        looksLikeTableHeader(nextLine, lineAfter)
      ) {
        break;
      }
      paragraphLines.push(nextLine);
      index += 1;
    }

    blocks.push({
      type: 'paragraph',
      text: paragraphLines.join('\n'),
    });
  }

  return blocks;
}

function renderInline(text, keyPrefix) {
  const content = String(text || '');
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|<(https?:\/\/[^>\s]+)>|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const nodes = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenPattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <span key={`${keyPrefix}-text-${lastIndex}`}>{content.slice(lastIndex, match.index)}</span>
      );
    }

    if (match[1] && match[2]) {
      nodes.push(
        <a
          key={`${keyPrefix}-link-${match.index}`}
          href={match[2]}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-200"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      nodes.push(
        <a
          key={`${keyPrefix}-url-${match.index}`}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-200 break-all"
        >
          {match[3]}
        </a>
      );
    } else if (match[4]) {
      nodes.push(
        <code
          key={`${keyPrefix}-code-${match.index}`}
          className="rounded bg-navy-800 px-1.5 py-0.5 text-[0.85em] text-cyan-200"
        >
          {match[4]}
        </code>
      );
    } else if (match[5]) {
      nodes.push(
        <strong key={`${keyPrefix}-strong-${match.index}`} className="font-semibold text-white">
          {match[5]}
        </strong>
      );
    } else if (match[6]) {
      nodes.push(
        <em key={`${keyPrefix}-em-${match.index}`} className="italic text-slate-200">
          {match[6]}
        </em>
      );
    }

    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < content.length) {
    nodes.push(
      <span key={`${keyPrefix}-text-tail`}>{content.slice(lastIndex)}</span>
    );
  }

  return nodes.length > 0 ? nodes : [content];
}

function renderParagraph(text, keyPrefix) {
  const lines = text.split('\n');

  return lines.map((line, index) => (
    <span key={`${keyPrefix}-line-${index}`}>
      {renderInline(line, `${keyPrefix}-${index}`)}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

export default function FormattedMessage({ content }) {
  const blocks = parseBlocks(content);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="max-w-full space-y-3">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const headingClasses = {
            1: 'text-lg font-semibold text-white',
            2: 'text-base font-semibold text-white',
            3: 'text-sm font-semibold text-white',
            4: 'text-sm font-semibold text-slate-100',
            5: 'text-xs font-semibold uppercase tracking-wide text-slate-300',
            6: 'text-xs font-semibold uppercase tracking-wide text-slate-400',
          };

          return (
            <div key={`heading-${index}`} className={headingClasses[block.level] || headingClasses[3]}>
              {renderInline(block.text, `heading-${index}`)}
            </div>
          );
        }

        if (block.type === 'paragraph') {
          return (
            <p key={`paragraph-${index}`} className="text-sm leading-7 text-slate-200">
              {renderParagraph(block.text, `paragraph-${index}`)}
            </p>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={`ul-${index}`} className="list-disc pl-5 space-y-2 text-sm leading-7 text-slate-200">
              {block.items.map((item, itemIndex) => (
                <li key={`ul-${index}-${itemIndex}`}>{renderInline(item, `ul-${index}-${itemIndex}`)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={`ol-${index}`} className="list-decimal pl-5 space-y-2 text-sm leading-7 text-slate-200">
              {block.items.map((item, itemIndex) => (
                <li key={`ol-${index}-${itemIndex}`}>{renderInline(item, `ol-${index}-${itemIndex}`)}</li>
              ))}
            </ol>
          );
        }

        if (block.type === 'code') {
          return (
            <div key={`code-${index}`} className="overflow-x-auto rounded-lg border border-navy-600 bg-navy-800/80">
              <pre className="px-3 py-2 text-xs leading-6 text-slate-200">
                <code>{block.content}</code>
              </pre>
            </div>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={`table-${index}`} className="max-w-full overflow-x-auto rounded-lg border border-navy-600 bg-navy-800/40">
              <table className="min-w-full divide-y divide-navy-600 text-left text-xs text-slate-200">
                <thead className="bg-navy-800/80 text-slate-100">
                  <tr>
                    {block.headers.map((header, headerIndex) => (
                      <th key={`table-${index}-header-${headerIndex}`} className="px-3 py-2 font-semibold">
                        {renderInline(header, `table-${index}-header-${headerIndex}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-700">
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`table-${index}-row-${rowIndex}`} className="align-top">
                      {block.headers.map((_, cellIndex) => (
                        <td key={`table-${index}-row-${rowIndex}-cell-${cellIndex}`} className="px-3 py-2 leading-6 text-slate-300 break-words">
                          {renderInline(row[cellIndex] || '', `table-${index}-row-${rowIndex}-cell-${cellIndex}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
