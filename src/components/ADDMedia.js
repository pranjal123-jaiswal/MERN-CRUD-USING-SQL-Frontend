import React , {useEffect, useState} from 'react'

const ADDMedia = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [productList, setProductList] = useState(Array.from({ length: 5 }, () => 1));
    const [formData, setFormData] = useState({
       
        // productId: '',
       
        media_id: '',
        url: ''
      });
      const [error, setError] = useState(false);
 
      useEffect(() => {
        fetchProduct()
      }, [])

      const fetchProduct = async () => {
        try {
          let result = await fetch(`http://localhost:8000/products/getProducts` , {
            method: "get"
        });
        result = await result.json()
          if (result) {
            const filteredProducts = result.map(product => {
              return {
                id: product.product_id,
                name: product.product_name
              };
            });
            setProductList(filteredProducts)
          } else {
            throw new Error('Failed to add product');
          }
        } catch (error) {
          console.error('Error adding product:', error);
          // Handle error
        }
      }

      const handleProductChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
       
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(false);
      };
    
      const addProduct = async () => {
        const {   media_id , url  } = formData;
        if (   !media_id || !url) {
          setError(true);
          return;
        }
    
        const JSONBody = {
          "productId": parseInt(selectedOption),
          "mediaUrl": url,
          "media_id": media_id,
        }
    
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try {
          const response = await fetch("http://localhost:8000/media/addMedia", {
            method: 'POST',
            body: JSON.stringify(JSONBody),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            console.log("ojk")
            alert("Added succesful")
            // navigate("/");
          } else {
            alert("Failed to add product")
            throw new Error('Failed to add product');
          }
        } catch (error) {
          console.error('Error adding product:', error);
          alert("Failed to add product")
          // Handle error
        }
      };
    
      return (
        <div className='product'>
          <h1>Add Media</h1>
     
    
          
    
          <input className='inputBox' type='text' name='media_id' value={formData.media_id} onChange={handleChange} placeholder='Enter media_id' />
          {error && !formData.media_id && <span className='invalid-input'>Enter media_id</span>}
    
          <input className='inputBox' type='text' name='url' value={formData.url} onChange={handleChange} placeholder='Enter url' />
          {error && !formData.url && <span className='invalid-input'>Enter url</span>}

          <div className="inputBox"> {/* Add a container for the dropdown */}
      <select value={selectedOption} onChange={handleProductChange}>
        <option value="">Select an Product</option>
        {productList.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
    
    
          <button type='button' onClick={addProduct} className='appButton'>Add Media</button>
        </div>
      );
}

export default ADDMedia