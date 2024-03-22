import { useEffect, useState } from "react";

type Item = {
  _id: number;
  title: string;
  imageUrl: string;
  description: string;
};

export const MenyCourseComponent = () => {
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

    //   console.log(items![0])
  }, []);

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
       
        <img src={currentItem?.imageUrl} alt="placeholder" />
         <p>{currentItem?.description}</p>

        <button>Gå vidare</button>
      </section>
    </div>
  );
};
