import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

const Card = (props) => {
    let options=props.options || {};
    let priceOptions=Object.keys(options)
    const [qty, setQty]=useState(1);
    const [size, setSize]=useState("");
    let dispatch=useDispatchCart();
    let data=useCart();
    const priceRef=useRef();
    const handleAddtoCart=async()=>{
           let food=[];
           for(const item of data){
            if(item.id===props.fodItems._id){
                food=item;
                break;
            }
           }
           if(food!==[]){
             if(food.size===size){

                 await dispatch({type:"UPDATE", id: props.fodItems._id,price:finalPrice,qty:qty})
                 return
             }
             else if(food.size!==size){

                 await dispatch({type:"ADD",id:props.fodItems._id, name: props.fodItems.name, price: finalPrice, qty:qty, size:size});
                 //console.log(data);
                 return
             }
             return
           }
           await dispatch({type:"ADD",id:props.fodItems._id, name: props.fodItems.name, price: finalPrice, qty:qty, size:size});
           //console.log(data);    
    }

    let finalPrice=qty*parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div className='card-container'>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.fodItems.img} className="card-img-top" alt="..." style={{height:'120px', objectFit:"fill"}} />
                    <div className="card-body">
                        <h5 className="card-title">{props.fodItems.name}</h5>
                         
                        <div className='container'>
                            <select className='m-2 h-100  bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e,i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                                 {priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                 })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                Rs.{finalPrice}/-
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddtoCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
