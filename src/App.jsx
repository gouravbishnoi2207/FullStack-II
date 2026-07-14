import "./App.css";
import { useState } from "react";

import PlatformSelector from "./components/PlatformSelector";
import PostInput from "./components/PostInput";
import CharacterCounter from "./components/CharacterCounter";
import ValidationMessage from "./components/ValidationMessage";
import ImageUploader from "./components/ImageUploader";

function App() {
  const [post, setPost] = useState("");
  const [platforms, setPlatforms] = useState([]);
 const [image, setImage] = useState(null);

  const limits = {
  Twitter: 280,
  Facebook: 63206,
  LinkedIn: 3000,
  Instagram: 2200,
};

const imageRules = {
  Twitter: {
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

  return (
    <div className="container">
      <h1>Social Media Post Composer</h1>

     <PlatformSelector
  platforms={platforms}
  setPlatforms={setPlatforms}
/>
<p>
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
    <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;