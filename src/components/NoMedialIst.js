import React , {useState , useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const NoMedialIst = () => {
    const navigate = useNavigate()
    const [products , setProducts] = useState([])

    useEffect(() => {
      getProducts()

  }, [])

 async function getProducts() {
      let result = await fetch(`http://localhost:8000/products/getNoMediaProducts` , {
          method: "get"
      });
      
      result = await result.json()
      setProducts(result);
      // setTotalPages(result.totalPages);
  }
  return (
    <div>
        <div className='product-list'>
        <h3>No Media Product List</h3>
        {/* <input type= "" onChange={handleSearch} className='search-product-box' placeholder='Search Product' /> */}
        <ul>
        <li>S.NO</li>
  <li>SKU</li>
  <li>Product Name</li>
  <li>Category</li>
  <li>Material</li>
  {/* <li>Status</li> */}
</ul>
{
  products.length > 0 ? products.map((item, index) => (
    <ul key={item._id}>
      <li>{index + 1}</li>
      <li>{item.SKU}</li>
      <li>{item.product_name}</li>
      <li>{item.category_name}</li>
      <li>{item.material_name}</li>
      {/* <li>
        <button onClick={() => deleteProduct(item._id)}>Delete</button>
        <NavLink to={`/update/${item._id}`}>Update</NavLink>
      </li> */}
    </ul>
  )) : <h1>No Data Found</h1>
}


    </div>
    </div>
  )
}

export default NoMedialIst