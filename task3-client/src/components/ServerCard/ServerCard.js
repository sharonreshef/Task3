import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
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
      <Card border='info' className='mail-card'>
        <Card.Header>{ALIAS}</Card.Header>
        <Card.Body>
          <Card.Text>ip adress: {IP}</Card.Text>
          <Card.Text>server_status: {server_status}</Card.Text>
          <Card.Text>date created: {date_created}</Card.Text>
          <Card.Text>hosting company: {HostingID}</Card.Text>
          <Button id={id} onClick={this.handleDelete} variant='primary'>
            🗑
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
