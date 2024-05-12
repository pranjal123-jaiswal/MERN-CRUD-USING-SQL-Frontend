import React , {useState , useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Price from './Price';
import NoMedialIst from './NoMedialIst';

const ProductList = () => {
    const navigate = useNavigate()
    const [products , setProducts] = useState([])
    const [searchKey , setSerachKey] = useState("")
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const pageSize = 5;

    useEffect(() => {

      if(searchKey !== ""){
        handleSearch()
      }else{
        getProducts()
      }

    }, [page])

   async function getProducts() {
        let result = await fetch(`http://localhost:8000/products/getProducts?page=${page}` , {
            method: "get"
        });
        
        result = await result.json()
        setProducts(result);
        // setTotalPages(result.totalPages);
    }

    const deleteProduct = async(id) => {
        let result = await fetch(`http://localhost:8000/products/deleteProduct/${id}`  , {
            method: "DELETE"
        });
        result = await result.json()
        if (result){
            alert("Product Deleted")
            getProducts()
        }
    }

    const update = (id) => {
        navigate(`/update/${id}`)
    }

    const handleSearch = async(event) => {

        let key = event.target.value;
        setSerachKey(key);
        if (products.length > 0 && key !== ""){
          let result = await fetch(`http://localhost:8000/products/search?page=${page}&key=${key}` , {
            method: "get"
        });
        
        result = await result.json()
        setProducts(result);

    }else {
        getProducts()
    }
    }

    const handlePageChange = (event, value) => {
      setPage(value);
  };
  return (
    <>
    <div className='product-list'>
        <h3>Product List</h3>
        <input type= "" onChange={handleSearch} className='search-product-box' placeholder='Search Product' />
        <ul>
  <li>S.NO</li>
  <li>SKU</li>
  <li>Product Name</li>
  <li>Category</li>
  <li>Material</li>
  <li>Status</li>
</ul>
{
  products.length > 0 ? products.map((item, index) => (
    <ul key={item._id}>
      <li>{index + 1}</li>
      <li>{item.SKU}</li>
      <li>{item.product_name}</li>
      <li>{item.category_name}</li>
      <li>{item.material_name}</li>
      <li>
        <button onClick={() => deleteProduct(item.product_id)}>Delete</button>
        <NavLink to={`/update/${item.product_id}`}>Update</NavLink>
      </li>
    </ul>
  )) : <h1>No Data Found</h1>
}


    </div>

    <div className='pagination'>
    <Stack spacing={2}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Stack>
            </div>
            <Price/>
            <NoMedialIst/>
    </>



  )
}

export default ProductList