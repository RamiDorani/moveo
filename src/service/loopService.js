import { utilService } from './utilService'

export const loopService = {
    query,
    getLoopById,
    changeStatus,
    checkIfAlreadyOn
}


const loops = [
    { _id: utilService.makeId(),index:0, name: 'Future Func Beats', status: 'OFF', sound: require('../sounds/1.mp3').default },
    { _id: utilService.makeId(),index:1, name: 'Stutter Brealbeats', status: 'OFF', sound: require('../sounds/2.mp3').default },
    { _id: utilService.makeId(),index:2, name: 'Heavy Funk Groove', status: 'OFF', sound: require('../sounds/3.mp3').default },
    { _id: utilService.makeId(),index:3, name: 'Electric Guitar', status: 'OFF', sound: require('../sounds/4.mp3').default },
    { _id: utilService.makeId(),index:4, name: 'Stompy Slosh', status: 'OFF', sound: require('../sounds/5.mp3').default },
    { _id: utilService.makeId(),index:5, name: 'Tanggu', status: 'OFF', sound: require('../sounds/6.mp3').default },
    { _id: utilService.makeId(),index:6, name: 'Maze Politics', status: 'OFF', sound: require('../sounds/7.mp3').default },
    { _id: utilService.makeId(),index:7, name: 'Groove 1.03', status: 'OFF', sound: require('../sounds/8.mp3').default },
    { _id: utilService.makeId(),index:8, name: 'Silent Star', status: 'OFF', sound: require('../sounds/9.mp3').default },
]


function query() {
    return Promise.resolve(loops)
}

function getLoopById(id) {
    const loop = loops.filter((loop) => {
        return loop._id === id
    });
    return loop
}


function changeStatus(id) {

    for (const x in loops) {
        if (loops[x]._id === id) {
            if (loops[x].status === 'OFF') {
                loops[x].status = 'ON'
                return true
            }
            else {
                loops[x].status = 'OFF'
                return false;
            }
        }
    }
}


function checkIfAlreadyOn(id) {
    const loopOn = loops.filter(loop=>{
        return loop._id!==id && loop.status==='ON';
    });
    if(loopOn.length>=1) {
        var idx = loopOn[0].index;
        return idx;
    }
    else return -1
}


