
import React from 'react'
import ReactDOM from 'react-dom'

export default class Programme extends React.Component {
  render() {
    return (
      <div className="programme">
        <ul>
          <li>
            {this.props.programme.starts}-{this.props.programme.finishes}
            {' '}
            <em>{this.props.programme.on_on}</em>
            {' '}
            <b>{this.props.programme.station}</b>
            </li>
          <li>{this.props.programme.title}</li>
          <li><small>{this.props.programme.desc}</small></li>
        </ul>
      </div>
    );
  }
}

