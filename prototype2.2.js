// This prototype is an app for android and iOs phones, which uses
// accelerometer and gyroscoe data to control a loop. 
// The prototype was developed by Mari Lesteberg 
// from Janury - June 2021, supported by RITMO / University of Oslo


// Functioning prototype 1: Tone.js 15. February
// The oscillator version with new code + adding the Tone.js library.


// 11. februar: including the Tone.js to improve sound quality
//1. og 2. mars: creating a loop function
//16. april: making it work for iOS

// 4. may
// visuals update and update with the new and better QOM

// 26. mai

// 9. august:
// working on a new version that is stripped down regarding buttons and attributes. 
// Will try to enable sound to appear instantly, to enable motion sensor when page is 
// loaded

// 18. august
// tidying up, and trying to create a more musical loop rather than random?

// 8. october Finishing the second iteration. applying some viusal feedback.

// Other Variables
let newAcc;
let newAcc2;
// let inverse = true;
let is_running = false;
let demo_button = document.getElementById("start_demo");


  ///////// TONE.JS VARIABLES ///////////
  const gainNode = new Tone.Gain().toDestination();

  const pingPong = new Tone.PingPongDelay().connect(gainNode);

  pingPong.wet.value = 0.2;
  const reverb = new Tone.Reverb().connect(pingPong);
  reverb.dampening = 1000;

  reverb.wet.value = 0.8;
  const autoWah = new Tone.AutoWah({
      frequency: 200,
      baseFrequency: 440,
      wet: 0.3,
      gain: 0.1,
  }).connect(reverb);

  // bass
  const synth0 = new Tone.AMSynth({
      volume: -9,
      oscillator: {
        type: "sine9"
      },
  });

  // harmony
  const synth = new Tone.DuoSynth({
      volume: -19,
      voice0: {
          oscillator: {
              type: "fmsawtooth",

            },
          envelope: {
              attack: 0.9,
              decay: 0.3,
              sustain: 1,
              release: 0.9,
          },
          filter: {
              Q: 17,
              frequency: 850,

          },
      },

      voice1: {
          oscillator: {
              type: "pulse",

            },

      },



    })
  const synth2 = new Tone.Synth({
      volume: -9,
      oscillator: {
        type: "sine3"
      },
      envelope: {
        attack: 0.1,
        decay: 0.3,
        sustain: 0.4,
        release: 0.8,
      }/* ,
      filterEnvelope: {
        attack: 0.01,
        decay: 0.7,
        sustain: 0.1,
        release: 0.8,
        baseFrequency: 300,
        octaves: 4
      } */
    });
//  const synth3 = new Tone.PluckSynth();
  const synth3 = new Tone.Synth({
      volume: -9,
      oscillator: {
        type: "sine6"
      },
      envelope: {
        attack: 0.1,
        decay: 0.3,
        sustain: 0.4,
        release: 0.5,
      }/* ,
      filterEnvelope: {
        attack: 0.001,
        decay: 0.7,
        sustain: 0.1,
        release: 0.8,
        baseFrequency: 300,
        octaves: 4
      } */
    });

    // melody synth: 
    const synth4 = new Tone.Synth({
      volume: 1,
      oscillator: {
          type: "sine7"
      },
      envelope: {
        attack: 0.1,
        decay: 0.3,
        sustain: 0.4,
        release: 0.5,
      }/* ,
      filterEnvelope: {
        attack: 0.001,
        decay: 0.7,
        sustain: 0.1,
        release: 0.8,
        baseFrequency: 300,
        octaves: 4
      } */
    });

  const synth5 = new Tone.MembraneSynth({
      envelope: {
          attack: 0.9,
          decay: 0.6,
          sustain: 0.4,
          release: 0.5,
        },
     volume: -7
  }).connect(gainNode);

  // Hi hat:
  const synth6 = new Tone.MetalSynth({
      envelope: {
          attack: 0.1,
          decay: 0.2,
          sustain: 0.1,
          release: 0.1,
        },
     volume: -15,
  }
  ).connect(gainNode);


  gainNode.gain.value = 0.5;
  

//Tone.Transport.bpm.value = 40;



// Random tone generator 

// Defining frequencies

const freq = note => 2 ** (note / 12) * 440; 



   // creating a random rhythm
   function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const random0 = getRandomInt(15) + 2;
  const randomScale = getRandomInt(4);
  const randomTimbre = getRandomInt(4);
  const randomTempo = getRandomInt(5);


