import React from 'react';

import session from '../wowser/session';

class RealmsScreen extends React.Component {

  static id = 'realms';
  static title = 'Realms Selection';

  constructor() {
    super();

    this.state = {
      realm: null,
      realms: []
    };

    session.realms.on('refresh', this._onRefresh);
    session.game.on('authenticate', this._onAuthenticate);

    this.refresh();
  }

  componentWillUnmount() {
    session.realms.removeListener('refresh', this._onRefresh);
    session.game.removeListener('authenticate', this._onAuthenticate);
  }

  connect(realm) {
    // for now use fixed port
    //session.game.connect('localhost', realm.port);
    session.game.connect('localhost', 8085);
  }

  refresh() {
    session.realms.refresh();
  }

  _onAuthenticate = () => {
    session.screen = 'characters';
  };

  _onRealmSelect = (event) => {
    this.setState({realm: event.target.value});
  };

  _onRefresh = () => {
    const realms = session.realms.list;
    this.setState({
      realm: realms[0],
      realms: realms
    });
  };

  _onSubmit = (event) => {
    event.preventDefault();
    this.connect(this.state.realm);
  };

  render() {
    return (
      <realms className="realms screen">
        <div className="panel">
          <h1>Realm Selection</h1>

          <div className="divider"></div>

          <form onSubmit={this._onSubmit}>
            <fieldset>
              <select value={this.state.realm}
                      onChange={this._onRealmSelect}>
                {this.state.realms.map((realm) => {
                  return (
                    <option key={realm.id} value={realm}>
                      {realm.name}
                    </option>
                  );
                })}
              </select>
            </fieldset>

            <div className="divider"></div>

            <input type="submit" value="Connect" autoFocus/>
            <input type="button" value="Refresh" onClick={this.refresh}/>
          </form>
        </div>
      </realms>
    );
  }

}

export default RealmsScreen;
