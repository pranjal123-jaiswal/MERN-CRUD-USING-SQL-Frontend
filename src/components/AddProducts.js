import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const navigate = useNavigate();
  const [categoryOption, setCategoryOption] = useState('');
  const [materialOption, setMaterialOption] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [productList, setProductList] = useState(Array.from({ length: 5 }, () => 1));
  const [formData, setFormData] = useState({
    productName: '',
    productId: '',
    sku: '',
    price: '',
    // category: '',
    // categoryId: '',
    // material_id: '',
    // material_name: '',
    // media_id: '',
    // url: ''
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchProduct()
  }, [])

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

  const addProduct = async () => {
    const { productName, productId, sku, price } = formData;
    if (!productName || !productId || !price  || !categoryOption || !sku || !materialOption ) {
      setError(true);
      return;
    }

    const JSONBody = {
      "productName": productName,
      "productId": parseInt(productId),
      "sku": sku,
      "price": parseFloat(price),
      "categoryId": parseInt(categoryOption),
      "materialId": parseInt(materialOption),

    }

    const userId = JSON.parse(localStorage.getItem('user'))._id;
    try {
      const response = await fetch("http://localhost:8000/products/addProducts", {
        method: 'POST',
        body: JSON.stringify(JSONBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        console.log("ojk")
        // navigate("/");
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error
    }
  };

  return (
    <div className='product'>
      <h1>Add Products</h1>
      <input className='inputBox' type='text' name='productName' value={formData.productName} onChange={handleChange} placeholder='Enter product name' />
      {error && !formData.productName && <span className='invalid-input'>Enter Valid name</span>}

      <input className='inputBox' type='text' name='productId' value={formData.productId} onChange={handleChange} placeholder='Enter product ID' />
      {error && !formData.productId && <span className='invalid-input'>Enter Product Id</span>}

      <input className='inputBox' type='text' name='sku' value={formData.sku} onChange={handleChange} placeholder='Enter SKU' />
      {error && !formData.sku && <span className='invalid-input'>Enter SKU</span>}

      <input className='inputBox' type='text' name='price' value={formData.price} onChange={handleChange} placeholder='Enter product price' />
      {error && !formData.price && <span className='invalid-input'>Enter Valid price</span>}

<div className="select-container"> {/* Add a container for the dropdown */}
      <select value={categoryOption} onChange={handleCategoryChange}>
        <option value="">Select an Category</option>
        {categoryList.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>

    <div className="select-container"> {/* Add a container for the dropdown */}
      <select value={materialOption} onChange={handleMaterialChange}>
        <option value="">Select an Material</option>
        {materialList.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>

      <button type='button' onClick={addProduct} className='appButton'>Add Product</button>
    </div>
  );
};

export default AddProducts;
