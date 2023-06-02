import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { signout } from "../auth/helper/index";
import Menu from "./Menu";
import Blogcard from "../user/components/Blogcard";
import { getBlogsByUserId, createBlog } from "../user/helper/bloghelper";
import { isAuthenticated } from "../auth/helper/index";

const Home = () => {
  const navigate = useNavigate();
  const { user, token } = isAuthenticated();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  useEffect(() => {
    loadAllBlogs();
  }, []);

  const loadAllBlogs = async () => {
    try {
      const data = await getBlogsByUserId(user._id, token);
      console.log(data);
      if (data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        console.log(data);
        setBlogs(data);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const updateBlog = () => {
    loadAllBlogs();
  };

  const handleNewDoc = async () => {
    setIsLoading(true); // Start loading

    const newBlog = {
      title: "Untitled",
      content: "",
      userId: user._id,
    };

    try {
      const data = await createBlog(newBlog, user._id, token);
      setIsLoading(false); // Stop loading
      console.log("Blog created successfully", data);
      console.log(data.id);
      navigate(`/${data.id}`);
    } catch (error) {
      setIsLoading(false); // Stop loading
      console.log("Error creating blog:", error);
    }
  };

  return (
    <div>
      <Menu />
      <div className="blogcard-container">
        {blogs &&
          blogs.map((blog, index) => {
            return (
              <div key={index}>
                <Blogcard
                  blogId={blog._id}
                  userId={blog.user}
                  title={blog.title}
                  content={blog.content}
                  updateBlog={updateBlog}
                />
              </div>
            );
          })}
      </div>
      <div className="new-doc-button">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleNewDoc} // Modified onClick event handler
        >
          {isLoading ? (
            <div className="loader-overlay">
              <div className="loader-container">
                <div className="loader"></div>
                <p>Creating new document for you...</p>
              </div>
            </div>
          ) : (
            "New Doc"
          )}
        </button>
      </div>
      <Base />
    </div>
  );
};

export default Home;
