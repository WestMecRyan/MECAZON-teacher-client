import { Link } from "react-router-dom";
import styles from "../styles/GroceryList.module.css";

export default function GroceryList({ items }) {
  return (
    <div className={styles.list}>
      {items.map(i => (
        <Link to={`/groceries/${i.id}`} key={i.id} className={styles.item}>
          <h2>{i.name}</h2>
          <p>Category: {i.category}</p>
          <p>Price: {i.price}</p>
        </Link>
      ))}
    </div>
  );
}
