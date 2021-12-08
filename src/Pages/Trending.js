import React,{useEffect,useState} from 'react'
import Axios from "axios"
import './Trending.css'
import CustomPagination from '../components/Pagination'
import Single from "../components/SingleContent"
const Trending=()=>{
    const [page,setPage]=useState(1);
    const [content,setContent]=useState([]);
    const REACT_APP_KEY="2c6ab853007290b42d26e23d57647816";

const fetchTrending=async()=>{
    
    const {data}=await Axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${REACT_APP_KEY}$page=${page}`);

setContent(data.results);
}

useEffect(()=>{
    fetchTrending();
},[page])
    return(
        <div>
    <span className="page_title">Trending</span>
<div className="trending">
{content && content.map((c)=>
<Single key={c.id} id={c.id} 
poster={c.poster_path}title={c.title||c.name}
date={c.first_air_date || c.release_date}
media_type={c.media_type}
vote_average={c.vote_average}/>) 
 }
    </div>
    <CustomPagination
 setPage={setPage}/>
            </div>
    )
}
export default Trending;