import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ServerCard.css';

export default class ServerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: this.props.server_status,
      buttonActive: this.props.server_status
    };
  }

  handleDelete = async () => {
    const { id, onDelete } = this.props;
    const response = await fetch(`http://localhost:4000/servers/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      onDelete(id);
    } else {
      console.error('not deleted!');
    }
  };

  sendServerToDB = () => {
    console.log(this.props);
    const { onAdd } = this.props;
    const { ALIAS, IP, hosting } = this.state;
    const server = {
      ALIAS,
      IP,
      hosting
    };
    onAdd(server);
    this.setState({
      ALIAS: '',
      IP: '',
      hosting: ''
    });
  };

  handleClick = async () => {
    await this.setState({ isActive: !this.state.isActive });
    const { isActive } = this.state;
    const { id } = this.props;
    let active;
    isActive ? (active = '1') : (active = '0');
    const status = {
      active
    };
    console.log(status);
    const response = await fetch(`http://localhost:4000/servers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(status)
    });
    if (response.status === 200) {
      this.setState({ buttonActive: !this.state.buttonActive });
    } else {
      console.error('no change');
    }
  };

  render() {
    const {
      id,
      ALIAS,
      IP,
      server_status,
      date_created,
      CompanyName
    } = this.props;

    const { buttonActive } = this.state;

    return (
      <div>
        <Card border='info' className='ServerCard'>
          <Card.Header>{ALIAS}</Card.Header>
          <Card.Body>
            <Card.Text>ip adress: {IP}</Card.Text>
            <Button
              value={server_status}
              id={id}
              onClick={this.handleClick}
              variant='primary'
              className={buttonActive ? `server-active` : `server-not-active`}
            >
              {buttonActive ? 'Active' : 'Not Active'}
            </Button>
            <Card.Text>date created: {date_created}</Card.Text>
            <Card.Text>hosting company: {CompanyName}</Card.Text>
            <Button
              id={id}
              onClick={this.handleDelete}
              variant='primary'
              className={'btn-warning'}
            >
              🗑
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
