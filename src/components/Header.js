import React from 'react'
import './Header.css'
const Header=()=>{
    return(
        <span onClick={()=>window.scroll(0,0)}className="header">
    <img src={process.env.PUBLIC_URL+'/images/mo2.png'} style={{width:"300px",height:"100px",marginLeft:"-20px",marginTop:"10px"}}/>
Best Movie Zone</span>

    )
}
export default Header;