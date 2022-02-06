import React from "react";
import logo from './logo.svg';
import './App.css';

class ChildComponent extends React.PureComponent {
  render () {
    return (
      <div>
        {this.props.numbers}
      </div>
    )
  }
}

class MainComponent extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      numbers: 1
    }
  }
  
  handleClick () {
    this.setState({
      numbers: this.state.numbers + 1
    })
    console.log(this.state.numbers)
  }
  
  render () {
    return (
      <div>
        <button onClick={this.handleClick}/>
        <ChildComponent numbers={this.state.numbers}/>
      </div>
    )
  }
}

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MainComponent/>
    </div>
  );
}

export default App;
