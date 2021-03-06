import React, { Component } from 'react';


class AudioAnalyser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioData: new Uint8Array(0) 
        }
    }
    
    componentDidMount() {
        this.audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        this.source.connect(this.analyser);
        this.rafId = requestAnimationFrame(this.tick);
    }
    tick = () => {
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.setState({ audioData: this.dataArray });
        this.rafId = requestAnimationFrame(this.tick);
    }
    
    render(){
        return (
            <React.Fragment>
                { this.props.render(this.state) }
            </React.Fragment>
        );
    }
}

export default AudioAnalyser;