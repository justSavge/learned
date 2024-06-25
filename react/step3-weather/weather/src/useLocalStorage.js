import { useState, useEffect } from "react";

export default function useLocalStorage(orgin, stoName) {
  const [value, setValue] = useState(function () {
    const storeValue = localStorage.getItem(stoName);
    return storeValue ? JSON.parse(storeValue) : orgin;
  }); //每次进入获得初始值，没有就按orgin来，一般是[]
  useEffect(
    function () {
      localStorage.setItem(stoName, JSON.stringify(value));
    },
    [value, stoName]
  ); //自动向localStorage注册存入数据
  return [value, setValue];
}
