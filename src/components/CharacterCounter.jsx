function CharacterCounter({ post }) {
  return (
    <div className="counter">
      Characters Typed: <strong>{post.length}</strong>
    </div>
  );
}

export default CharacterCounter;