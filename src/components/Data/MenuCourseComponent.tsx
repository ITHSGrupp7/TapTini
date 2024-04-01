import { useEffect, useState } from "react";

type Item = {
  _id: number;
  title: string;
  imageUrl: string;
  description: string;
};

export const MenuCourseComponent = () => {
  const [items, setItems] = useState<Item[] | undefined>(undefined);
  const [currentItem, setCurrentItem] = useState<Item>()

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
        setCurrentItem(data[0])
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

       // Retrieve the clicked item from localStorage on component mount
      const savedItem = localStorage.getItem('clickedItem');
      if (savedItem) {
      setCurrentItem(JSON.parse(savedItem));
      }


  }, []);



  const handleClick = (item: Item) => {
    // Save the clicked item to localStorage
    localStorage.setItem('clickedItem', JSON.stringify(item));
    
    // Set the currentItem state
    setCurrentItem(item);
  };




  return (
    <div className="wrapper">
      <section className="selector" >
        {items &&
          Array.isArray(items) &&
          items.map((item: Item) => (
            <button onClick={() => handleClick(item)} key={item._id} className="MainCourseButton">{item.title}</button>
          ))}
      </section>

      <section className="display">
        {currentItem && ( // Render display section only if currentItem is not null
          <>
            <img src={currentItem.imageUrl} alt="placeholder" />
            <p>{currentItem.description}</p>
            <button>Gå vidare</button>
          </>
        )}
      </section>
    </div>
  );
};
