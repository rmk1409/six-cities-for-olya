import React from "react";
import PropTypes from "prop-types";
import {changeCity, resetSortingType} from "../../store/actions";
import {connect} from "react-redux";
import {getCity} from "../../store/main-data/selectors";

const Cities = ({cities, onCityClick, city}) => {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((cityName, i) => {
        const activeCity = city === cityName ? `tabs__item--active` : ``;
        return (
          <li className="locations__item" key={i}>
            <a className={`locations__item-link tabs__item ${activeCity}`} onClick={onCityClick}>
              <span>{cityName}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

Cities.propTypes = {
  cities: PropTypes.array.isRequired,
  onCityClick: PropTypes.func,
  city: PropTypes.string,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(evt) {
    evt.preventDefault();
    const cityName = evt.target.textContent;
    document.querySelector(`.cities__places`).scrollTo(0, 0);
    dispatch(changeCity(cityName));
    dispatch(resetSortingType());
  },
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
