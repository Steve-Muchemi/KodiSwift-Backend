const superReactToComment = async (commentId) => {
    try {
        const response = await axios.post(`/api/comments/${commentId}/react`, { reactionType: 'superReact' });
        alert(response.data.message);
    } catch (error) {
        console.error(error.response.data.message);
        alert('Error super-reacting to comment');
    }
 };
 