function PlatformSelector({ platforms, setPlatforms }) {
  const handleCheckbox = (event) => {
    setPlatforms(event.target.value);
  };

  return (
    <div>
      <h3>Select Platforms</h3>

      <label>
        <input
          type="checkbox"
          value="Twitter"
          checked={platforms.includes("Twitter")}
          onChange={handleCheckbox}
        />
        Twitter
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          value="Facebook"
          checked={platforms.includes("Facebook")}
          onChange={handleCheckbox}
        />
        Facebook
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          value="LinkedIn"
          checked={platforms.includes("LinkedIn")}
          onChange={handleCheckbox}
        />
        LinkedIn
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          value="Instagram"
          checked={platforms.includes("Instagram")}
          onChange={handleCheckbox}
        />
        Instagram
      </label>
    </div>
  );
}

export default PlatformSelector;