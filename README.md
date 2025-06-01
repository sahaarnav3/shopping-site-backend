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
|   Route to fetch products according to a particular category.   | `GET` | /api/products/by_category/`:categoryName` |
|   Route to add/remove (toggle) product from wishlist with product ID.   | `PATCH` | /api/products/toggle_wishlist/`:productId` |
|   Route to fetch only those products which are present in wishlist   | `GET` | /api/products/wishlist_items/wishlist |
|   To add a product with particular specification (could be size or anything else for another category) in cart   | `POST` | /api/products/add_to_cart/:`productId`/:`specs` |
|   To remove a product with particular specification ( could be size or anything else) from cart   | `POST` | /api/products/remove_from_cart/:`productId`/:`specs` |
|   Route to fetch all products present in cart.   | `GET` | /api/products/get_cart_items/cart |
|   Route to remove all items from cart.   | `PATCH` | /api/products/remove_all_cart_items |
|    |  | |
|   Route to add new address.   | `POST` | /api/address/add_new_address |
|   Route to fetch all addresses.   | `GET` | api/address/get_all_address |
|   Route to delete address.   | `DELETE` | /api/address/delete_address/`:addressID` |
|   Route to change default address.  | `PATCH` | /api/address/edit_default/`:addressID` |
|   Route to fetch the default address.  | `GET` | /api/address/fetch_default_address |
|    |  | |
|   Route to create a new Order Entry | `POST` | /api/orders/create_new_order |
|   Route to Fetch all past orders | `GET` | /api/orders/get_all_orders |