import blogService from '../services/blogs'

const Delete = (props) => {
  const deleteHandler = async (blog,token) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const x = await blogService.deleteBlog(blog,token)
      blogService.getAll().then(response => props.setBlogs(response.sort((a,b) => b.likes - a.likes)))
    }
    return null
  }
  if (props.user.username === props.blogger.username) {
    return <button onClick={() => deleteHandler(props.blog, props.user.token)}>remove</button>
  }
  else {
    return null
  }
}

export default Delete