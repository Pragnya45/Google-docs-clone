import React, { useState, useEffect } from "react";
import Menu from "../core/Menu";
import Base from "../core/Base";
import { useParams } from "react-router-dom";
import { updateBlog, getBlogsById } from "./helper/bloghelper";
import { isAuthenticated } from "../auth/helper";

const Blog = () => {
  const { blogId } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Untitled");
  const { user, token } = isAuthenticated();
  const [autosaveTimer, setAutosaveTimer] = useState(null);

  useEffect(() => {
    loadBlog();
  }, []);

  useEffect(() => {
    const savedTitle = localStorage.getItem(`title_${blogId}`);
    if (savedTitle) {
      setTitle(savedTitle);
    }

    const savedContent = localStorage.getItem(`content_${blogId}`);
    if (savedContent) {
      setContent(savedContent);
    }
  }, [blogId]);

  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      updateBlogInServer();
    }, 30000);

    return () => {
      clearInterval(autosaveInterval);
    };
  });

  const loadBlog = async () => {
    try {
      const isDataInLocalStorage = localStorage.getItem(`dataExists_${blogId}`);
      if (isDataInLocalStorage) {
        const data = await getBlogsById(blogId, user._id, token);
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setTitle(data.title);
          setContent(data.content);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    clearTimeout(autosaveTimer);

    const newAutoSaveTimer = setTimeout(() => {
      localStorage.setItem(`title_${blogId}`, newTitle);
    }, 2000);
    setAutosaveTimer(newAutoSaveTimer);
  };

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
    clearTimeout(autosaveTimer);

    const newAutoSaveTimer = setTimeout(() => {
      localStorage.setItem(`content_${blogId}`, newContent);
    }, 2000);
    setAutosaveTimer(newAutoSaveTimer);
  };

  const updateBlogInServer = async () => {
    try {
      console.log(title, content);
      const updatedBlog = {
        title: title,
        content: content,
      };
      const data = await updateBlog(blogId, user._id, token, updatedBlog);
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("Data updated successfully", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Menu />
      <div className="blog-container">
        <div className="blog-header">
          <input
            type="text"
            className="blog-title"
            placeholder="Enter your title here"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="blog-content">
          <textarea
            className="blog-textarea"
            placeholder="Start writing..."
            value={content}
            onChange={handleContentChange}
          />
        </div>
      </div>
      <Base />
    </div>
  );
};

export default Blog;
