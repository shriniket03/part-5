import { useState } from 'react'
import Details from './Details'

const Blog = ({ blog, key, setBlogs, user }) => {
  const [message,setMessage] = useState('view')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailStyle,setDetail] = useState({ display:'none' })

  const handleButtonClick = () => {
    if (message==='view') {
      setMessage('hide')
      setDetail({ display:'' })
    }
    else {
      setMessage('view')
      setDetail({ display:'none' })
    }
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}<button onClick={handleButtonClick}>{message}</button>
      <Details style={detailStyle} blog={blog} setBlogs={setBlogs} user={user}/>
    </div>
  )
}

export default Blog
