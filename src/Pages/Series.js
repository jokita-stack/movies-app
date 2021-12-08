import Axios from 'axios'
import './Trending.css'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../components/Pagination'
import Single from '../components/SingleContent'
import Genres from '../components/Genres'
import useGenres from '../components/useGenres'
const Series=()=>{
    const[page,setPage]=useState(1);
    const [content,setContent]=useState([]);
    const [numOfPages,setNumOfPages]=useState();
    const[selectedGenres, setSelectedGenres]=useState([])
    const[genres, setGenres]=useState([]);
    const genreforURL=useGenres(selectedGenres);

    const fetchMovies=async()=>{
        const REACT_APP_KEY="2c6ab853007290b42d26e23d57647816";

        const {data}=await Axios.get(`https://api.themmoviedb.org/3/discover/tv?api_key=${REACT_APP_KEY}$page=${page}&with_genres=${genreforURL}`);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }
useEffect(()=>{
    fetchMovies()
},[page,genreforURL])
    return(
        <div>
            <span className="page_title">TV Series</span>
          <Genres type="tv" selectedGenres={selectedGenres} 
          setSelectedGenres={setSelectedGenres} 
          genres={genres} setGenres={setGenres} setPage={setPage}/>  
<div className="trending">
{content && content.map((c)=>
<Single key={c.id} id={c.id} 
poster={c.poster_path}title={c.title||c.name}
date={c.first_air_date || c.release_date}
media_type="tv"
vote_average={c.vote_average}/>) 
 }
    </div>
    {numOfPages>1 &&(
    <CustomPagination
 setPage={setPage} numOfPages={numOfPages}/>)}
            </div>
    )
}
export default Series;