import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      item: "",
      submit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  handleChange(event) {
    var item = event.target.value;
    this.setState({item: event.target.value});

    if (item.length > 1) {
      this.setState({submit: true});
    }
    else {
      this.setState({submit: false});
    }
  }

  add(e) {
    e.preventDefault();
    var val = this.state.item;

    this.setState({items: [...this.state.items, {text: val, completed: false}], item: "", submit: false});
  }

  delete(i) {
    this.setState({items: [...this.state.items.slice(0, i), ...this.state.items.slice(i + 1) ]});
  }

  update(item) {
    if (item.completed === false) {
      item.completed = true;
    }
    else {
      item.completed = false;
    }
    this.forceUpdate();
  }

  render() {
    var list = this.state.items.map ((item, i) => {
      return (
        <li key = {i}><input type = "checkbox" onChange = {() => this.update(item)}
        checked = {item.completed}></input>
        <div className = {item.completed ? "singleitem completed" : "singleitem"}>{item.text}</div>
        <button className = "delete" onClick = {() => this.delete(i)}>X</button></li>
      )
    });

    var completed = this.state.items.filter(item => item.completed).length;
    var notcompleted = this.state.items.filter(item => !item.completed).length;

    return (
      <div className = "App">
        <h1>Todo List</h1>
        <div id = "main">
          <form onSubmit = {this.add}>
            <input type = "text" name = "name" value = {this.state.item} 
            onChange = {this.handleChange} placeholder = "What tasks do you need to accomplish?"></input>
            <input type = "submit" value = "Add" disabled = {!this.state.submit}></input>
          </form>
          <div id = "todos">
            <ul>
              {list}
            </ul>
            <div id = "bottom">
              {completed} down, {notcompleted} to go
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
