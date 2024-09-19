import "./featuredProperties.css";
import Loader from "../loader/Loader";
import useFetch from "../../hooks/useFetch";
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/api/hotels");
  return (
    <div className="fp">
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.map((item, i) => (
            <div className="fpItem" key={i}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
