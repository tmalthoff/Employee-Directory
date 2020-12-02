import React from "react";
import './App.css';

export default class App extends React.Component {
  state = { results: [] }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=25')
      .then(response => response.json())
      .then(data => this.setState({ results: data.results }))
  }

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Cellphone</th>
          </thead>
          <tbody>
            { this.state.results.map(user => (
              <tr>
                <td>{user.name.first} {user.name.last}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.cell}</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}
