import { API } from "../../backend";

export const getBlogsByUserId = async (userId, token) => {
  try {
    const response = await fetch(`${API}/blog/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBlogsById = (blogId, userId, token) => {
  return fetch(`${API}/blog/${userId}/${blogId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createBlog = (blog, userId, token) => {
  return fetch(`${API}/blog/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (blogId, userId, token, blog) => {
  console.log(blog);
  return fetch(`${API}/blog/${userId}/${blogId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteBlog = (blogId, userId, token) => {
  return fetch(`${API}/blog/${userId}/${blogId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
