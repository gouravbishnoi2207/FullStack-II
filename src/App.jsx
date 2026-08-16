import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PlatformSelector from "./components/PlatformSelector";
import PostInput from "./components/PostInput";
import CharacterCounter from "./components/CharacterCounter";
import ValidationMessage from "./components/ValidationMessage";
import ImageUploader from "./components/ImageUploader";
import DraftList from "./components/DraftList";
import LoginForm from "./components/LoginForm";
import RoleDashboard from "./components/RoleDashboard";
import CalendarScheduler from "./components/CalendarScheduler";
import {
  deleteDraft,
  loadDraftsFromLocalStorage,
  saveDraft,
  setImage,
  setLoading,
  setMessage,
  startEditingDraft,
  togglePlatform,
  updatePost,
} from "./features/composer/composerSlice";
import {
  selectDrafts,
  selectPlatforms,
  selectPost,
} from "./features/composer/selectors";
import { canAccessRoute, hasPermission } from "./features/auth/rbac";

function App() {
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const platforms = useSelector(selectPlatforms);
  const image = useSelector((state) => state.composer.image);
  const drafts = useSelector(selectDrafts);
  const editingDraftId = useSelector((state) => state.composer.editingDraftId);
  const message = useSelector((state) => state.composer.message);
  const loading = useSelector((state) => state.composer.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role || 'viewer');

  useEffect(() => {
    dispatch(loadDraftsFromLocalStorage());
  }, [dispatch]);

  const limits = {
    Twitter: 280,
    Facebook: 63206,
    LinkedIn: 3000,
    Instagram: 2200,
  };

  const imageRules = {
    Twitter: {
      character: 280,
      required: false,
      maxSize: 5 * 1024 * 1024,
    },
    Facebook: {
      required: false,
      maxSize: 10 * 1024 * 1024,
    },
    LinkedIn: {
      required: false,
      maxSize: 5 * 1024 * 1024,
    },
    Instagram: {
      required: true,
      maxSize: 8 * 1024 * 1024,
    },
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      alert("Please login before submitting the post.");
      return;
    }

    if (platforms.length === 0) {
      alert("Please select at least one platform.");
      return;
    }

    if (post.trim() === "") {
      alert("Post cannot be empty.");
      return;
    }

    const invalidPlatform = platforms.find((platform) => post.length > limits[platform]);

    if (invalidPlatform) {
      alert(`${invalidPlatform} character limit exceeded.`);
      return;
    }

    alert("Post submitted successfully!");
  };

  const handleSaveDraft = () => {
    if (!isAuthenticated) {
      alert("Please login before saving a draft.");
      return;
    }

    if (post.trim() === "") {
      dispatch(setMessage("Cannot save an empty draft."));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setMessage(""));

    setTimeout(() => {
      dispatch(saveDraft());
      dispatch(setLoading(false));
    }, 500);
  };

  const handleEditDraft = (draft) => {
    dispatch(startEditingDraft(draft));
  };

  const handleDeleteDraft = (id) => {
    dispatch(deleteDraft(id));
  };

  return (
    <div className="container">
      <h1>Social Media Post Composer</h1>

      <LoginForm />

      {isAuthenticated && (
        <>
          <RoleDashboard />

          {canAccessRoute(userRole, 'editor') && (
            <>
              <p>
                <PlatformSelector
                  platforms={platforms}
                  setPlatforms={(platform) => dispatch(togglePlatform(platform))}
                />
                Selected Platforms: {platforms.join(", ") || "None"}
              </p>

              <PostInput post={post} setPost={(value) => dispatch(updatePost(value))} />

              <ImageUploader
                image={image}
                setImage={(nextImage) => dispatch(setImage(nextImage))}
                platforms={platforms}
                imageRules={imageRules}
              />

              <CharacterCounter post={post} />

              <ValidationMessage post={post} platforms={platforms} limits={limits} />

              {hasPermission(userRole, 'create_post') && (
                <button onClick={handleSaveDraft} disabled={loading}>
                  {loading ? "Saving..." : editingDraftId !== null ? "Update Draft" : "Save Draft"}
                </button>
              )}

              {hasPermission(userRole, 'edit_post') && (
                <button onClick={handleSubmit}>Submit</button>
              )}

              {message && <p className="feedback-message">{message}</p>}

              {hasPermission(userRole, 'view_dashboard') && (
                <>
                  <CalendarScheduler />
                  <DraftList drafts={drafts} onEdit={handleEditDraft} onDelete={handleDeleteDraft} />
                </>
              )}
            </>
          )}

          {!canAccessRoute(userRole, 'editor') && (
            <p className="error">Access denied: editor permissions required.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;