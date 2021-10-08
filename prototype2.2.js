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


// Tone.js parameters:
const gainNode = new Tone.Gain().toDestination();
const pingPong = new Tone.PingPongDelay().connect(gainNode);
const phaser = new Tone.Phaser().connect(pingPong);
const pitchShift = new Tone.PitchShift().connect(pingPong);


let synth4pitch;

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


// Other Variables
let newAcc;
let newAcc2;
// let inverse = true;
let is_running = false;
let demo_button = document.getElementById("start_demo");
Tone.Transport.bpm.value = 50;



  // Random tone generator 
  const freq = note => 2 ** (note / 12) * 440; // 440 is the frequency of A4
  // the bitwise Or does the same as Math.floor
  //const notes = [-12, -10,  -8, -7,  -5, -3 , -1,0, 2, 4, 5, 7, 9, 11, 12]; // Close to your 100, 400, 1600 and 6300
  const notes = [7, 9, 12, 14, 16, 19]; 
  const notes2 = [0, 2, 4,  7, 9, 12]; 
  const notes3 = [-8, -5, -3 ,0, 2, 4]; 
   // const notes3 = [-8, -5, -3 ,0, 2, 4,  7, 9, 12, 14, 16, 19]; 

  let randomArray = [];
  let randomArray2 = [];
  let randomArray3 = [];
  function createRandomness() {
    for (var i = 0; i < 100; i += 1) {

      const randomNote = () => notes[Math.random() * notes.length | 0]; // the bitwise Or does the same as Math.floor
  
      let random = freq(randomNote());
      randomArray.push(random);
  
  
      const randomNote2 = () => notes[Math.random() * notes2.length | 0]; // the bitwise Or does the same as Math.floor
     let random2 = freq(randomNote2());
     randomArray2.push(random2);
  
     const randomNote3 = () => notes[Math.random() * notes3.length | 0]; // the bitwise Or does the same as Math.floor
     let random3 = freq(randomNote3());
     randomArray3.push(random3);

  };


                  
  }


var pattern = new Tone.Pattern(function(time, note){
	synth.triggerAttackRelease(note, 0.5);
}, randomArray);
var pattern2 = new Tone.Pattern(function(time, note){
	synth2.triggerAttackRelease(note, 0.5);
}, randomArray2);
var pattern3 = new Tone.Pattern(function(time, note){
	synth3.triggerAttackRelease(note, 0.5);
}, randomArray3);

var pattern5 = new Tone.Pattern(function(time, note){
	synth5.triggerAttackRelease(note, 0.5);
}, ["C1", ["D1", "D1"], "E3", "C1"]);

pattern.start();
pattern2.start();
pattern3.start();
pattern5.start();
pattern.mute = false;
pattern2.mute = true;
pattern3.mute = true;
pattern5.mute = false;


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

        else if ((yDotValues > 80) && (xDotValues < 80))
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



