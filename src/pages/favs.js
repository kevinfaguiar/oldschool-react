import React, { Component } from 'react';
import {
  Row, Col, Input, Icon,
} from 'antd';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ModalGame from '../components/modal-game/modal-game';
import GameList from '../components/game-list/game-list';
import * as GamesAction from '../store/actions/games';

const GAMES_TOTAL = 24;

class Favs extends Component {
  state = {
    modalGameVisible: false,
    selectedGame: null,
    searchTerm: '',
  };

  async componentDidMount() {
    const { requestFavList } = this.props;
    requestFavList(GAMES_TOTAL);
  }

  gameOnClick = (game) => {
    this.setState({
      modalGameVisible: true,
      selectedGame: game,
    });
  };

  onCancelModal = () => {
    this.setState({
      modalGameVisible: false,
      selectedGame: null,
    });
  };

  searchGame = () => {
    const { searchTerm } = this.state;
    const { searchFavList } = this.props;
    searchFavList(searchTerm, GAMES_TOTAL);
  };

  onChangeInput = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  renderModalGame() {
    const { selectedGame, modalGameVisible } = this.state;
    if (selectedGame !== null) {
      return (
        <ModalGame
          className="clean-card"
          visible={modalGameVisible}
          game={selectedGame}
          onCancel={this.onCancelModal}
        />
      );
    }
    return '';
  }

  render() {
    const { searchTerm } = this.state;
    const { isLoading, favList } = this.props;

    return (
      <>
        <div
          style={{
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Row style={{ marginTop: '2vh' }}>
            <Col span={12} offset={6}>
              <Input
                className="game-search"
                placeholder="Search Fav Games"
                prefix={<Icon type="search" style={{ color: '#b3b3b3' }} />}
                style={{ width: '100%' }}
                size="large"
                onPressEnter={this.searchGame}
                onChange={this.onChangeInput}
                value={searchTerm}
              />
            </Col>
          </Row>
          <Row style={{ padding: '30px 15px' }} gutter={24}>
            <GameList
              isLoading={isLoading}
              gamesArray={favList}
              maxTotalGames={GAMES_TOTAL}
              gameOnClick={this.gameOnClick}
            />
          </Row>
        </div>
        {this.renderModalGame()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.games.isLoading,
  favList: state.games.favList,
});

const mapDispatchToProps = dispatch => bindActionCreators(GamesAction, dispatch);

Favs.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  favList: PropTypes.array.isRequired,
  requestFavList: PropTypes.func.isRequired,
  searchFavList: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favs);
