import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useLJEZContext } from "../context/AppContext";

function CountryList() {
  // console.log(cities);
  const { cities, isLoading } = useLJEZContext();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="也许你要加入新的城市，这里啥都没有哟~" />;
  const countries = cities.reduce((arr, curr) => {
    if (arr.map((el) => el.country).includes(curr.country)) return arr;
    return [...arr, { country: curr.country, emoji: curr.emoji }];
  }, []);
  return (
    <ul className={styles.CountryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
