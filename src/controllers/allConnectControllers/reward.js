router.post('/comments/:commentId/react', async (req, res) => {
    const commentId = req.params.commentId;
    const { reactionType } = req.body;

    try {
        // Find the comment by ID
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Update reactions count
        comment.reactions[reactionType] += 1;
        await comment.save();

        // Reward points based on reaction type
        let rewardPoints = 0;
        switch (reactionType) {
            case 'likes':
                rewardPoints = 1;
                break;
            case 'dislikes':
                rewardPoints = -1; // Negative points for dislikes
                break;
            case 'love':
                rewardPoints = 2;
                break;
            case 'superReact':
                rewardPoints = 5; // More points for superReact
                break;
            default:
                break;
        }

        // Update user's reward points
        const user = await User.findById(req.user.id);
        user.rewardPoints += rewardPoints;
        await user.save();

        res.json({ message: `Reacted with ${reactionType} and rewarded ${rewardPoints} points`, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
