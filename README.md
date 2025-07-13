# Shopping Site (Back-End)

This is the back-end of Shopping Site Application. [Application Link](https://shopping-site-frontend-ivory.vercel.app/)<br>
Built with a React frontend, Express/Node backend, MongoDB database.

---

## Demo Link

[Live Demo](https://www.loom.com/share/491a8a43f9ce4ea68c93c6dd164210a2?sid=ec15ba0d-d627-4cfd-9f3f-82a92d9ac0a5)  

---

## Quick Start

```
git clone https://github.com/sahaarnav3/shopping-site-backend.git
cd shopping-site-backend
npm install
npm run dev      # or `npm start` / `yarn dev`
```

## Technologies
- Node.js
- Express
- MongoDB

## API Reference

### **GET	/**
Route to fetch HomePage.<br>

### **POST	/api/categories**	 	
Route to add a Category entry into database.<br>	
Sample Response:
```{ message: "Category Added Successfully." }```

### **GET	/api/categories**	 	
Route to fetch all Categories from database.<br>	
Sample Response:
```{ data: { categories: [{ _id, categoryName }, ...] } }```

### **GET	/api/categories/:categoryId**	 	
Route to fetch a Category by its ID from database.<br>
Sample Response:
```{ data: { category: { _id, categoryName } } }```

### **POST	/api/products**	 	
Route to add Product entry in the database.<br>
Sample Response:
```{ message: "Product Added Successfully." }```

### **GET	/api/products**	 	
Route to fetch all products from the database.<br>
Sample Response:
```{ data: { products: [{ _id, shortTitle, fullTitle, mrpPrice, finalPrice, rating, qyantity, size, description, imageLink, addedToWishlist, category, createdAt, updatedAt, addedToCart }, ...] } }```

### **GET	/api/products/:productId**	 	
Route to fetch Product from the database by its ID.<br>
Sample Response:
```{ data: { product: { _id, shortTitle, fullTitle, mrpPrice, finalPrice, rating, qyantity, size, description, imageLink, addedToWishlist, category, createdAt, updatedAt, addedToCart } } }```

### **PATCH	/api/products/by_category/:categoryName**	 	
Route to add/remove (toggle) product from wishlist with product ID.<br>
Sample Response:
```{ message: "Wishlist Status Toggled Successfully." }```

### **GET	/api/products/wishlist_items/wishlist**	 	
Route to fetch only those products which are present in wishlist.<br>
Sample Response:
```{ data: { product: { _id, shortTitle, fullTitle, mrpPrice, finalPrice, rating, qyantity, size, description, imageLink, addedToWishlist, category, createdAt, updatedAt, addedToCart } } }```

### **POST	/api/products/add_to_cart/:productId/:specs**	 	
To add a product with particular specification (could be size or anything else for another category) in cart.<br>
Sample Response:
```{ message: "Item Added To Cart Successfully." }```

### **POST	/api/products/remove_from_cart/:productId/:specs**	 	
To remove a product with particular specification ( could be size or anything else) from cart.<br>
Sample Response:
```{ message: "Item Removed From Cart Successfully." }```

### **GET	/api/products/get_cart_items/cart**	 	
Route to fetch all products present in cart.<br>
Sample Response:
```{ cartItems: [{ _id, shortTitle, fullTitle, mrpPrice, finalPrice, rating, qyantity, size, description, imageLink, addedToWishlist, category, createdAt, updatedAt, addedToCart }, ...] }```

### **PATCH	/api/products/remove_all_cart_items**	 	
Route to remove all items from cart.<br>
Sample Response:
```{  message: "Cart Empty !" }```

### **POST	/api/address/add_new_address**	 	
Route to add new address.<br>	
Sample Response:
```{ message: "Address Added Successfully." }```

### **GET	api/address/get_all_address**	 	
Route to fetch all addresses.<br>	
Sample Response:
```{ addresses: [{ _id, name, mobileNumber, pincode, detailedAddress, city, state, defaultAddress }, ...] }```

### **DELETE	/api/address/delete_address/:addressID**	 	
Route to delete address by ID.<br>	
Sample Response:
```{ message: "Address Deleted Successfully." }```

### **PATCH	/api/address/edit_default/:addressID**	 	
Route to change default address.<br>	
Sample Response:
```{ message: "Default Address Updated Successfully." }```

### **GET	/api/address/fetch_default_address**	 	
Route to fetch the default address.<br>	
Sample Response:
```{ address: { _id, name, mobileNumber, pincode, detailedAddress, city, state, defaultAddress } }```

### **POST	/api/orders/create_new_order**	 	
Route to create a new Order Entry.<br>	
Sample Response:
```{ message: "Order Added Successfully." }```

### **GET	/api/orders/get_all_orders**	 	
Route to Fetch all past orders.<br>	
Sample Response:
```{ orders: [{ _id, address: { name, mobileNumber, pincode, detailedAddress, city, state }, products: [{ product: { _id, shortTitle, finalPrice }, quantity, _id }, ...] }, ...] }```

## Contact
For bugs or feature requests, please reach out to sahaarnav3@gmail.com