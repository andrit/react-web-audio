import React, { Component } from 'react';
import AudioAnalyser from './components/AudioAnalyzer';
import AudioVisualizer from './components/AudioVisualizer';

class App extends Component {
  // constructor(props) {
  //   super(props);
    state = {
      audio: null
    };
  //   this.getMicrophone = this.getMicrophone.bind(this)
  // }

 getMicrophone =  async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone = () =>{
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  };

  toggleMicrophone = () => {
    if(this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }


  render() {
    return (
      <div className="App">
        <div className="controls">
          <button onClick={this.toggleMicrophone}>
              {this.state.audio ? 'Stop Microphone' : 'Get microphone input'}
          </button>
        </div>
        {this.state.audio 
          ? <AudioAnalyser render={data => (
              <AudioVisualizer audioData={data} />
            )} /> : '' }
      </div>
    );
  }
}

export default App;
