import { Component, render } from "./my-react.js"

class MyComponent extends Component {
  render () {
    return <div>
      <h1>My component</h1>
      {this.chlidren}
    </div>
  }
}

render(<MyComponent id="a" class="c">
  <div>abc</div>
  <div/>
  <div/>
</MyComponent>, document.body)
