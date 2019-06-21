import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ServerCard.css';

export default class ServerCard extends Component {
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

  handleClick = async event => {
    const { id } = this.props;
    const statusob = { status: !event.target.value };
    console.log(event.target.value);
    const response = await fetch(`http://localhost:4000/servers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(statusob)
    });
    if (response.status === 200) {
      //   this.event.props;
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
      HostingID
    } = this.props;
    return (
      <div>
        <Card border='info' className='mail-card'>
          <Card.Header>{ALIAS}</Card.Header>
          <Card.Body>
            <Card.Text>ip adress: {IP}</Card.Text>
            <Button
              value={server_status}
              id={id}
              onClick={this.handleClick}
              variant='primary'
              className={server_status ? 'server-active' : 'server-not-active'}
            >
              {server_status ? 'Active' : 'Not Active'}
            </Button>
            <Card.Text>server_status: {server_status}</Card.Text>
            <Card.Text>date created: {date_created}</Card.Text>
            <Card.Text>hosting company: {HostingID}</Card.Text>
            <Button id={id} onClick={this.handleDelete} variant='primary'>
              🗑
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
