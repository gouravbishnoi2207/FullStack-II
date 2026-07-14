function PostInput({ post, setPost }) {
  return (
    <div>
      <h3>Write Your Post</h3>

      <textarea
        rows="8"
        cols="60"
        placeholder="Write your post here..."
        value={post}
        onChange={(event) => setPost(event.target.value)}
      ></textarea>
    </div>
  );
}

export default PostInput;