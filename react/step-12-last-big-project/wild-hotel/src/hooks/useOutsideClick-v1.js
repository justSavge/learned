import { useRef } from "react";
/**
 * 传入一个事件，为除子元素外的面积绑定
 * @param {function} clickEvent - 传入一个参数，提供点击？后执行的事件
 * @returns 返回两个值一个是ref,一个是点击（？）事件，需要绑定到ref,onClick
 */
function useOutsideClick(clickEvent) {
  const golbal = useRef(null);
  const golbalClick = (e) => {
    if (golbal.current && e.target.contains(golbal.current)) {
      clickEvent();
    }
    //只要golbal发生点击，并且点击位置包含(>=)golbal.current
  };
  return {golbal,golbalClick};
}

export default useOutsideClick;
