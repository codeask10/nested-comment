import { v4 as uuidv4 } from 'uuid';
export const addCommentsToTree = (comments, commentId, text) => {
    for (const node of comments) {
        if (node.id === commentId) {
            node.replies.unshift({ id: uuidv4(), text, replies: [] });
            return true;
        }
        if (addCommentsToTree(node.replies, commentId, text)) return true;
    }
    return false;
};
export const deleteCommentFromTree = (tree, commentId) => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === commentId) {
            tree.splice(i, 1);
            return true;
        }
        if (deleteCommentFromTree(tree[i].replies, commentId)) return true;
    }
    return false;
};
