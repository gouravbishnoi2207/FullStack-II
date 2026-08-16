import { createSelector } from '@reduxjs/toolkit';

export const selectComposer = (state) => state.composer;
export const selectPost = (state) => state.composer.post;
export const selectPlatforms = (state) => state.composer.platforms;
export const selectDraftsState = (state) => state.composer.drafts;

export const selectDrafts = createSelector([selectDraftsState], (drafts) =>
    drafts.ids.map((id) => drafts.entities[id]).filter(Boolean)
);

export const selectDraftsForPlatform = createSelector(
    [selectDrafts, (state, platform) => platform],
    (drafts, platform) => drafts.filter((draft) => draft.platforms.includes(platform))
);

export const selectValidationSummary = createSelector([selectPost, selectPlatforms], (post, platforms) => {
    const limits = {
        Twitter: 280,
        Facebook: 63206,
        LinkedIn: 3000,
        Instagram: 2200,
    };

    const summary = {
        selected: platforms,
        valid: [],
        invalid: [],
    };

    platforms.forEach((platform) => {
        if (post.length <= limits[platform]) {
            summary.valid.push(platform);
        } else {
            summary.invalid.push(platform);
        }
    });

    return summary;
});