import React from "react";
import PropTypes from "prop-types";
import {Redirect, useParams} from "react-router-dom";
import OfferProp from "./offer.prop";
import {convertRatingToPercent, getRandomNumber} from "../../utils/utils";
import {generateComment} from "../../mocks/offers";
import Header from "../header/header";
import CommentForm from "../comment-form/comment-form";
import OfferCard from "../offer-card/offer-card";
import Map from "../map/map";
import Comments from "../comments/comments";

const Offer = ({isLogged, offers, onSubmitComment}) => {
  const MAX_COMMENT_QUANTITY = 5;
  const comments = new Array(getRandomNumber(0, MAX_COMMENT_QUANTITY))
    .fill(null)
    .map(generateComment);
  const {id} = useParams();
  const index = offers.findIndex((offer) => offer.id === id);
  if (index === -1) {
    return (
      <Redirect to="/page-not-found" />
    );
  }
  const nearOffers = [...offers].filter((offer) => offer.id !== id).slice(-3);
  const offer = offers[index];
  const {bedrooms, max_adults, goods, price, description, title, type, images, is_favorite, is_premium, rating, host} = offer;
  const {avatar_url, is_pro, name, id: hostId} = host;
  const isProHost = is_pro ? `property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper` : `property__avatar-wrapper user__avatar-wrapper`;
  const percent = convertRatingToPercent(rating);

  const city = offer.city.location;
  const points = offers.map((o) => o.location);

  return (
    <div className="page">
      <Header isLogged={isLogged}/>
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
                <button className={
                  is_favorite ?
                    `property__bookmark-button button property__bookmark-button--active` :
                    `property__bookmark-button button`}
                type="button">
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
                  <div className={isProHost}>
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
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span
                  className="reviews__amount">{comments.length}</span></h2>
                {comments.length ? <Comments comments={comments}/> : ``}
                <CommentForm onSubmitComment={onSubmitComment}/>
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map city={city} points={points} style={{height: `100%`, width: `1144px`, margin: `0 auto`}}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((o, i) => <OfferCard key = {i} offer={o} pageType="cities"/>)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

Offer.propTypes = {
  onSubmitComment: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired,
  offer: OfferProp,
  isLogged: PropTypes.bool.isRequired,
};

export default Offer;
