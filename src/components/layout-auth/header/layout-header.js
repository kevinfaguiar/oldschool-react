import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Button } from 'antd';
import * as SiderActions from '../../../store/actions/sider';
import AudioToggle from '../../audio-toggle/audio-toggle';

// Components
import { logoutUser } from '../../../service/auth-service';

// Assets
import Logo from '../../../assets/logo.png';

class LayoutHeader extends PureComponent {
  state = {
    loadingLogout: false,
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    this.setState({ loadingLogout: true });
    const { history } = this.props;
    const res = await logoutUser();
    if (res) {
      this.setState({ loadingLogout: false });
      history.push('/');
    }
  }

  render() {
    const { Header } = Layout;
    const { loadingLogout } = this.state;
    const { siderCollapsed, toggleSider } = this.props;

    return (
      <Header style={{ paddingLeft: '5px', paddingRight: '5px', textAlign: 'center' }}>
        <div className="logo" style={{ float: 'left' }}>
          <Button
            id="toggle-sider"
            className="btn-secondary"
            size="large"
            icon={siderCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleSider}
          />
          <Link to="/dashboard">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: '120px', marginLeft: '15px', marginRight: '30px' }}
            />
          </Link>
        </div>
        <div className="logo" style={{ float: 'right' }}>
          <Button
            id="logout-btn"
            className="btn-secondary"
            size="large"
            icon="logout"
            loading={loadingLogout}
            onClick={this.logout}
          />
        </div>
        <div style={{ float: 'right', marginRight: '35px' }}>
          <AudioToggle
            inlineMode
            audioArray={['top-gear.mp3', 'super-mario-world.mp3', 'super-mario-kart.mp3']}
          />
        </div>
      </Header>
    );
  }
}

LayoutHeader.defaultProps = {
  history: {},
};

LayoutHeader.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  siderCollapsed: state.sider.collapsed,
});

/* Example of manual mapping of dispatch to props
const mapDispatchToProps = dispatch => ({
  toggleSider: () => dispatch(SiderActions.toggleSider()),
}); */

// Example of automatic mapping of dispatch to props
const mapDispatchToProps = dispatch => bindActionCreators(SiderActions, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LayoutHeader),
);
