
router.post('/posts', async (req, res) => {
    const { content, location, distance } = req.body;
  
    const newPost = new Post({
      content,
      location,
      distance
    });
  
    await newPost.save();
  
    res.json({ message: 'Post added successfully', post: newPost });
  });
  