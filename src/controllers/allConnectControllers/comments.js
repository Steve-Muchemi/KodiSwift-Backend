// Add comment to post
router.post('/posts/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
    const { content, location } = req.body;
    const userId = req.userId; // Assuming userId is set in middleware
    
    // Validate userId against MongoDB here
    
    const isUserValid = true; // Implement user validation logic
    
    if (!isUserValid) {
      return res.status(403).json({ message: 'Invalid user' });
    }
    
    // Validate user location
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Implement location validation logic here using user's location and post's location
    
    const newComment = new Comment({
      postId,
      userId,
      content,
      location,
      reactions: { likes: 0 },
      time: new Date().toISOString()
    });
    
    try {
      const savedComment = await newComment.save();
      res.json(savedComment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  