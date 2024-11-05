import { useState } from 'react';
import initialData from './data';
import CommentsTree from './CommentsTree';
import { v4 as uuidv4 } from 'uuid';
import { addCommentsToTree, deleteCommentFromTree } from './utility/Add&DeleteComments';

const App = () => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(initialData);

  const addComment = (commentId, text) => {
    if (!text.trim()) return;

    if (commentId === -1) {
      const newComments = [...comments];
      newComments.unshift({ id: uuidv4(), text, replies: [] });
      setComments(newComments);
    } else {
      const newState = [...comments];
      addCommentsToTree(newState, commentId, text);
      setComments(newState);
    }
  };

  const deleteComment = (commentId) => {
    const newState = [...comments]
    deleteCommentFromTree(newState, commentId);
    setComments(newState);
  };

  return (
    <>
      <h1>Comments</h1>
      <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Add comment..."
          value={commentText}
          autoFocus
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          onClick={() => {
            addComment(-1, commentText);
            setCommentText('');
          }}
        >
          Add
        </button>
      </div>
      <CommentsTree comments={comments} addComment={addComment} deleteComment={deleteComment} />
    </>
  );
};

export default App;

