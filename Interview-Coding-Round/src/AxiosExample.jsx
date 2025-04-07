import React, { useEffect, useState } from "react";
import axios from "axios";
import FetchExample from "./FetchExample";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingId, setEditingId] = useState(null); // Track the post being edited

  // GET Request (Fetch all posts)
  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // POST Request (Create a new post)
  const createPost = async () => {
    try {
      const response = await axios.post(API_URL, newPost);
      const fakeNewPost = { ...response.data, id: Date.now() }; // Generate unique ID
      setPosts([...posts, fakeNewPost]);
      setNewPost({ title: "", body: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Start editing a post - populate the input fields
  const startEditing = (post) => {
    setEditingId(post.id);
    setNewPost({ title: post.title, body: post.body });
  };

  // PUT Request (Update a post)
  const saveUpdate = async () => {
    try {
      const updatedData = { ...newPost };
      await axios.put(`${API_URL}/${editingId}`, updatedData);
      setPosts(
        posts.map((post) =>
          post.id === editingId ? { ...post, ...updatedData } : post
        )
      );
      setEditingId(null); // Exit editing mode
      setNewPost({ title: "", body: "" }); // Clear input fields
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // DELETE Request (Delete a post)
  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPosts(posts.filter((post) => post.id !== id)); // Remove deleted post from state
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Axios CRUD Example</h2>
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

export default App;
