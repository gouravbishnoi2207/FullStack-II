function ValidationMessage({ post, platforms, limits }) {
  return (
    <div>
      <h3>Validation</h3>

      {platforms.length === 0 && (
        <p className="error">
          Please select at least one platform.
        </p>
      )}

      {platforms.map((platform) => (
        <div key={platform}>
          {post.length <= limits[platform] ? (
            <p className="success">
              ✅ {platform}: Valid ({limits[platform] - post.length} characters remaining)
            </p>
          ) : (
            <p className="error">
              ❌ {platform}: Limit exceeded by {post.length - limits[platform]} characters
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ValidationMessage;