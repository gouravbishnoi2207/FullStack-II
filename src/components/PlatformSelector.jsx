function PlatformSelector({ platforms, setPlatforms }) {
  const handleCheckbox = (event) => {
    const platform = event.target.value;

    if (event.target.checked) {
      setPlatforms([...platforms, platform]);
    } else {
      setPlatforms(
        platforms.filter((item) => item !== platform)
      );
    }
  };

  return (
    <div>
      <h3>Select Platforms</h3>

      <label>
        <input
          type="checkbox"
          value="Twitter"
          onChange={handleCheckbox}
        />
        Twitter
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          value="Facebook"
          onChange={handleCheckbox}
        />
        Facebook
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          value="LinkedIn"
          onChange={handleCheckbox}
        />
        LinkedIn
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          value="Instagram"
          onChange={handleCheckbox}
        />
        Instagram
      </label>
    </div>
  );
}

export default PlatformSelector;