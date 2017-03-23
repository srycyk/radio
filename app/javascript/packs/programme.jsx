
import React from 'react'
import ReactDOM from 'react-dom'

export default class Programme extends React.Component {
  render() {
    return (
      <div className="programme">
        <ul>
          <li>
            {this.props.programme.on}

            {this.props.programme.starts}-{this.props.programme.finishes}
            </li>
          <li>{this.props.programme.title}</li>
          <li>{this.props.programme.desc}</li>
        </ul>
      </div>
    );
  }
}

