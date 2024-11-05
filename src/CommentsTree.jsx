import { useState } from 'react';
import './index.css';

const CommentsTree = ({ comments, addComment, deleteComment }) => {
    const [showInput, setShowInput] = useState(null);
    const [commentText, setCommentText] = useState('');

    const handleAdd = (commentId) => {
        if (commentText.trim()) {
            addComment(commentId, commentText.trim());
            setShowInput(null);
            setCommentText('');
        }
    };

    const cancelReply = () => {
        setShowInput(null);
        setCommentText('');
    };

    return (
        <>
            {comments.map((comment) => (
                <div key={comment.id} >
                    <div className="comment">
                        <img
                            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                            alt="User Icon"
                        />
                        <div>
                            <p>{comment.text}</p>
                            {showInput === comment.id && (
                                <input
                                    type="text"
                                    placeholder="Reply..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                            )}
                            <div>
                                {showInput === comment.id ? (
                                    <>
                                        <button onClick={() => handleAdd(comment.id)}>Add</button>
                                        <button onClick={cancelReply}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setShowInput(comment.id)}>Reply</button>
                                        <button onClick={() => deleteComment(comment.id)}>Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {comment.replies.length > 0 && (
                        <div className="comment_replies">
                            <CommentsTree
                                comments={comment.replies}
                                addComment={addComment}
                                deleteComment={deleteComment}
                            />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export default CommentsTree;
