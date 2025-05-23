# ENDPOINTS  


| Purpose      | METHOD          | Endpoint  |
| ------------- |:-------------:| -----:|
|   Route to fetch HomePage.   | `GET` | / |
|   Route to add a Category entry into database.   | `POST` | /api/categories |
|   Route to fetch all Categories from database.   | `GET` | /api/categories |
|   Route to fetch a Category by its ID from database.   | `GET` | /api/categories/`:categoryId` |
|   Route to add Product entry in the database.   | `POST` | /api/products |
|   Route to fetch all products from the database.   | `GET` | /api/products |
|   Route to fetch Product from the database by its ID.   | `GET` | /api/products/`:productId` |
|   Route to fetch products according to a particular category.   | `GET` | /api/products/by-category/`:categoryName` |
|   Route to add/remove (toggle) product from wishlist with product ID.   | `PATCH` | /api/products/toggle-wishlist/`:productId` |
|   Route to fetch only those products which are present in wishlist   | `GET` | /api/products/wishlist-items/wishlist |
|   To add a product with particular specification (could be size or anything else for another category) in cart   | `POST` | /api/products/add-to-cart/:`productId`/:`specs` |
|   To remove a product with particular specification ( could be size or anything else) from cart   | `POST` | /api/products/remove-from-cart/:`productId`/:`specs` |
|   Route to fetch all products present in cart.   | `GET` | /api/products/get-cart-items/cart |
|   Route to remove all items from cart.   | `PATCH` | /api/products/remove-all-cart-items |
|    |  | |
|   Route to add new address.   | `POST` | /api/address/add-new-address |
|   Route to fetch all addresses.   | `GET` | api/address/get-all-address |
|   Route to delete address.   | `DELETE` | /api/address/delete-address/`:addressID` |
|   Route to change default address.  | `PATCH` | /api/address/edit-default/`:addressID` |
|   Route to fetch the default address.  | `GET` | /api/address/fetch-default-address |
|    |  | |
|   Route to create a new Order Entry | `POST` | /api/orders/create-new-order |
|   Route to Fetch all past orders | `GET` | /api/orders/get-all-orders |