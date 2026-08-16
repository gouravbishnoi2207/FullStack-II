import { describe, it, expect } from 'vitest';
import {
    selectDrafts,
    selectDraftsForPlatform,
    selectValidationSummary,
} from './selectors';

describe('composer selectors', () => {
    const state = {
        composer: {
            post: 'Hello world',
            platforms: ['Twitter', 'Instagram'],
            drafts: {
                ids: ['draft-1', 'draft-2'],
                entities: {
                    'draft-1': {
                        id: 'draft-1',
                        post: 'Hello world',
                        platforms: ['Twitter'],
                    },
                    'draft-2': {
                        id: 'draft-2',
                        post: 'Second draft',
                        platforms: ['Instagram'],
                    },
                },
            },
        },
    };

    it('returns the normalized draft list', () => {
        const drafts = selectDrafts(state);

        expect(drafts).toHaveLength(2);
        expect(drafts[0].id).toBe('draft-1');
        expect(drafts[1].id).toBe('draft-2');
    });

    it('filters drafts by selected platform', () => {
        const twitterDrafts = selectDraftsForPlatform(state, 'Twitter');

        expect(twitterDrafts).toHaveLength(1);
        expect(twitterDrafts[0].id).toBe('draft-1');
    });

    it('summarizes platform validation', () => {
        const summary = selectValidationSummary(state);

        expect(summary.selected).toEqual(['Twitter', 'Instagram']);
        expect(summary.valid).toEqual(['Twitter', 'Instagram']);
        expect(summary.invalid).toEqual([]);
    });
});