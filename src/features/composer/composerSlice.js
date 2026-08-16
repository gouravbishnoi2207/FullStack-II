import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    post: '',
    platforms: [],
    image: null,
    drafts: {
        ids: [],
        entities: {},
    },
    editingDraftId: null,
    message: '',
    loading: false,
};

const saveDraftsToLocalStorage = (drafts) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('drafts', JSON.stringify(drafts));
    }
};

export const loadDraftsFromLocalStorage = createAsyncThunk(
    'composer/loadDrafts',
    async() => {
        if (typeof window === 'undefined') {
            return { ids: [], entities: {} };
        }

        const savedDrafts = window.localStorage.getItem('drafts');
        const draftList = savedDrafts ? JSON.parse(savedDrafts) : [];

        return {
            ids: draftList.map((draft) => draft.id),
            entities: draftList.reduce((accumulator, draft) => {
                accumulator[draft.id] = draft;
                return accumulator;
            }, {}),
        };
    }
);

const composerSlice = createSlice({
    name: 'composer',
    initialState,
    reducers: {
        updatePost: (state, action) => {
            state.post = action.payload;
        },
        togglePlatform: (state, action) => {
            const platform = action.payload;
            if (state.platforms.includes(platform)) {
                state.platforms = state.platforms.filter((item) => item !== platform);
            } else {
                state.platforms.push(platform);
            }
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        startEditingDraft: (state, action) => {
            const draft = action.payload;
            state.post = draft.post;
            state.platforms = [...draft.platforms];
            state.image = draft.image || null;
            state.editingDraftId = draft.id;
            state.message = 'Draft loaded for editing.';
        },
        cancelEditingDraft: (state) => {
            state.editingDraftId = null;
            state.message = '';
        },
        saveDraft: (state) => {
            if (!state.post.trim()) {
                state.message = 'Cannot save an empty draft.';
                return;
            }

            const draftData = {
                id: state.editingDraftId ? state.editingDraftId : Date.now(),
                post: state.post,
                platforms: [...state.platforms],
                image: state.image,
            };

            if (state.editingDraftId !== null) {
                state.drafts.entities[state.editingDraftId] = draftData;
                state.drafts.ids = state.drafts.ids.includes(state.editingDraftId) ?
                    state.drafts.ids : [...state.drafts.ids, state.editingDraftId];
                state.message = 'Draft updated successfully!';
            } else {
                state.drafts.ids.push(draftData.id);
                state.drafts.entities[draftData.id] = draftData;
                state.message = 'Draft saved successfully!';
            }

            state.editingDraftId = null;
            saveDraftsToLocalStorage(Object.values(state.drafts.entities));
        },
        deleteDraft: (state, action) => {
            const id = action.payload;
            state.drafts.ids = state.drafts.ids.filter((draftId) => draftId !== id);
            delete state.drafts.entities[id];
            state.message = 'Draft deleted successfully!';
            saveDraftsToLocalStorage(Object.values(state.drafts.entities));
        },
        clearMessage: (state) => {
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadDraftsFromLocalStorage.fulfilled, (state, action) => {
            state.drafts = action.payload;
        });
    },
});

export const {
    updatePost,
    togglePlatform,
    setImage,
    setMessage,
    setLoading,
    startEditingDraft,
    cancelEditingDraft,
    saveDraft,
    deleteDraft,
    clearMessage,
} = composerSlice.actions;

export default composerSlice.reducer;