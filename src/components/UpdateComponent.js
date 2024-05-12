import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateComponent = () => {
  
  const [formData, setFormData] = useState({
    product_name: '',
    product_id: '',
    SKU: '',
    price: '',
    category_name: '',
    category_id: '',
    material_ids: '',
    material_names: '',

  });
  const {id} = useParams();
  const navigate = useNavigate();
  const [categoryOption, setCategoryOption] = useState('');
  const [materialOption, setMaterialOption] = useState('');
  const [defaultcategory , setDefaultCategory] = useState('')
  const [defaultmaterial , setDefaultMaterial] = useState('')
  const [defaultcategoryID , setDefaultCategoryID] = useState('')
  const [defaultmaterialID , setDefaultMaterialID] = useState('')
  const [showDefaultOption, setShowDefaultOption] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProduct();
    // fetchProduct()
  }, []);

  useEffect(() => {
    if(defaultcategoryID !== '' && defaultmaterialID !== ''){
      fetchProduct()
    }

  } , [defaultcategoryID , defaultmaterialID])
  

  const fetchProduct = async () => {
    try {
      let category = await fetch(`http://localhost:8000/category/getCategory` , {
        method: "get"
    });
    let material = await fetch(`http://localhost:8000/material/getMaterial` , {
        method: "get"
    });
    category = await category.json()
      if (!category.result) {


        const index = category.findIndex(product => product.category_id === defaultcategoryID);
      if (index !== -1) {
      category.splice(index, 1);
        }
        const filteredCategory = category.map(product => {
          return {
            id: product.category_id,
            name: product.category_name
          };
        });
        setCategoryList(filteredCategory)

      }else {
        throw new Error('Failed to add product');
      }
    material = await material.json()
      if (!material.result) {
        const index = material.findIndex(product => product.material_id === defaultmaterialID);
      if (index !== -1) {
      material.splice(index, 1);
        }
        const filteredMaterial = material.map(product => {
          return {
            id: product.material_id,
            name: product.material_name
          };
        });
        setMaterialList(filteredMaterial)
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error
    }
  }

  const getProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8000/products/getProductById/${parseInt(id)}`);
      if (response.ok) {
        const result = await response.json();
        setFormData(result[0]);
        setDefaultCategoryID(result[0].category_id)
        setDefaultMaterialID(result[0].material_ids)
        setDefaultCategory(result[0].category_name)
        setDefaultMaterial(result[0].material_names)
        // fetchProduct()
      } else {
        throw new Error('Failed to fetch product');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      // Handle error
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryOption(value);
  };

  const handleMaterialChange = (e) => {
    const value = e.target.value;
    setMaterialOption(value);
   
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(false);
  };

  const updateProduct = async () => {
    const { product_name, product_id, SKU, price } = formData;
    if (!product_name || !product_id || !price   || !SKU  ) {
      setError(true);
      return;
    }
    let jsonBody ={
      "product_name":product_name,
      "SKU": SKU,
      "price": price,
      "category_id": categoryOption !== '' ? parseInt(categoryOption) :  parseInt(defaultcategoryID) ,
      "material_ids": materialOption !== '' ? parseInt(materialOption): parseInt(defaultmaterialID)
    }
    try {
      const parsedId = parseInt(id);
      const response = await fetch(`http://localhost:8000/products/updateProduct/${(parsedId)}`, {  
        method: 'PATCH',
        body: JSON.stringify(jsonBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        navigate('/');
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      // Handle error
    }
  };

  // const handleDropdownClick = () => {
  //   setShowDefaultOption(true); // Show the default option when the dropdown is clicked
  // };

  return (
    
    <div className='product'>
      <h1>Update Products</h1>
      <input className='inputBox' type='text' name='productName' value={formData.product_name} onChange={handleChange} placeholder='Enter product name' />
      {error && !formData.product_name && <span className='invalid-input'>Enter Valid name</span>}

      {/* <input className='inputBox' type='text' name='productId' value={formData.product_id} onChange={handleChange} placeholder='Enter product ID' />
      {error && !formData.product_id && <span className='invalid-input'>Enter Product Id</span>} */}

      <input className='inputBox' type='text' name='sku' value={formData.SKU} onChange={handleChange} placeholder='Enter SKU' />
      {error && !formData.SKU && <span className='invalid-input'>Enter SKU</span>}

      <input className='inputBox' type='text' name='price' value={formData.price} onChange={handleChange} placeholder='Enter product price' />
      {error && !formData.price && <span className='invalid-input'>Enter Valid price</span>}

<div className="select-container"> {/* Add a container for the dropdown */}
      <select value={categoryOption} onChange={handleCategoryChange}>
        <option value= "">{defaultcategory}</option>
        {categoryList.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>

    <div className="select-container"> {/* Add a container for the dropdown */}
      <select value={materialOption} onChange={handleMaterialChange} >
        
        <option value= "" >{defaultmaterial}</option>
        {materialList.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
      <button type='button' onClick={updateProduct} className='appButton'>Update Product</button>
    </div>
  );
};

export default UpdateComponent;
