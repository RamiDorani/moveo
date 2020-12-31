import React, { Component } from 'react'


import { loopService } from '../service/loopService'


export class Loop extends Component {

    state = {
        loops: null,
        flag: false,
    }

    //create Refs for the audio tags
    elAudioTag0 = React.createRef();
    elAudioTag1 = React.createRef();
    elAudioTag2 = React.createRef();
    elAudioTag3 = React.createRef();
    elAudioTag4 = React.createRef();
    elAudioTag5 = React.createRef();
    elAudioTag6 = React.createRef();
    elAudioTag7 = React.createRef();
    elAudioTag8 = React.createRef();


    
    async componentDidMount() {
        const loops = await loopService.query();
        this.setState({ loops: loops })
    }

    //main function-controls the pad and the loop
    onChangesStatus = (id, idx) => {
        const { flag } = this.state
        const status = loopService.changeStatus(id);
        this.setState({ flag: !flag });
        const loop = loopService.getLoopById(id);

        if (status) {
            const idxIsAlreadyOn = loopService.checkIfAlreadyOn(id); //check if there pad that is already on.
            if (idxIsAlreadyOn >= 0) {// if true i capture the current time according to Refs
                var test = this[`elAudioTag${idxIsAlreadyOn}`].current.currentTime;
                this[`elAudioTag${idx}`].current.currentTime = test;
            }
            this[`elAudioTag${idx}`].current.controls = true;
            this[`elAudioTag${idx}`].current.play();
            this[`elAudioTag${idx}`].current.loop = true;
        } else {
            this[`elAudioTag${idx}`].current.controls = false;
            this[`elAudioTag${idx}`].current.pause();
            this[`elAudioTag${idx}`].current.loop = false;
            this[`elAudioTag${idx}`].current.load();
        }
    }

    render() {
        const { loops } = this.state
        if (!loops) return <div>loading...</div>
        console.log(loops);

        return (
            <div>
                <h1>LOOP MACHINE</h1>
                <section className="loops-wrapper">
                    {
                        loops.map((loop, idx) => <div key={loop._id} className="loop-card flex-col">
                            <button className="status-header" onClick={() => {
                                this.onChangesStatus(loop._id, idx)
                            }}>{loop.status}</button>
                            <h3 className="name-header">Loop Name: <span className="name-span">{loop.name}</span></h3>
                            <audio ref={this[`elAudioTag${idx}`]} className='loop-audio'>
                                <source src={loop.sound} type="audio/mpeg" />
                            </audio>
                        </div>)
                    }
                </section>
            </div>
        )
    }
}





