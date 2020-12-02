import React from "react";
import './App.css';

export default class App extends React.Component {
  state = { 
    results: [],
    filterBy: {
      name: '',
      email: '',
      phone: '',
      cell: ''
    },
    sortBy: {
      column: null,
      order: 1
    }
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=25')
      .then(response => response.json())
      .then(data => this.setState({ 
        results: data.results.map(user => {
          user.name = user.name.first + ' ' + user.name.last;
          return user;
        })
      }))
  }

  filterBy(property) {
    return (e) => this.setState({ 
      filterBy: Object.assign(this.state.filterBy, {
         [property]: e.target.value 
      })
    })
  }

  filteredResults() {
    return this.state.results.filter(user => {
      return user.name.indexOf(this.state.filterBy.name) >= 0 &&
             user.email.indexOf(this.state.filterBy.email) >= 0 &&
             user.phone.indexOf(this.state.filterBy.phone) >= 0 &&
             user.cell.indexOf(this.state.filterBy.cell) >= 0;
    });
  }

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Cellphone</th>
            </tr>
            <tr>
              <th><input type="text" placeholder="Filter by name" onChange={this.filterBy('name')} /></th>
              <th><input type="text" placeholder="Filter by email" onChange={this.filterBy('email')} /></th>
              <th><input type="text" placeholder="Filter by phone" onChange={this.filterBy('phone')} /></th>
              <th><input type="text" placeholder="Filter by cellphone" onChange={this.filterBy('cell')} /></th>
            </tr>
          </thead>
          <tbody>
            { this.filteredResults().map(user => (
              <tr>
                <td>{user.name}</td>
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
