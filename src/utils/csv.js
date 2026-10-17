// CSV helpers for imports.

/**
 * Removes the rows of CSV text that hold no data: blank lines and rows of only commas (as
 * spreadsheet programs write at the end of a file). Line breaks inside quoted fields are kept.
 * Returns the text unchanged when there is nothing to remove.
 */
export function removeEmptyCsvRows(text) {
    const rows = [];
    let start = 0;
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === '"') {
            inQuotes = !inQuotes;
        } else if (!inQuotes && (c === '\n' || c === '\r')) {
            const end = c === '\r' && text[i + 1] === '\n' ? i + 2 : i + 1;
            rows.push(text.slice(start, end));
            start = end;
            i = end - 1;
        }
    }
    if (start < text.length) rows.push(text.slice(start));
    const isEmpty = (row) => /^[\s,]*$/.test(row);
    // A line break at the very end makes an empty last row too.
    if (/[\r\n]$/.test(text) && !inQuotes) rows.push('');
    if (!rows.some(isEmpty)) return text;
    const kept = rows.filter((row) => !isEmpty(row));
    // The file now ends with the last row of data, without a line break after it.
    if (kept.length > 0) kept[kept.length - 1] = kept[kept.length - 1].replace(/(\r\n|\r|\n)$/, '');
    return kept.join('');
}

/** A copy of a CSV File without its empty rows (see removeEmptyCsvRows), or the File itself. */
export async function withoutEmptyCsvRows(file) {
    const text = await file.text();
    const cleaned = removeEmptyCsvRows(text);
    if (cleaned === text) return file;
    return new File([cleaned], file.name, {type: file.type, lastModified: file.lastModified});
}
