import React, {useState } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
   Routes,
   Route
} from "react-router-dom";

const App = () => {
  const apiKey = "6e62913b832c41da9e400a73a55dc1f3"
  const [progress, setprogress] = useState(0)

  const setProgress = (progress) => {
    setprogress(progress)
  }
    return (
      <Router>
      <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <NavBar />
        <Routes>
          <Route  path="/" element={<News setProgress = {setProgress} apiKey = {apiKey} key="general" pageSize = {10} category = "general"/>}></Route>
          <Route  path="/business" element={<News setProgress = {setProgress} apiKey = {apiKey} key="business" pageSize = {10} category = "business"/>}></Route>
          <Route  path="/entertainment" element={<News setProgress = {setProgress} apiKey = {apiKey} key="entertainment" pageSize = {10} category = "entertainment"/>}></Route> 
          <Route  path="/health" element={<News setProgress = {setProgress} apiKey = {apiKey} key="health" pageSize = {10} category = "health"/>}></Route>
          <Route  path="/science" element={<News setProgress = {setProgress} apiKey = {apiKey} key="science" pageSize = {10} category = "science"/>}></Route>
          <Route  path="/sports" element={<News setProgress = {setProgress} apiKey = {apiKey} key="sports" pageSize = {10} category = "sports"/>}></Route>
          <Route  path="/technology" element={<News setProgress = {setProgress} apiKey = {apiKey} key="technology" pageSize = {10} category = "technology"/>}></Route>
        </Routes>
      </div>
      </Router>
    )
}

export default App
