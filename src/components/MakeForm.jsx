import { useState, useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import createNew from '../services/create'
import PropTypes from 'prop-types'

const MakeForm = ( { setSuccessMessage, setErrorMessage, setBlogs, user } ) => {
  const togglableRef = useRef()

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setURL] = useState('')

  const handleFormCreate = async (event) => {
    event.preventDefault()
    togglableRef.current.onButtonClick()
    try {
      const data = await createNew({ author: author, url: url, title:title },user)
      if (data.author) {
        const blog = await blogService.getAll()
        setBlogs( blog )
        setSuccessMessage(`Created ${data.title}`)
        setTimeout(() => {
          setSuccessMessage(null)
        },5000)
      }
    }
    catch (exception) {
      setErrorMessage('Invalid Input Given')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  return (
    <Togglable message='create note' ref={togglableRef} altmessage='cancel'>
      <form onSubmit={handleFormCreate}>
        <p>title <input type='text' data-testid = 'title' value = {title} onChange={({ target }) => setTitle(target.value)}/></p>
        <p>author <input type='text' data-testid = 'author' value = {author} onChange={({ target }) => setAuthor(target.value)}/></p>
        <p>url <input type='text' data-testid = 'url' value = {url} onChange={({ target }) => setURL(target.value)}/></p>
        <button type='submit'>create</button>
      </form>
    </Togglable>
  )
}

MakeForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default MakeForm