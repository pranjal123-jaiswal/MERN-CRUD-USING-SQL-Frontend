import React , {useState} from 'react'

const ADDCategory = () => {
    const [formData, setFormData] = useState({
        category: '',
        categoryId: '',
      });
      const [error, setError] = useState(false);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(false);
      };
    
      const addProduct = async () => {
        const {  category, categoryId } = formData;
        if ( !category || !categoryId ) {
          setError(true);
          return;
        }
    
        const JSONBody = {
          "category": category,
          "categoryId": parseInt(categoryId),
        }
    
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try {
          const response = await fetch("http://localhost:8000/category/addCategory", {
            method: 'POST',
            body: JSON.stringify(JSONBody),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            alert("Category Added")
            // navigate("/");
          } else {
            alert('Failed to add product')
            throw new Error('Failed to add product');
          }
        } catch (error) {
          console.error('Error adding product:', error);
          alert('Error adding product')
          // Handle error
        }
      };
    
      return (
        <div className='product'>
          <h1>Add Category</h1>
          
    
          <input className='inputBox' type='text' name='category' value={formData.category} onChange={handleChange} placeholder='Enter product category' />
          {error && !formData.category && <span className='invalid-input'>Enter Valid category</span>}
    
          <input className='inputBox' type='text' name='categoryId' value={formData.categoryId} onChange={handleChange} placeholder='Enter Category ID' />
          {error && !formData.categoryId && <span className='invalid-input'>Enter Category Id</span>}
    
    
    
          <button type='button' onClick={addProduct} className='appButton'>Add Category</button>
        </div>
      );
}

export default ADDCategory