// https://${host}/latest?amount=10&from=GBP&to=USD

import { useEffect, useState } from "react";
export default function App() {
  const [firstMoney, setFirstMoney] = useState("USD");
  const [secondMoney, setSecondMoney] = useState("CNY");
  const [put, setPut] = useState(0);
  const [afterConversionMoney, setAfterConversionMoney] = useState(0);
  useEffect(
    function () {
      async function getRightMoney() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${put}&from=${firstMoney}&to=${secondMoney}`
          );
          const DataJson = await res.json();
          const x = DataJson.rates[Object.keys(DataJson.rates)[0]];
          setAfterConversionMoney(x);
        } catch (e) {
          console.log(e.message);
        }
      }
      Number(put) && firstMoney !== secondMoney && getRightMoney();
    },
    [put, firstMoney, secondMoney]
  );
  return (
    <div>
      <input
        type="text"
        value={put}
        onChange={(e) => {
          setPut(e.target.value);
        }}
      />
      <select
        value={firstMoney}
        onChange={(e) => {
          setFirstMoney(e.target.value);
        }}
      >
        <option value="CNY">Chinese Renminbi Yuan</option>
        <option value="EUR">Euro</option>
        <option value="USD">United States Dollar</option>
        <option value="ZAR">South African Rand</option>
      </select>
      <select
        value={secondMoney}
        onChange={(e) => {
          setSecondMoney(e.target.value);
        }}
      >
        <option value="CNY">Chinese Renminbi Yuan</option>
        <option value="EUR">Euro</option>
        <option value="USD">United States Dollar</option>
        <option value="ZAR">South African Rand</option>
      </select>
      <p>
        {afterConversionMoney
          ? `可兑换${secondMoney} : ${afterConversionMoney}`
          : ""}
      </p>
    </div>
  );
}
