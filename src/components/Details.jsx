import a from '../services/blogs'
import { useState } from 'react'
import Delete from './Delete'

const Details = (props) => {
  const [likes,setLikes] = useState(props.blog.likes)
  const handleClick = async (blog) => {
    const x = await a.putNew(blog)
    setLikes(x)
    a.getAll().then(response => props.setBlogs(response.sort((a,b) => b.likes - a.likes)))
  }

  return (
    <div style={props.style}>
      <p>{props.blog.url}</p>
      <p>likes {likes} <button onClick={() => handleClick(props.blog)}>like</button></p>
      <p>{props.blog.users.name}</p>
      <Delete user={props.user} blogger={props.blog.users} blog={props.blog} setBlogs={props.setBlogs}/>
    </div>
  )
}

export default Details