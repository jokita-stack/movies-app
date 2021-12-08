import { Button, createTheme, TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import SearchIcon from "@material-ui/icons/Search"
import { Tabs,Tab } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Single from '../components/SingleContent';
import CustomPagination from '../components/Pagination';
import './Trending.css'

const Search=()=>{
    const REACT_APP_KEY="2c6ab853007290b42d26e23d57647816";

    const [type,setType]=useState(0);
    const[page,setPage]=useState(1);
    const [searchText,setSearchText]=useState("");
    const[content,setContent]=useState();
    const [numOfPages,setNumOfPages]=useState();

    const darkTheme=createTheme({
        palette:{
            type:"dark",
            primary:{
                main:"#fff",
            }
        }
    });

    const fetchSearch=async()=>{
      const {data}=  await Axios.get(
            `https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${REACT_APP_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        )
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }
    useEffect(()=>{
        window.scroll(0,0);
        fetchSearch();
    },[type,page])
    return(
        <div >
            <ThemeProvider theme={darkTheme}>
                <div style={{display:"flex",margin:"15px 0"}}>
    <TextField
    style={{flex:1}} className="searchBox"
    label="Search"
    variant="filled"
onChange={(e)=>setSearchText(e.target.value)}
    />
    <Button variant="contained" style={{marginLeft:10,marginTop:10}}
    onClick={fetchSearch}
    >{""}
    <SearchIcon/></Button>
    </div>
    <Tabs value={type} indicatorColor="primary"textColor="primary"onChange
    ={(event,newValue)=>{
        setType(newValue);
        setPage(1);
    }}
    style={{paddingBottom:5}}>
<Tab style={{width:"50%"}}label="Search Movies"/>
<Tab style={{width:"50%"}}label="Search TV Series"/>


    </Tabs>
</ThemeProvider>
<div className="trending">
{content && content.map((c)=>(
<Single key={c.id} id={c.id} 
poster={c.poster_path}title={c.title||c.name}
date={c.first_air_date || c.release_date}
media_type={type?"tv":"movie"}
vote_average={c.vote_average}/>) 
)}
{searchText && !content && (type? <h2>
    No series found</h2>:<h2>No movies found</h2>)}
    </div>
    {numOfPages>1 &&(
    <CustomPagination
 setPage={setPage} numOfPages={numOfPages}/>)}
            </div>
            
    )
}
export default Search;