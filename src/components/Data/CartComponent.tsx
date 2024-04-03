//Get the stuff out of the CartPage into here and then use the component




 // const handleClick = (item: Item) => {
  //   try{
      
  //     // Retrieve existing cart items from localStorage or initialize as an empty array
  //     const existingCartItems = localStorage.getItem('cartItems');
  //     let cartItemsArray: Item[] = [];

  //      if (existingCartItems) {
  //     try {
  //       // Check if the retrieved data is JSON-parseable
  //       cartItemsArray = JSON.parse(existingCartItems);
  //     } catch (error) {
  //       // If not, initialize as an empty array
  //       console.error('Error parsing existing cart items:', error);
  //     }
  //   }
  //     // Add the new item to the cart items array
  //     const updatedCartItems = [...cartItemsArray, item];
    
  //     // Save the updated cart items array to localStorage
  //     console.log('Updated cart items:', updatedCartItems);
  //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      
  //     // Set the currentItem state
  //     setCurrentItem(item);

  //   }catch(error){
  //     console.error('Error saving item to localStorage:', error);
  //   }
  // };