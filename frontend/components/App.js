import React, { useState } from 'react'
import { NavLink, Route, useHistory, Switch } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axiosWithAuth from '../axios'
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute'
import ProtectedRoute2 from './ProtectedRoute2'
import ProtectedRoute3 from './ProtectedRoute3'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App(props) {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  const { push } = useHistory()

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    window.localStorage.removeItem("token");
    setMessage("Goodbye!");
    push("/")
  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!

    axios.post(loginUrl, {username, password})
    .then(res => {
      window.localStorage.setItem("token", res.data.token)
      setMessage(res.data.message);
      push("/articles")
      setSpinnerOn(false)
    })
    .catch(err => {
      setMessage(err.response.data.message)
    })
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!

    setMessage("");
    setSpinnerOn(true)
    axiosWithAuth().get('http://localhost:9000/api/articles')
    .then(res => {
      setArticles(res.data.articles);
      setMessage(res.data.message)
      setSpinnerOn(false)
    })
    .catch(err => {
      console.log(err);
      setSpinnerOn(false)
      push("/")
    })
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setMessage("");
    setSpinnerOn(true)
    axiosWithAuth().post(articlesUrl, article)
    .then(res => {
      console.log(res)
      setArticles([...articles, res.data.article])
      setMessage(res.data.message);
      setSpinnerOn(false)
    })
    .catch(err => {
      console.log(err)
      debugger
    })
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
    axiosWithAuth().put(`${articlesUrl}/${article_id}`, article)
    .then(res => {
      console.log(res)
      debugger
    })
    .catch(err => {
      console.log(err)
      debugger
    })
  }

  const deleteArticle = article_id => {
    // ✨ implement
    setSpinnerOn(true)
    axiosWithAuth().delete(`${articlesUrl}/${article_id}`)
    .then(res => {
      setMessage(res.data.message)
      setArticles(articles.filter(item => {
        return item.article_id !== article_id
      }))
      setSpinnerOn(true)
    })
    .catch(err => {
      console.log(err);
      debugger
      setSpinnerOn(true)
    })
  }

return (
  // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
  <React.StrictMode>
    <Spinner on={spinnerOn} />
    <Message message={message}/>
    <button id="logout" onClick={logout}>Logout from app</button>
    <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
      <h1>Advanced Web Applications</h1>
      <nav>
        <NavLink id="loginScreen" to="/">Login</NavLink>
        <NavLink id="articlesScreen" to={!window.localStorage.getItem("token") ? "/" : "/articles"}>Articles</NavLink>
      </nav>
        <Switch>
          <ProtectedRoute2 path="/articles">
              <ArticleForm 
                postArticle={postArticle} 
                updateArticle={updateArticle}
                article={articles.find(item => item.article_id === currentArticleId)}
                currentArticleId={currentArticleId}
                setCurrentArticleId={setCurrentArticleId}
            /> 
            <Articles
                articles={articles} 
                getArticles={getArticles} 
                deleteArticle={deleteArticle} 
                setCurrentArticleId={setCurrentArticleId}
                updateArticle={updateArticle}
            />
          </ProtectedRoute2>
          <Route exact path="/">
            <LoginForm setSpinnerOn={setSpinnerOn} setMessage={setMessage} login={login}/>
          </Route>
        </Switch>
      <footer>Bloom Institute of Technology 2022</footer>
    </div>
  </React.StrictMode>
  )
}