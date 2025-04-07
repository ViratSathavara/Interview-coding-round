import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const FetchExample = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingId, setEditingId] = useState(null);

  // GET Request - Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // POST Request - Create new post
  const createPost = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      const fakeNewPost = { ...data, id: Date.now() }; // unique fake ID
      setPosts([...posts, fakeNewPost]);
      setNewPost({ title: "", body: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

    // Start editing mode
    const startEditing = (post) => {
        setEditingId(post.id);
        setNewPost({ title: post.title, body: post.body });
      };

  // PUT Request - Update post
  const saveUpdate = async () => {
    try {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      setPosts(
        posts.map((post) =>
          post.id === editingId ? { ...post, ...newPost } : post
        )
      );
      setEditingId(null);
      setNewPost({ title: "", body: "" });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // DELETE Request - Delete post
  const deletePost = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Fetch API CRUD Example</h2>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
      {editingId ? (
        <button onClick={saveUpdate}>Save Update</button>
      ) : (
        <button onClick={createPost}>Create Post</button>
      )}

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "10px" }}>
            <strong>{post.title}</strong>: {post.body}
            <div>
              <button onClick={() => startEditing(post)}>Edit</button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchExample;
