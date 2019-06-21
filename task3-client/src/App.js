import React from 'react';
import './App.css';
import ServerList from './components/ServerList/ServerList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import NewServer from './components/NewServer/NewServer';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      AllServers: [],
      AllHostings: [],
      hostingNames: []
    };
  }

  async componentDidMount() {
    try {
      await this.getAllServers();
    } catch (e) {
      console.error(e);
    }
  }

  getAllServers = async () => {
    try {
      await fetch(`http://localhost:4000/servers`)
        .then(response => response.json())
        .then(AllServers => {
          this.setState({ AllServers });
        });
      this.getAllhostings();
    } catch (e) {
      console.error(e);
    }
  };

  getAllhostings = async () => {
    try {
      await fetch(`http://localhost:4000/hosting`)
        .then(response => response.json())
        .then(AllHostings => {
          this.setState({ AllHostings });
          console.log(this.state.AllHostings);
          let hostingArr = [];
          this.state.AllHostings.map((h, i) => hostingArr.push(h.CompanyName));
          this.setState({ hostingNames: hostingArr });
        });
    } catch (e) {
      console.error(e);
    }
  };

  onDelete = id => {
    const { AllServers } = this.state;
    const serversAfterDelete = AllServers.filter(server => server.id !== id);
    this.setState({
      AllServers: serversAfterDelete
    });
  };

  insertServerToDB = async server => {
    const response = await fetch(`http://localhost:4000/servers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(server)
    });
    if (response.status === 200) {
      this.getAllServers();
      console.log('added');
    } else {
      console.error('not deleted!');
    }
  };

  render() {
    const { AllServers, AllHostings, hostingNames } = this.state;

    return (
      <Container className=' App'>
        <ServerList onDelete={this.onDelete} AllServers={AllServers} />
        <NewServer
          onAdd={this.insertServerToDB}
          hostings={AllHostings}
          hostingNames={hostingNames}
        />
      </Container>
    );
  }
}
