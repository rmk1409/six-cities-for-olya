import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {logout} from "../../store/axios-actions";
import {connect} from "react-redux";
import {getUserInfo} from "../../store/user-data/selectors";

const HeaderMail = ({onExitClick, userInfo}) => {
  return (
    <>
      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
        <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${userInfo.avatar_url})`}}>
        </div>
        <span className="header__user-name user__name">{userInfo.email}</span>
      </Link>
      <a onClick={onExitClick}>
        <p>Выход</p>
      </a>
    </>);
};

HeaderMail.propTypes = {
  onExitClick: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userInfo: getUserInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  onExitClick(authData) {
    dispatch(logout(authData));
  }
});

export {HeaderMail};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderMail);
