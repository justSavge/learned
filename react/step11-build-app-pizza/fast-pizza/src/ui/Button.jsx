import { Link } from "react-router-dom";

function Button({ children, disable, to, type, onClick }) {
  const className =
    "duration-400 focus: focus: disabled:cursor-not-allowed rounded-full bg-yellow-400 font-semibold tracking-wide  text-stone-800 ring-yellow-300 ring-offset-2 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring";
  const styles = {
    primary: className + " px-4 py-3 md:px-5 md:py-4",
    small: className + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "duration-400 focus: focus: disabled:cursor-not-allowed rounded-full font-semibold tracking-wide  text-stone-400 ring-stone-300 ring-offset-2 transition-colors hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring border-2 border-stone-300 px-2 py-1 md:px-4 md:py-2",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button disabled={disable} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button disabled={disable} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
