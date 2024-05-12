import React , {useState} from 'react'

const ADDMaterial = () => {
    const [formData, setFormData] = useState({
       
        material_id: '',
        material_name: '',
       
      });
      const [error, setError] = useState(false);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(false);
      };
    
      const addProduct = async () => {
        const { material_id , material_name  } = formData;
        if ( !material_id || !material_name ) {
          setError(true);
          return;
        }
    
        const JSONBody = {
         
          "material_name": material_name,
          "materialId": parseInt(material_id),
    
        }
    
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try {
          const response = await fetch("http://localhost:8000/material/addMaterial", {
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
          <h1>Add Material</h1>
        
    
          <input className='inputBox' type='text' name='material_id' value={formData.material_id} onChange={handleChange} placeholder='Enter material_id' />
          {error && !formData.material_id && <span className='invalid-input'>Enter material_id</span>}
    
          <input className='inputBox' type='text' name='material_name' value={formData.material_name} onChange={handleChange} placeholder='Enter material_name' />
          {error && !formData.material_name && <span className='invalid-input'>Enter material_name</span>}
    
          
    
    
          <button type='button' onClick={addProduct} className='appButton'>Add Material</button>
        </div>
      );
}

export default ADDMaterial