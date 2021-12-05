import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../store/actions";
import {fetchOffers} from "../../store/axios-actions";
import SortingTypes from "../sorting-types/sorting-types";
import Header from "../header/header";
import Offers from "../offers/offers";
import Map from "../map/map";
import Cities from "../cities/cities";
import EmptyMain from "../empty-main/empty-main";
import Spinner from "../spinner/spinner";
import {getRelevantSortingOffers} from "../../utils/utils";

const Main = ({cities, city, offers, sortingType, isOffersLoaded, onLoadOffers, isOfferLoaded, resetOffer}) => {
  useEffect(() => onLoadOffers(), []);

  useEffect(() => {
    if (isOfferLoaded) {
      resetOffer();
    }
  }, [isOfferLoaded]);

  const componentEmptyOrSpinner = isOffersLoaded ? <EmptyMain/> : <Spinner/>;
  const offerList = getRelevantSortingOffers(sortingType, offers, city);
  const noOffers = !offerList.length ? `page__main--index-empty` : ``;

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className={`page__main page__main--index ${noOffers}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <Cities cities={cities}/>
          </section>
        </div>
        {!offerList.length ?
          componentEmptyOrSpinner :
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offerList.length} places to stay in {city}</b>
                <SortingTypes/>
                <Offers pageType="cities" offers={offerList}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offerList={offerList} style={{height: `100%`}}/>
                </section>
              </div>
            </div>
          </div>}
      </main>
    </div>
  );
};

Main.propTypes = {
  cities: PropTypes.array,
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  sortingType: PropTypes.string,
  isOffersLoaded: PropTypes.bool.isRequired,
  onLoadOffers: PropTypes.func.isRequired,
  isOfferLoaded: PropTypes.bool.isRequired,
  resetOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers,
  isOffersLoaded: state.isOffersLoaded,
  isOfferLoaded: state.isOfferLoaded,
  sortingType: state.sortingType,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadOffers() {
    dispatch(fetchOffers());
  },
  resetOffer() {
    dispatch(ActionCreator.resetOffer());
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
