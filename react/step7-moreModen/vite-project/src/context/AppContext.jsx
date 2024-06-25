/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
const CitiesProvdier = createContext();
const citiesUrl = "http://127.0.0.1:6657";

function AppContext({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${citiesUrl}`);
        const data = await res.json();
        // console.s(data.message);
        setCities(data.message.cities);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  const getCurrentCiy = useCallback(async function getCurrentCiy(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${citiesUrl}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <CitiesProvdier.Provider
      value={{
        cities,
        isLoading,
        citiesUrl,
        getCurrentCiy,
        currentCity,
      }}
    >
      {children}
    </CitiesProvdier.Provider>
  );
}
function useLJEZContext() {
  const CitiesProContext = useContext(CitiesProvdier);
  if (CitiesProContext === undefined)
    throw new Error("只能在被本组件包裹的组件下使用哦~");
  return CitiesProContext;
}
export { AppContext, useLJEZContext };
