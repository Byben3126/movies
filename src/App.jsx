import { useEffect, useState } from 'react'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import ListCard from './components/ListCard'
import Movie from './components/Movie'

import {getGenres as getGenresAPI, discoverMovies} from "./api"

function App() {
  const [query, setQuery] = useState('')
  const [genreData, setGenreData] = useState([])
  const [genreId, setGenreId] = useState(null)

  const [pageContent, setPageContent] = useState([])
  const [pageSelect, setPageSelect] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [movieIdSelect, setMovieIdSelect] = useState(null)



  useEffect(()=> {
    getGenres()
    getMovie()
  },[])

  useEffect(()=> {
    setPageContent([])
    setPageSelect(0)
    setTotalPage(0)
    getMovie()
  },[genreId, query])


  useEffect(()=> {
    if (!pageContent[pageSelect]) {
      getMovie(pageSelect+1)
    }
  },[pageSelect])

  const getGenres = async ()=> {
    const result = await getGenresAPI();
    setGenreData(result)
  }

  const getMovie = async (page = 1) => {
      try {
          const contentPerPage = [...pageContent]
          const {results, total_pages} = await discoverMovies(page, genreId, query);
          contentPerPage[page-1] = results.slice(0, 10)
          if (results.length > 10) {
              contentPerPage[page] = results.slice(10, 20)
          }
          setTotalPage(total_pages)
          setPageContent(contentPerPage)
  
      } catch (err) {}
  }

  
  return (
    <div className='dark:bg-gray-900 h-screen flex flex-col'>
      <Header query={{get: query, set: setQuery}} genreSelect={{get: genreId, set: setGenreId}}  genres={genreData}/>
      <div className='flex-grow h-0 overflow-y-auto'>


      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<ListCard pageContent={pageContent} pageSelect={{get: pageSelect, set: setPageSelect}} totalPage={{get: totalPage, set:setTotalPage}} movieIdSelect={{set:setMovieIdSelect,get:movieIdSelect}}/>} />
            <Route path="movie" element={<Movie movieIdSelect={{set:setMovieIdSelect,get:movieIdSelect}}/>} />
            <Route path="*" element={<ListCard pageContent={pageContent} pageSelect={{get: pageSelect, set: setPageSelect}} totalPage={{get: totalPage, set:setTotalPage}} movieIdSelect={{set:setMovieIdSelect,get:movieIdSelect}}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
        
      </div>
     
    </div>
  )
}

export default App
