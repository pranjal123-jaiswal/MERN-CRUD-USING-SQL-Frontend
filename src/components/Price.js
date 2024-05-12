import React, { useState , useEffect } from 'react'


const Price = () => {
  const [category, setCategory] = useState([]);
  const [products , setProducts] = useState([])

  useEffect(() => {
    getProducts()

}, [])

async function getProducts() {
    let result = await fetch(`http://localhost:8000/category/categoryStats` , {
        method: "get"
    });
    
    result = await result.json()
    setProducts(result);
    // setTotalPages(result.totalPages);
}
  return (
    <>
    <div>
      <h1>Category</h1>
        <div className="container mb-5 mt-5">
  <div className="pricing card-deck flex-column flex-md-row mb-3">
  {products.length > 0 ? (
  products.map((item, index) => (
    <div key={index} className="card card-pricing text-center px-3 mb-4">
      <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">
        {item.category_name}
      </span>
      <div className="bg-transparent card-header pt-4 border-0">
        <h1
          className="h1 font-weight-normal text-primary text-center mb-0"
          data-pricing-value={15}
        >
          ₹<span className="price">{item.highest_price}</span>
          {/* <span className="h6 text-muted ml-2">/ per month</span> */}
        </h1>
      </div>
      {/* <div className="card-body pt-0">
        <ul className="list-unstyled mb-4">
          <li>Up to 5 users</li>
          <li>Basic support on Github</li>
          <li>Monthly updates</li>
          <li>Free cancelation</li>
        </ul>
        <button type="button" className="btn btn-outline-secondary mb-3">
          Order now
        </button>
      </div> */}
    </div>
  ))
) : (
  <h2>NO DATA FOUND</h2>
)}

    
    
   
  </div>
</div>

    </div>


<div>
      <h1>Price</h1>
        <div className="container mb-5 mt-5">
  <div className="pricing card-deck flex-column flex-md-row mb-3">
  {products.length > 0 ? (
  products.map((item, index) => (
    <div key={index} className="card card-pricing text-center px-3 mb-4">
      <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">
        {item.category_name}
      </span>
      <div className="bg-transparent card-header pt-4 border-0">
        <h1
          className="h1 font-weight-normal text-primary text-center mb-0"
          data-pricing-value={15}
        >
          <span className="h6 text-muted ml-2">0-500</span>
          <div className="price">{item.fivehundred}</div>

          <span className="h6 text-muted ml-2">501-1000</span>
          <div className="price">{item.onethousand}</div>

          <span className="h6 text-muted ml-2">1000+</span>
          <div className="price">{item.onethousandPlus}</div>
        </h1>
      </div>
    </div>
  ))
) : (
  <h2>NO DATA FOUND</h2>
)}


   
    {/* )} */}
    
   
  </div>
</div>

    </div>
    </>
  )
}

export default Price