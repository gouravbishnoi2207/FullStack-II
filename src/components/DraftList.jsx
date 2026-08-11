function DraftList({ drafts, onEdit, onDelete }) {
  return (
    <div className="draft-list">
      <h2>Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No drafts saved yet.</p>
      ) : (
        drafts.map((draft) => (
          <div className="draft-item" key={draft.id}>
            <p>{draft.post}</p>

            <p>
              Platforms: {draft.platforms.join(", ")}
            </p>

            <button onClick={() => onEdit(draft)}>
              Edit
            </button>

            <button onClick={() => onDelete(draft.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DraftList;