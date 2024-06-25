import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useLJEZContext } from "../context/AppContext";

function CityList() {
  const { cities, isLoading } = useLJEZContext();
  console.log(cities);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="也许你要加入新的城市，这里啥都没有哟~" />;
  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
