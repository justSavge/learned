import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useLJEZContext } from "../context/AppContext";
function CityItem({ city }) {
  const { currentCity } = useLJEZContext();
  const { cityName, emoji, date, id, position } = city;
  // console.log(position);
  const formatDate = (date) =>
    new Intl.DateTimeFormat("zh", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === city.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
