import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

type Item = {
  _id: number;
  title: string;
  imageUrl: string;
  description: string;
};

export const MenuCourseComponent = () => {
  const [items, setItems] = useState<Item[] | undefined>(undefined);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching data...");
    fetch("https://iths-2024-recept-grupp7-86oop6.reky.se/recipes")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setItems(data);
        setCurrentItem(data[0]); // Set the currentItem to the first item from the API response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleContinue = () => {
    if (currentItem) {
      try {
        const existingCartItems = localStorage.getItem('cartItems');
        let cartItemsArray: Item[] = [];

        if (existingCartItems) {
          try {
            // Check if the retrieved data is JSON-parseable
            cartItemsArray = JSON.parse(existingCartItems);
          } catch (error) {
            // If not, initialize as an empty array
            console.error('Error parsing existing cart items:', error);
          }
        }
        // Add the current item to the cart items array
        const updatedCartItems = [...cartItemsArray, currentItem];
      
        // Save the updated cart items array to localStorage
        console.log('Updated cart items:', updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        
        navigate('/siders');
      } catch(error) {
        console.error('Error saving item to localStorage:', error);
      }
      
    }
  };

  return (
    <div className="wrapper">
      <section className="selector" >
        {items &&
          Array.isArray(items) &&
          items.map((item: Item) => (
            <button onClick={() => setCurrentItem(item)} key={item._id} className="MainCourseButton">{item.title}</button>
          ))}
      </section>

      <section className="display">
        {currentItem && (
          <>
            <img src={currentItem.imageUrl} alt="ImagePlaceholder" />
            <p>{currentItem.description}</p>
            <button onClick={handleContinue}>Gå vidare</button>
          </>
        )}
      </section>
    </div>
  );
};
