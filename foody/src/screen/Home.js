import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

  const [foodCat,setFoodcat]=useState([]);
  const [fooditem,setFooditem]=useState([]);
  const [serach,setSearch]=useState([]);
  
  const loadData=async()=>{
    let res=await fetch("http://localhost:8000/fooddata",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    });
    res=await res.json();
    //console.log(res);
    setFooditem(res.foodItems);
    setFoodcat(res.foodCategories);
  }
useEffect(()=>{
  loadData();
},[])

  return (
    <>
    <div>
        <Navbar/>
    </div>
    <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'style={{ height: "300px" }}>
    <div className="carousal-caption my-3" style={{zIndex:"10"}}>
    
    </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." style={{ objectFit: "cover !important", height: "100% !important" }}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700/?noodles" className="d-block w-100" alt="..." style={{ objectFit: "cover", height: "100%" }}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." style={{ objectFit: "cover", height: "100%" }}/>
    </div>
  </div>
  <div className="d-flex mt-3">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={serach} onChange={(e)=>{setSearch(e.target.value)}}/>
      
    </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
 
</div>
    <div className='container'>
      {
        foodCat!==[]
        ? foodCat.map((data)=>{
          return(
            <div className='row m-3'>
            <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
            <hr/>
            {fooditem!==[]?fooditem.filter((item)=>((item.CategoryName===data.CategoryName))&& (item.name.toLowerCase().includes(String(serach).toLocaleLowerCase())))  
            .map(filterItems=>{
              return(
                <div key={filterItems._id} className=' mx-3 col-12 col-md-6 col-lg-3'>
                  <Card fodItems={filterItems}
                    options={filterItems.options}
                    
                    /> 
                </div>
              )
            }):<div>No data</div>}
            </div>
          )
        })
        :""
      }
       
      </div>
    <div><Footer/></div>
    </>
  )
}
