// import React, { useState } from 'react';
// import './additem.css';

// const Additem = () => {
//     const [formData, setFormData] = useState({
//         id: '',
//         name: '',
//         new_price: '',
//         old_price: '',
//         category: '',
//         image: null,
//     });

//     const handleInputChange = (e) => {
//         const { name, value, type, files } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'file' ? files[0] : value
//         });
//     };

//     const addproduct = async () => {
//         const formDataToSend = new FormData();
//         formDataToSend.append('id', formData.id);
//         formDataToSend.append('name', formData.name);
//         formDataToSend.append('new_price', formData.new_price);
//         formDataToSend.append('old_price', formData.old_price);
//         formDataToSend.append('category', formData.category);
//         if (formData.image) {
//             formDataToSend.append('image', formData.image);
//         }

//         try {
//             const response = await fetch('http://localhost:4000/addproduct', {
//                 method: 'POST',
//                 body: formDataToSend,
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log(data);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <>
//             <div className="products">
//                 <div className="id">
//                     <input name='id' onChange={handleInputChange} value={formData.id} type="text" /> id
//                 </div>
//                 <div className="name">
//                     <input name='name' onChange={handleInputChange} value={formData.name} type="text" /> Name
//                 </div>
//                 <div className="new-price">
//                     <input name='new_price' onChange={handleInputChange} value={formData.new_price} type="number" /> New Price
//                 </div>
//                 <div className="old-price">
//                     <input name='old_price' onChange={handleInputChange} value={formData.old_price} type="number" /> Old Price
//                 </div>
//                 <select name="category" onChange={handleInputChange} value={formData.category}>
//                     <option value="man">Men</option>
//                     <option value="woman">Women</option>
//                     <option value="kid">Kid</option>
//                 </select>
//                 <div className="image-btn">
//                     <button onClick={() => document.getElementById('fileInput').click()}>Upload Image</button>
//                     <input name='image' onChange={handleInputChange} type="file" id="fileInput" hidden />
//                 </div>
//                 <button onClick={addproduct}>Add Product</button>
//             </div>
//         </>
//     );
// };

// export default Additem;
