import "./App.css";
import { useState,useEffect} from "react";

import PlatformSelector from "./components/PlatformSelector";
import PostInput from "./components/PostInput";
import CharacterCounter from "./components/CharacterCounter";
import ValidationMessage from "./components/ValidationMessage";
import ImageUploader from "./components/ImageUploader";
import DraftList from "./components/DraftList";

function App() {
  const [post, setPost] = useState("");
  const [platforms, setPlatforms] = useState([]);
 const [image, setImage] = useState(null);
const [drafts, setDrafts] = useState(() => {
  const savedDrafts = localStorage.getItem("drafts");

  return savedDrafts ? JSON.parse(savedDrafts) : [];
});

const [editingDraftId, setEditingDraftId] = useState(null);
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
  localStorage.setItem("drafts", JSON.stringify(drafts));
}, [drafts]);

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
  if (platforms.length === 0) {
    alert("Please select at least one platform.");
    return;
  }

  if (post.trim() === "") {
    alert("Post cannot be empty.");
    return;
  }

  const invalidPlatform = platforms.find(
    (platform) => post.length > limits[platform]
  );

  if (invalidPlatform) {
    alert(`${invalidPlatform} character limit exceeded.`);
    return;
  }

  alert("Post submitted successfully!");
};
const saveDraft = () => {
  if (post.trim() === "") {
    setMessage("Cannot save an empty draft.");
    return;
  }

  setLoading(true);
  setMessage("");

  setTimeout(() => {
    if (editingDraftId !== null) {
      setDrafts(
        drafts.map((draft) =>
          draft.id === editingDraftId
            ? {
                ...draft,
                post: post,
                platforms: platforms,
                image: image,
              }
            : draft
        )
      );

      setEditingDraftId(null);
      setMessage("Draft updated successfully!");
    } else {
      const newDraft = {
        id: Date.now(),
        post: post,
        platforms: platforms,
        image: image,
      };

      setDrafts([...drafts, newDraft]);
      setMessage("Draft saved successfully!");
    }

    setLoading(false);
  }, 500);
};
const editDraft = (draft) => {
  setPost(draft.post);
  setPlatforms(draft.platforms);
  setImage(draft.image);

  setEditingDraftId(draft.id);

  setMessage("Draft loaded for editing.");
};
const deleteDraft = (id) => {
  setDrafts(drafts.filter((draft) => draft.id !== id));

  setMessage("Draft deleted successfully!");
};
  return (
    <div className="container">
      <h1>Social Media Post Composer</h1>

 
<p>    <PlatformSelector
  platforms={platforms}
  setPlatforms={setPlatforms}
/>
  Selected Platforms: {platforms.join(", ")}
</p>
     <PostInput post={post} setPost={setPost} />

<ImageUploader
    image={image}
    setImage={setImage}
    platforms={platforms}
    imageRules={imageRules}
/>
<CharacterCounter post={post} />

      <ValidationMessage
  post={post}
  platforms={platforms}
  limits={limits}
/>
    <button onClick={saveDraft} disabled={loading}>
  {loading
    ? "Saving..."
    : editingDraftId !== null
    ? "Update Draft"
    : "Save Draft"}
</button>
    <button onClick={handleSubmit}>Submit</button>
    {message && (
  <p className="feedback-message">
    {message}
  </p>
)}
    <DraftList
  drafts={drafts}
  onEdit={editDraft}
  onDelete={deleteDraft}
/>

</div>
  );
}

export default App;