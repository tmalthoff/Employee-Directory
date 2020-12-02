import React from "react";
import SortableHeader from "./SortableHeader";
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

  filteredResults(results) {
    return results.filter(user => {
      return user.name.toUpperCase().includes(this.state.filterBy.name.toUpperCase())   &&
             user.email.toUpperCase().includes(this.state.filterBy.email.toUpperCase()) &&
             user.phone.toUpperCase().includes(this.state.filterBy.phone.toUpperCase())  &&
             user.cell.toUpperCase().includes(this.state.filterBy.cell.toUpperCase()) ;
    });
  }

  sortBy(property) {
    return (order) => this.setState({
      sortBy: {
        column: [property],
        order: order
      }
    })
  }

  sortedResults(results) {
    if (!this.state.sortBy.column) return results;

    return results.sort((a, b) => {
      // ignore upper and lowercase
      let columnA = a[this.state.sortBy.column].toUpperCase();
      let columnB = b[this.state.sortBy.column].toUpperCase(); 

      if (columnA < columnB) {
        return -1 * this.state.sortBy.order;
      }

      if (columnA > columnB) {
        return 1 * this.state.sortBy.order;
      }

      // values are equal
      return 0;
    })
  }

  order(column) {
    return this.state.sortBy.column == column ? this.state.sortBy.order : 0
  }

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <SortableHeader name="Name" order={this.order('name')} onChange={this.sortBy('name')}/>
              <SortableHeader name="Email" order={this.order('email')} onChange={this.sortBy('email')}/>
              <SortableHeader name="Phone" order={this.order('phone')} onChange={this.sortBy('phone')}/>
              <SortableHeader name="Cellphone" order={this.order('cell')} onChange={this.sortBy('cell')}/>
            </tr>
            <tr>
              <th><input type="text" placeholder="Filter by name" onChange={this.filterBy('name')} /></th>
              <th><input type="text" placeholder="Filter by email" onChange={this.filterBy('email')} /></th>
              <th><input type="text" placeholder="Filter by phone" onChange={this.filterBy('phone')} /></th>
              <th><input type="text" placeholder="Filter by cellphone" onChange={this.filterBy('cell')} /></th>
            </tr>
          </thead>
          <tbody>
            { this.sortedResults(this.filteredResults(this.state.results)).map(user => (
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
