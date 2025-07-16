import {
  faStarHalfStroke,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Rating({ rating }) {
  function getStarIcon(position) {
    // * Conditions
    if (rating >= position) {
      return faStarSolid;
    } else if (rating >= position - 0.5) {
      return faStarHalfStroke;
    } else {
      return faStarRegular;
    }
  }

  return (
    <>
      <div className="stars text-yellow-400">
        {[1, 2, 3, 4, 5].map((position) => (
          <FontAwesomeIcon key={position} icon={getStarIcon(position)} />
        ))}
      </div>
    </>
  );
}
