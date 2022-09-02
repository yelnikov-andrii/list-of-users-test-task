import { useEffect, useState } from "react";
import { getPosts } from "./api";

export const Posts = ({ selectedUserId }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts(selectedUserId)
      .then(res => {
        setPosts(res)
        console.log(res)
        console.log(selectedUserId)
      })
  }, [selectedUserId])
  return (
    <div>
      <h2 className="title">Posts:</h2>
      <ul className='list list--posts'>
        {posts.map(post => (
          <li className='list__item' key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  )
};