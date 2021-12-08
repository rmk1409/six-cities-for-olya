import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {convertRatingToPercent} from "../../utils/utils";
import {fetchOffer} from "../../store/axios-actions";
import Header from "../header/header";
import Map from "../map/map";
import Spinner from "../spinner/spinner";
import Reviews from "../reviews/reviews";
import NearestOffers from "../nearest-offers/nearest-offers";

const Offer = ({offer, nearestOffers, onLoadOffer}) => {
  const {id} = useParams();
  useEffect(() => onLoadOffer(id), [id]);

  if (offer.id !== +id) {
    return (<Spinner/>);
  }

  const {
    bedrooms,
    max_adults,
    goods,
    price,
    description,
    title,
    type,
    images,
    is_favorite,
    is_premium,
    rating,
    host
  } = offer;
  const {avatar_url, is_pro, name, id: hostId} = host;
  const percent = convertRatingToPercent(rating);
  const userAvatarPro = is_pro ? `property__avatar-wrapper--pro` : ``;
  const favoriteOffer = is_favorite ? `property__bookmark-button--active` : ``;

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property" id={id}>
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image, i) => <div key={i} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Photo studio"/>
              </div>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {is_premium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> :
                ``}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button button ${favoriteOffer}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${percent}`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {max_adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, i) => <li className="property__inside-item" key={i}>
                    {good}
                  </li>)}
                </ul>
              </div>
              <div className="property__host" id={hostId}>
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${userAvatarPro}`}>
                    <img className="property__avatar user__avatar" src={avatar_url} width="74" height="74"
                      alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <Reviews id={id} offer={offer}/>
            </div>
          </div>
          <section className="property__map map">
            {nearestOffers.length ?
              <Map offerList={nearestOffers} style={{height: `100%`, width: `1144px`, margin: `0 auto`}}/> :
              <Spinner/>}
          </section>
        </section>
        <NearestOffers id={id}/>
      </main>
    </div>
  );
};

Offer.propTypes = {
  offer: PropTypes.object,
  nearestOffers: PropTypes.array,
  onLoadOffer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  nearestOffers: state.nearestOffers,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadOffer(id) {
    dispatch(fetchOffer(id));
  },
});

export {Offer};
export default connect(mapStateToProps, mapDispatchToProps)(Offer);
