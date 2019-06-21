import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './NewServer.css';

export default class NewServer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      ALIAS: '',
      IP: '',
      //   Hosting: this.props.hostingNames[0],
      hosting: 1,
      hostingAsID: ''
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleFormSubmit = event => {
    console.log('Submited form', this.state);
    event.preventDefault();
    this.setState({
      show: false
    });
    this.sendServerToDB();
  };

  sendServerToDB = () => {
    console.log(this.props);
    const { onAdd } = this.props;
    const { ALIAS, IP, Hosting } = this.state;
    const server = {
      ALIAS,
      IP,
      Hosting
    };
    onAdd(server);
    this.setState({
      ALIAS: '',
      IP: ''
      //   Hosting: this.props.hostingNames[0]
    });

    console.log(JSON.stringify(server));
  };

  updateALIASValue(event) {
    this.setState({ ALIAS: event.target.value });
  }

  updateIPValue(event) {
    this.setState({ IP: event.target.value });
  }

  updateHostingValue(event) {
    console.log(event.target.value);
    // this.setState({ hosting: event.target.value });
  }

  render() {
    return (
      <>
        <Button
          variant='primary'
          onClick={this.handleShow}
          className='create-server fixed-bottom'
        >
          Add new server
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Server</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleFormSubmit}>
            <Modal.Body>
              <Form.Group controlId='formName'>
                <Form.Label>Server Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter server name'
                  value={this.state.ALIAS}
                  onChange={event => this.updateALIASValue(event)}
                />
              </Form.Group>
              <Form.Group controlId='formIP'>
                <Form.Label>IP Address</Form.Label>
                <Form.Control
                  placeholder='Enter Valid IP Address'
                  value={this.state.IP}
                  onChange={event => this.updateIPValue(event)}
                />
              </Form.Group>
              <Form.Group controlId='formHosting'>
                <Form.Label>Choose Hosting company</Form.Label>
                <Form.Control
                  as='select'
                  onChange={event => this.updateHostingValue(event)}
                >
                  {this.props.hostingNames.map((h, i) => (
                    <option>{h}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={this.handleClose}>
                Cancle
              </Button>
              <Button variant='primary' type='submit' value='submit'>
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}
