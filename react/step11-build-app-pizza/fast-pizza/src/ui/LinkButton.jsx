import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LinkButton({ children, linkTo }) {
  const navigate = useNavigate();
  const classStyle = "text-sm text-blue-500 hover:text-blue-800";
  if (linkTo === "-1")
    return (
      <button className={classStyle} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link className={classStyle} to={linkTo}>
      {children}
    </Link>
  );
}

export default LinkButton;