function createRandomness() {
// diatonic scales 
const notes3 = [6, 8, 9, 11, 13, 14]; 
const notes2 = [-4, -3, -1,  1, 2, 4]; 
const notes = [-18, -16, -15 ,-13, -11, -10, -8 , -6]; 

const notes3_1 = [5, 7, 8, 10, 12, 13]; 
const notes2_1 = [-5, -4, -2,  0, 1, 3]; 
const notes_1 = [-19, -17, -16 ,-14, -12, -11, -9 , -7]; 

const pentaNotes3 = [4, 7, 9, 12, 14, 16]; 
const pentaNotes2 = [-7, -5 , -3, 0,  2, 4, 7]; 
const pentaNotes = [-19, -17, -15, -12 ,-10, -7, -5, -3 ,0]; 

const wholeNotes3 = [10, 12, 14, 16, 18, 20]; 
const wholeNotes2 = [-2 , 0, 2,  4, 6, 8]; 
const wholeNotes = [-20 ,-18, -16, -14, -12 ,-10]; 





 // const notes3 = [-8, -5, -3 ,0, 2, 4,  7, 9, 12, 14, 16, 19]; 

let randomArray = [];
let randomArray2 = [];
let randomArray3 = [];
let randomHiHatArray = [];
let randomDrumArray = [];
let randomMelodyArray = [];


    if (randomTimbre == 0) 
    synth4.oscillator.type = "fmsine";
    if (randomTimbre == 1) 
    synth4.oscillator.type = "pwm";
    if (randomTimbre == 2) 
    synth4.oscillator.type = "pulse";
    else
    synth4.oscillator.type = "amsawtooth4";
    //console.log(randomTimbre, synth4.oscillator.type);

    if (randomTempo == 0) 
    Tone.Transport.bpm.value = 40;
    if (randomTempo == 1) 
    Tone.Transport.bpm.value = 40;
    if (randomTempo == 2) 
    Tone.Transport.bpm.value = 80;
    if (randomTempo == 3) 
    Tone.Transport.bpm.value = 120;
    if (randomTempo == 4) 
    Tone.Transport.bpm.value = 60;


    document.getElementById("timeSign").innerHTML =
    "Time signature: " + random0 + " / 16";

    document.getElementById("tempo").innerHTML =
    "BPM: " + Tone.Transport.bpm.value;

    let scaleNotes = [];
    let scaleNotes2 = [];
    let scaleNotes3 = [];

    if (randomScale == 0)
    scaleNotes = pentaNotes,
    scaleNotes2 = pentaNotes2,
    scaleNotes3 = pentaNotes3,
    document.getElementById("scale").innerHTML =
    "Scale: pentatone";
    if (randomScale == 1)
    scaleNotes = wholeNotes,
    scaleNotes2 = wholeNotes2,
    scaleNotes3 = wholeNotes3,
    document.getElementById("scale").innerHTML =
    "Scale: wholetone";
    if (randomScale == 2)
    scaleNotes = notes_1,
    scaleNotes2 = notes2_1,
    scaleNotes3 = notes3_1,
    document.getElementById("scale").innerHTML =
    "Scale: diatonic2";
    else
    scaleNotes = notes,
    scaleNotes2 = notes2,
    scaleNotes3 = notes3,
    document.getElementById("scale").innerHTML =
    "Scale: diatonic";

  
  for (var i = 0; i < random0; i += 1) {

    const randomNote = () => scaleNotes[Math.random() * scaleNotes.length | 0]; 

    let random = freq(randomNote());
    randomArray.push(random);


    const randomNote2 = () => scaleNotes2[Math.random() * scaleNotes2.length | 0]; 
   let random2 = freq(randomNote2());
   randomArray2.push(random2);

   const randomNote3 = () => scaleNotes3[Math.random() * scaleNotes3.length | 0]; 
   let random3 = freq(randomNote3());
   randomArray3.push(random3);
   

   let random4 = getRandomInt(10);
   let random5 = getRandomInt(14);
   let randomMelody = getRandomInt(14);

    if (random4 > 4)
    randomHiHatArray.push(("C1 C1").split(" ")),
    randomMelodyArray.push(random);
    if (random4 == 1)
    randomHiHatArray.push(("C1 C1").split(" ")),
    randomMelodyArray.push((0 + " " + random).split(" "));
    else
    randomHiHatArray.push("C1"),
    randomMelodyArray.push((random + " " + random + " " + random).split(" "));

    if (random5 > 10)
    randomDrumArray.push(("C1 C1").split(" "));
    if (random5 == 1)
    randomDrumArray.push(("C1 C1 C1").split(" "));
    if (random5 > 8)
    randomDrumArray.push("F2");
    else
    randomDrumArray.push("C1")

};


//console.log(randomDrumArray);



}


// With this function the values won't go below a threshold 
function clamp(min, max, val) {
  return Math.min(Math.max(min, +val), max);
}

//Scaling any incoming number
function generateScaleFunction(prevMin, prevMax, newMin, newMax) {
var offset = newMin - prevMin,
    scale = (newMax - newMin) / (prevMax - prevMin);
  return function (x) {
      return offset + scale * x;
      };
};

