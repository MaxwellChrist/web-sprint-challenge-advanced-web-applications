import React, { useState } from 'react'
import { NavLink, Route, useHistory, Switch } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axiosWithAuth from '../axios'
import axios from 'axios';
import ProtectedRoute2 from './ProtectedRoute2'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App(props) {

  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)
  const { push } = useHistory()

  const logout = () => {
    window.localStorage.removeItem("token");
    setMessage("Goodbye!");
    push("/")
  }

  const login = ({ username, password }) => {
    axios.post(loginUrl, {username, password})
    .then(res => {
      window.localStorage.setItem("token", res.data.token)
      setMessage(res.data.message);
      push("/articles")
      setSpinnerOn(false)
    })
    .catch(err => {
      setMessage(err.response.data.message)
      setSpinnerOn(false)
    })
  }

  const getArticles = () => {
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
      setSpinnerOn(false)
    })
  }

  const updateArticle = (article) => {
    setMessage("");
    setSpinnerOn(true)
    const { article_id, ...changes } = article
    axiosWithAuth().put(`${articlesUrl}/${article_id}`, article)
    .then(res => {
      setArticles(articles.map(art => {
        return art.article_id === article_id
          ? res.data.article
          : art
      }))
      setMessage(res.data.message)
      setCurrentArticleId(null)
      setSpinnerOn(false)
    })
    .catch(err => {
      console.log(err)
      debugger
      setSpinnerOn(false)
    })
  }

  const deleteArticle = article_id => {
    setSpinnerOn(true)
    axiosWithAuth().delete(`${articlesUrl}/${article_id}`)
    .then(res => {
      setMessage(res.data.message)
      setArticles(articles.filter(item => {
        return item.article_id !== article_id
      }))
      setSpinnerOn(false)
    })
    .catch(err => {
      console.log(err);
      debugger
      setSpinnerOn(false)
    })
  }

  const updateArticleId = article_id => {
    setCurrentArticleId(article_id)
  }

return (
  <React.StrictMode>
    <Spinner on={spinnerOn} />
    <Message message={message}/>
    <button id="logout" onClick={logout}>Logout from app</button>
    <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
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
                updateArticleId={updateArticleId}
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