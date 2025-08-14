const audioContext=new AudioContext();
const NOTE_DETAILS=[
    {note:"C",key:"Z",frequency:261.626,active:false},
    {note:"Db",key:"S",frequency:277.183,active:false},
    {note:"D",key:"X",frequency:293.665,active:false},
    {note:"Eb",key:"D",frequency:311.127,active:false},
    {note:"E",key:"C",frequency:329.628,active:false},
    {note:"F",key:"V",frequency:349.228,active:false},
    {note:"Gb",key:"G",frequency:369.994,active:false},
    {note:"G",key:"B",frequency:391.995,active:false},
    {note:"Ab",key:"H",frequency:415.305,active:false},
    {note:"A",key:"N",frequency:440,active:false},
    {note:"Bb",key:"J",frequency:466.164,active:false},
    {note:"B",key:"M",frequency:493.883,active:false},
]

document.addEventListener("keydown",e=>{
    if(e.repeat) return;
    const boardKey=e.code;
    const Note=getNoteDetail(boardKey);
    if(Note==null) return;
    Note.active=true;
    playNotes();
})
document.addEventListener("keyup",e=>{
    const boardKey=e.code;
    const Note=getNoteDetail(boardKey);
    if(Note==null) return ;
    Note.active=false;
    playNotes();
})
function getNoteDetail(boardKey){
    return NOTE_DETAILS.find(n=>`Key${n.key}`===boardKey);
}
function playNotes(){
    NOTE_DETAILS.forEach(n=>{
        const element=document.querySelector(`[data-note="${n.note}"]`);
        element.classList.toggle("active",n.active);
        if(n.oscillator!=null){
            n.oscillator.stop();
            n.oscillator.disconnect();
        }
    })

    const activeNotes=NOTE_DETAILS.filter(n=>n.active)
    const gain=1/activeNotes.length
    activeNotes.forEach(n=>{
    startNote(n,gain);
    })
}
function startNote(Note,gain){
    const gainNote=audioContext.createGain();
    gainNote.gain.value=gain;
    const oscillator=audioContext.createOscillator();
    oscillator.frequency.value=Note.frequency;
    oscillator.type="sine";
    oscillator.connect(gainNote).connect(audioContext.destination);
    oscillator.start();
    Note.oscillator=oscillator;
}