// function for updating values for sensor data
function updateFieldIfNotNull(fieldName, value, precision=2){
    if (value != null)
      document.getElementById(fieldName).innerHTML = value.toFixed(precision);
  }


  function handleMotion(event) {

    
// variables for rotation, GUI monitoring and volume control
    let xValue = event.acceleration.x; 
    let yValue = event.acceleration.y; 
    let zValue = event.acceleration.z;
    let totAcc = (Math.abs(xValue) + Math.abs(yValue) + Math.abs(zValue));
    let elem = document.getElementById("myAnimation"); 
 

    ///////////////////////////////////////////////
    /////////////// VOLUME VARIABLES //////////////
    ///////////////////////////////////////////////

    // Scaling values for inverted volume-control
    var fn = generateScaleFunction(0.3, 3, 0.9, 0.1);
    newAcc = fn(totAcc);
    newAcc = (clamp(0, 0.9, newAcc));
    let tempo = Math.floor(newAcc * 150);

    // Scaling values for non-inverted volume-control
    var fn2 = generateScaleFunction(0.3, 3, 0, 0.9);
    newAcc2 = fn2(totAcc);
    newAcc2 = (clamp(0, 0.9, newAcc2));
    let tempo2 = Math.floor(newAcc2 * 100);

    // Switch between inverted and non-inverted volume-control, 
    // and visual feedback indicated by the opacity of the element in GUI

    gainNode.gain.rampTo(newAcc2, 0.1);
    Tone.Transport.bpm.rampTo(tempo, 0.5);

    ////////////////////////////////////////////
    ///////// Red Dot Monitoring in GUI ///////
    ///////////////////////////////////////////


    // multiplying with 5 to get values from 0-100
    let xDotValues = (((event.accelerationIncludingGravity.x * -1) + 10) * 5);
    // multiplying with 5 to get values from 0-100
    let yDotValues = ((event.accelerationIncludingGravity.y  + 10) * 5);
    elem.style.top = yDotValues + '%'; 
    elem.style.left = xDotValues + '%';  

    updateFieldIfNotNull('x_dots', xDotValues);
    updateFieldIfNotNull('y_dots', yDotValues);
      

    ///////////////////////////////////////////////
    /////// Variables for effects and pitch ///////
    ///////////////////////////////////////////////
    // Filter
    var filterScale = generateScaleFunction(-10, 10, 10, 300);
   
        // Effects
        

        phaser.frequency.value = xDotValues / 2;
        phaser.octaves = (yDotValues / 20);

       phaser.wet.value = yDotValues / 160;


        pingPong.feedback.value = (xDotValues / 300);
        pitchShift.pitch = Math.floor(((yDotValues * -1) + 75) / 10);
        
        
        // On and off Pattern1
        if ((yDotValues < 40) && (xDotValues < 40))
        pattern.mute = false,
        updateFieldIfNotNull('pitchwheel', pitchShift.pitch);

        else if ((yDotValues > 80) && (xDotValues < 40))
        pattern.mute = true;

        // On and off Pattern2
        if ((yDotValues < 30) && (xDotValues > 80))
        pattern2.mute = true;

        else if ((yDotValues > 80) && (xDotValues < 800))
        pattern2.mute = false;

    
        // On and off Pattern3
        if (yDotValues < 10)
        pattern3.mute = false;

        else if (yDotValues > 100)
        pattern3.mute = true;


        let gainValue = (((event.accelerationIncludingGravity.y * -1)  + 10) / 50);
        synth4pitch = Math.abs((yDotValues * -1) * 2);


        gainNode.gain.rampTo(gainValue, 0.3);
        

    }
 


    document.getElementById("looper1").addEventListener("click", function() {
          if(this.className == ''){
          
                   // Request permission for iOS 13+ devices
                   if (
                    DeviceMotionEvent &&
                    typeof DeviceMotionEvent.requestPermission === "function"
                  ) {
                    DeviceMotionEvent.requestPermission();
                  }
      

                  const seq0 = new Tone.Sequence((time, note) => {
                    synth0.triggerAttackRelease(note, 2, time);
                    // subdivisions are given as subarrays
                }, randomArray).start(0);
                seq0.playbackRate = 0.5;
                
                const seq = new Tone.Sequence((time, note) => {
                    synth.triggerAttackRelease(note, 2, time);
                    // subdivisions are given as subarrays
                }, randomArray).start(0);
                seq.playbackRate = 0.5;
            
                const seq2 = new Tone.Sequence((time, note) => {
                   synth2.triggerAttackRelease(note, 0.8, time);
                   // subdivisions are given as subarrays
               }, randomArray2).start(0);
            
               const seq3 = new Tone.Sequence((time, note) => {
                   synth3.triggerAttackRelease(note, 0.8, time);
                   // subdivisions are given as subarrays
               }, randomArray3).start(0);
            
               const seq4 = new Tone.Sequence((time, note) => {
                synth4.triggerAttackRelease(note, 0.3, time);
                // subdivisions are given as subarrays
            }, randomMelodyArray).start(0);
            
               const pattern6 = new Tone.Sequence(function(time, note){
                synth6.triggerAttackRelease(note, 0.9);
                }, randomHiHatArray).start();
              
                const pattern5 = new Tone.Sequence(function(time, note){
                synth5.triggerAttackRelease(note, 0.9);
                }, randomDrumArray).start();
            
             

      this.className = "is-playing";
      this.innerHTML = "";
      
      Tone.Transport.start();
      Tone.start();
      window.addEventListener("devicemotion", handleMotion);
      
}
          else{

     synth4.triggerAttackRelease(440, 0.2);    


    
  }}
  );



