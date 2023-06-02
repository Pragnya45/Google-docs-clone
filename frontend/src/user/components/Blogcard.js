import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper/index";
import { deleteBlog, getBlogsByUserId, updateBlog } from "../helper/bloghelper";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength) + "...";
};

const Blogcard = ({
  blogId = "123456",
  userId = "123456",
  title = "Card Title",
  content = "Some quick example text to build on the card title and make up the bulk of the card's content...",
  maxLength = 50, // Maximum number of characters to show
  updateBlog,
}) => {
  const navigate = useNavigate();
  const { user, token } = isAuthenticated();
  const handleOpen = () => {
    navigate(`/${blogId}`);
  };

  const handleDelete = () => {
    deleteBlog(blogId, user._id, token)
      .then((data) => {
        console.log("Delete success");
        // Handle any further actions after successful deletion
        updateBlog();
      })
      .catch((error) => {
        console.log("Delete error:", error);
        // Handle error during deletion
      });
  };

  const truncatedContent = truncateText(content, maxLength);

  return (
    <div
      className="card"
      style={{
        width: "18rem",
        margin: "1rem",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-secondary">{truncatedContent}</p>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary rounded-pill mr-2"
          style={{ marginRight: "0.5rem" }}
          onClick={handleOpen}
        >
          Open
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger rounded-pill"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Blogcard;
