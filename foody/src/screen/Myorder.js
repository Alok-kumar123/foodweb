import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 

export default function Myorder() {
  const [orderData, setOrderData] = useState({});
  console.log(orderData);
  const fetchMyorder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:8000/myorderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    }).then(async (res) => {
      let response = await res.json();
      
      await setOrderData(response);
    });
  };
 
   
  useEffect(() => {
    fetchMyorder();
  }, []);
  
   
  return (
    <> 
      <div>
        <Navbar />
      </div>
      {orderData.orderData!==null?<div className="container">
        <div className="row">
          {Object.keys(orderData).length !== 0 ? Object.keys(orderData).map(dataKey => {
            return orderData[dataKey].order_data.slice(0).reverse().map((item) => {
              return item.map((arrayData) => {
                return (
                  <div key={arrayData.someUniqueKey}>
                    {arrayData.Order_date ? (
                      <div className='m-auto mt-5'>
                        {arrayData.Order_date}
                        <hr />
                      </div>
                    ) : (
                      <div className='col-12 col-md-6 col-lg-3' key={arrayData.someUniqueKey}>
                        <div className='card mt-3' style={{ width: "16rem", maxHeight: "360px" }}>
                          <div className='card-body'>
                            <h5 className='card-title'>{arrayData.name}</h5>
                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                              <span className='m-1'>{arrayData.qty}</span>
                              <span className='m-1'>{arrayData.size}</span>
                              <span className='m-1'>{arrayData.Order_date}</span>
                              <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                Rs.{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              });
            });
          }) : "No Orders Found"}
        </div>
      </div>:"No orders yet, Please order something!"}
      <div>
        <Footer />
      </div>
    </>
  );
        
}
