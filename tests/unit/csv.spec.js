import {describe, it, expect} from 'vitest';
import {removeEmptyCsvRows, withoutEmptyCsvRows} from '@/utils/csv.js';

describe('removeEmptyCsvRows', () => {
    it('drops a trailing line break', () => {
        expect(removeEmptyCsvRows('a,b\n1,2\n')).toBe('a,b\n1,2');
    });

    it('drops trailing blank and comma-only rows, with CRLF', () => {
        expect(removeEmptyCsvRows('a,b\r\n1,2\r\n,\r\n\r\n')).toBe('a,b\r\n1,2');
    });

    it('handles lone \\r line breaks', () => {
        expect(removeEmptyCsvRows('a,b\r\r1,2\r')).toBe('a,b\r1,2');
    });

    it('drops empty rows in the middle', () => {
        expect(removeEmptyCsvRows('a,b\n\n1,2\n, ,\n3,4')).toBe('a,b\n1,2\n3,4');
    });

    it('keeps line breaks and blank lines inside quoted fields', () => {
        const text = 'name,description\nA,"first line\n\nthird line"\n';
        expect(removeEmptyCsvRows(text)).toBe('name,description\nA,"first line\n\nthird line"');
    });

    it('keeps escaped quotes', () => {
        expect(removeEmptyCsvRows('a\n"say ""hi"""\n')).toBe('a\n"say ""hi"""');
    });

    it('returns text without empty rows unchanged', () => {
        expect(removeEmptyCsvRows('a,b\n1,2')).toBe('a,b\n1,2');
        expect(removeEmptyCsvRows('')).toBe('');
    });
});

describe('withoutEmptyCsvRows', () => {
    it('returns the same File when nothing changes', async() => {
        const file = new File(['a,b\n1,2'], 'x.csv', {type: 'text/csv'});
        expect(await withoutEmptyCsvRows(file)).toBe(file);
    });

    it('returns a cleaned copy with the same name and type', async() => {
        const file = new File(['a,b\n1,2\n\n'], 'x.csv', {type: 'text/csv'});
        const cleaned = await withoutEmptyCsvRows(file);
        expect(cleaned).not.toBe(file);
        expect(cleaned.name).toBe('x.csv');
        expect(cleaned.type).toBe('text/csv');
        expect(await cleaned.text()).toBe('a,b\n1,2');
    });
});
