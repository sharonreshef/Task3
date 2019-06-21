import React from 'react';
import './App.css';
import ServerList from './components/ServerList/ServerList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      AllServers: [],
      AllHostings: []
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
          console.log(this.state);
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
          console.log(this.state);
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

  render() {
    const { AllServers } = this.state;

    return (
      <Container className=' App'>
        <ServerList onDelete={this.onDelete} AllServers={AllServers} />
      </Container>
    );
  }
}
