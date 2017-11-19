import React from 'react';
import Table from '../presentation/Table';
import autobahn from 'autobahn';
import DataAPI from '../../DataAPI';


let newData = [];

const api = new DataAPI();

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      data: [],
      symboles: []
    };
  }

  callSocket = () => {
    const wsuri = 'wss://api.poloniex.com';
    const connection = new autobahn.Connection({
      url: wsuri,
      realm: 'realm1'
    });

    connection.onopen = (session) => {
      console.log('Starting connection....');
      session.subscribe('ticker', (args) => {
        const newData = api.transformData(this.state, args);
        this.setState({
          data: newData
        });
      });
    };

    connection.onclose = () => {
      console.log('Websocket connection closed');
    };

    connection.open();

  }

  componentDidMount(){

    this.callSocket();
  }

  render() {
    return(
      <div>
        <div>
          <Table data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;
