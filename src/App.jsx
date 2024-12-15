import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import MakeForm from './components/MakeForm'
import blogService from './services/blogs'
import getLogin from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)

  const [successMesage,setSuccessMessage] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)

  const logoutHandler = (event) => {
    window.localStorage.removeItem('userData')
    setUser(null)
    setSuccessMessage('Logged Out Successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    },5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username,password)

    try {
      const cred = await getLogin(username,password)
      if (cred === null) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      }
      setUser(cred)
      window.localStorage.setItem('userData', JSON.stringify(cred))
      setUsername('')
      setPassword('')
      setSuccessMessage('Logged in Successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }


  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <h2>login to application</h2>
          <p>username <input data-testid='username' type = 'text' value = {username} onChange={({ target }) => setUsername(target.value)}></input></p>
          <p>password <input data-testid='password' type = 'password' value = {password} onChange={({ target }) => setPassword(target.value)}></input></p>
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  const loggedInForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={logoutHandler}>logout</button></p>

        <MakeForm setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} setBlogs={setBlogs} user={user}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
        )}
      </div>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userData')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return <div><Notification msg={errorMessage} type='error'/>
    <Notification msg={successMesage} type='success'/>
    {user === null ? loginForm() : loggedInForm()}
  </div>
}

export default App