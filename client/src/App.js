import React, { Component } from 'react'
import './App.css'

var containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 24,
  height: '100vh',
}

var divStyle = {
  margin: 24,
}

var imgStyle = {
  maxHeight: 200,
}

class App extends Component {
  state = { images: [
    { name: '', url:''  }
  ]
}

 componentDidMount() {
    fetch('/frames')
      .then(res => res.json())
      .then(data => this.setState({ images: data }))
      .then(console.log(this.state))
      .catch(error => console.log(error));
  }


  render() {
    return (
      <div className="App" style={containerStyle}>
        {this.state.images.map(
          (frame,i) =>
          <div key={i} style={divStyle}>
            <img src={frame.url} style={imgStyle} alt={"figma component"}/>
            <p>{frame.name}</p>
          </div>
        )}
      </div>
    )
  }
}

export default App;
