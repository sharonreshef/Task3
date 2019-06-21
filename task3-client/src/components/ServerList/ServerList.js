import React, { Component } from 'react';
import ServerCard from '../ServerCard/ServerCard';
import Col from 'react-bootstrap/Col';
import './ServerList.css';

export default class ServerList extends Component {
  render() {
    let serverList;
    if (this.props.AllServers.length > 0) {
      serverList = this.props.AllServers.map((server, i) => (
        <ServerCard
          onDelete={this.props.onDelete}
          key={i}
          id={server.id}
          {...server}
        />
      ));
    } else {
      serverList = <p className='empty'>No servers to show</p>;
    }

    return (
      <div>
        <Col className='ServerList' xs={9}>
          {serverList}
        </Col>
      </div>
    );
  }
}
