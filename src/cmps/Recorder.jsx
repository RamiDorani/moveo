import React, { Component } from 'react'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

export class Recorder extends Component {
    
    state = {
        recordState: null,
        record: null,
        recordFinish:false,
        recordIsOn:'START RECORDING'
    }



    start = () => {
        this.setState({
            recordState: RecordState.START
        })
        this.setState({recordFinish:false})
    }

    stop = () => {
        this.setState({
            recordState: RecordState.STOP
        })

        this.setState({recordFinish:true})
    }

    //audioData contains blob and blobUrl
    onStop = (audioData) => {
        this.setState({ record: audioData.url })
    }

    controlRecord = ()=> {
        if (this.state.recordIsOn==='START RECORDING') {
            this.start();
            this.setState({recordIsOn:'STOP RECORDING'})
        }
        else {
            this.stop();
            this.setState({recordIsOn:'START RECORDING'})
        }
    }

    render() {
        const { recordState } = this.state

        return (
            <div className="recorder-wrapper flex-col">
                <AudioReactRecorder className="echo" state={recordState} onStop={this.onStop} />
                {this.state.recordFinish&&<audio className="record-controller" src={this.state.record} controls>
                </audio>}
                <button  onClick={this.controlRecord}>{this.state.recordIsOn}</button>
            </div>
        )
    }
}
