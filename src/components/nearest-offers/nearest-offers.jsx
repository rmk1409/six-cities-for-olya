import React, {useEffect} from "react";
import OfferCard from "../offer-card/offer-card";
import PropTypes from "prop-types";
import {fetchNearbyOffer} from "../../store/axios-actions";
import {connect} from "react-redux";
import Spinner from "../spinner/spinner";

const NearestOffers = ({nearestOffers, id, onLoadNearestOffers}) => {
  useEffect(() => onLoadNearestOffers(id), [id]);

  if (!id) {
    return (<Spinner/>);
  }

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        {nearestOffers.length ?
          <div className="near-places__list places__list">
            {nearestOffers.map((o, i) => <OfferCard key={i} offer={o} pageType="near"/>)}
          </div> :
          <h3 className="near-places__title">Not found : (</h3>}
      </section>
    </div>
  );
};

NearestOffers.propTypes = {
  id: PropTypes.string,
  nearestOffers: PropTypes.array,
  onLoadNearestOffers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  nearestOffers: state.nearestOffers,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadNearestOffers(id) {
    dispatch(fetchNearbyOffer(id));
  },
});

export {NearestOffers};
export default connect(mapStateToProps, mapDispatchToProps)(NearestOffers);