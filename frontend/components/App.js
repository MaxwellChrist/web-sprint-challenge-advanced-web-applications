import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate, Switch } from 'react-router-dom'
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

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/')} 
  const redirectToArticles = () => { navigate('/articles') }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    window.localStorage.removeItem("token");
    setMessage("Goodbye!");
    redirectToLogin();
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
      redirectToArticles()
      setSpinnerOn(false)
    })
    .catch(err => {
      console.log(err);
      debugger;
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
      redirectToLogin()
      setSpinnerOn(false)
    })
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
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
        <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<LoginForm setSpinnerOn={setSpinnerOn} setMessage={setMessage} login={login}/>} />
        <Route element={<ProtectedRoute/>}>
          <Route 
            path="articles"
            element={<Articles
              articles={articles} 
              getArticles={getArticles} 
              deleteArticle={deleteArticle} 
              setCurrentArticleId={setCurrentArticleId}
              /> 
            }
          />
          <Route 
            path="articles" 
            element={<ArticleForm 
              postArticle={postArticle} 
              updateArticle={updateArticle}
              setCurrentArticleId={setCurrentArticleId}
              /> 
            }
          /> 
        </Route>
      </Routes>
      <footer>Bloom Institute of Technology 2022</footer>
    </div>
  </React.StrictMode>
  )
}

/////////////////////////////11111111111111111//////////////////// - most recent and last git push

// return (
//   // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
// <React.StrictMode>
//   <Spinner on={spinnerOn} />
//   <Message message={message}/>
//   <button id="logout" onClick={logout}>Logout from app</button>
//   <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
//     <h1>Advanced Web Applications</h1>
//     <nav>
//       <NavLink id="loginScreen" to="/">Login</NavLink>
//       <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
//     </nav>
//     <Routes>
//       <Route path="/" element={<LoginForm setSpinnerOn={setSpinnerOn} setMessage={setMessage} login={login}/>} />
//       <Route element={<ProtectedRoute/>}>
//         <Route 
//           path="articles"
//           element={<Articles
//             articles={articles} 
//             getArticles={getArticles} 
//             deleteArticle={deleteArticle} 
//             setCurrentArticleId={setCurrentArticleId}
//             /> 
//           }
//         />
//        </Route>

//        <Route element={<ProtectedRoute/>}>
//         <Route 
//           path="articles" 
//           element={<ArticleForm 
//             postArticle={postArticle} 
//             updateArticle={updateArticle}
//             setCurrentArticleId={setCurrentArticleId}
//             /> 
//           }
//         /> 
//       </Route>
//     </Routes>
//     <footer>Bloom Institute of Technology 2022</footer>
//   </div>
// </React.StrictMode>
// )
// }

/////////////////////////////3333333333333333333333333333333333////////////////////

// return (
//   // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
//   <React.StrictMode>
//     <Spinner on={spinnerOn} />
//     <Message message={message} />
//     <button id="logout" onClick={logout}>Logout from app</button>
//     <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
//       <h1>Advanced Web Applications</h1>
//       <nav>
//         <NavLink id="loginScreen" to="/">Login</NavLink>
//         <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
//       </nav>
//       <Routes>
//         <Route path="/" element={<LoginForm setSpinnerOn={setSpinnerOn} setMessage={setMessage} login={login}/>} />
//         <Route path="articles" element={
//           <ProtectedRoute3>
//             <Route
//             path=""
//               component={ArticleForm} 
//               postArticle={postArticle} 
//               updateArticle={updateArticle}
//               setCurrentArticleId={setCurrentArticleId}
//             />
//           </ProtectedRoute3>
//         } />
//         <Route path="articles" element={
//           <ProtectedRoute3>
//             <Route
//               path=""
//               component={Articles} 
//               articles={articles} 
//               getArticles={getArticles} 
//               deleteArticle={deleteArticle} 
//               setCurrentArticleId={setCurrentArticleId}
//             />
//           </ProtectedRoute3>
//         } />
//       </Routes>
//       <footer>Bloom Institute of Technology 2022</footer>
//     </div>
//   </React.StrictMode>
//   )
// }

//////////////////////////////////1////////////////////

{/* <Routes>
<Route path="/" element={<LoginForm setSpinnerOn={setSpinnerOn} setMessage={setMessage} login={login}/>} />
<ProtectedRoute 
  path="articles" 
  component={Articles} 
  articles={articles} 
  getArticles={getArticles} 
  deleteArticle={deleteArticle} 
  setCurrentArticleId={setCurrentArticleId}
/>
<ProtectedRoute 
  path="articles" 
  component={ArticleForm} 
  postArticle={postArticle} 
  updateArticle={updateArticle}
  setCurrentArticleId={setCurrentArticleId}
/>
</Routes> */}

//////////////////////////////////////////////////2//////////////////////////////////////////////////////////////////

// return (
//   // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
// <React.StrictMode>
//   <Spinner on={spinnerOn} />
//   <Message message={message}/>
//   <button id="logout" onClick={logout}>Logout from app</button>
//   <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
//     <h1>Advanced Web Applications</h1>
//     <nav>
//       <NavLink id="loginScreen" to="/">Login</NavLink>
//       <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
//     </nav>
//     <Routes>
//         <Route path="/" element={<LoginForm setSpinnerOn={setSpinnerOn} setMessage = {setMessage} login={login}/>} />
//         <ProtectedRoute2 path="articles">
//           <ArticleForm
//             postArticle={postArticle}
//             updateArticle={updateArticle}
//             setCurrentArticleId={setCurrentArticleId}
//           />
//         </ProtectedRoute2>
//         <ProtectedRoute2 path="articles">
//           <Articles
//             articles={articles} 
//             getArticles={getArticles} 
//             deleteArticle={deleteArticle} 
//             setCurrentArticleId={setCurrentArticleId}
//           />
//         </ProtectedRoute2>
//     </Routes>
//     <footer>Bloom Institute of Technology 2022</footer>
//   </div>
// </React.StrictMode>
// )
// }

//////////////////////////////////////////3///////////////////////////////////////////////////////////////////////////

// return (
//   // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
//   <React.StrictMode>
//     <Spinner on={spinnerOn} />
//     <Message message={message} />
//     <button id="logout" onClick={logout}>Logout from app</button>
//     <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
//       <h1>Advanced Web Applications</h1>
//       <nav>
//         <NavLink id="loginScreen" to="/">Login</NavLink>
//         <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
//       </nav>
//       <Routes>
//         <Route path="/" element={<LoginForm setSpinnerOn={setSpinnerOn} setMessage={setMessage} login={login}/>} />
//         <Route path="articles" element={
//           <ProtectedRoute3>
//             <ArticleForm postArticle={postArticle} updateArticle={updateArticle} setCurrentArticleId={setCurrentArticleId}/>
//           </ProtectedRoute3>
//         } />
//         <Route path="articles" element={
//           <ProtectedRoute3>
//             <Articles articles={articles} getArticles={getArticles} deleteArticle={deleteArticle} setCurrentArticleId={setCurrentArticleId}/>
//           </ProtectedRoute3>
//         } />
//       </Routes>
//       <footer>Bloom Institute of Technology 2022</footer>
//     </div>
//   </React.StrictMode>
//   )
// }
