import React, { Component } from 'react';

class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    draw = () => {
        const { audioData } = this.props;
        const canvas = this.canvas.current;
        const ch = canvas.height;
        const cw = canvas.width;
        const ctx = canvas.getContext('2d');

        let x = 0;
        const sliceWidth = (cw * 1.0) / audioData.length;

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#034694';
        ctx.clearRect(0, 0, cw, ch);
        ctx.beginPath();
        ctx.moveTo(0, ch / 2);
        for (const item of audioData) {
            const y = (item / 255.0) * ch;
            ctx.lineTo(x, y);
            x += sliceWidth;
        }

        ctx.lineTo(x, ch / 2);
        ctx.stroke();
    }

    componentDidUpdate(prevProps, prevState) {
        this.draw();
    }
    
    render() {
        return <canvas width="300" height="300" ref={this.canvas} />;
    }
 
}

export default AudioVisualiser;