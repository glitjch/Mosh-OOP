// Basic example
const circle = {
  radius: 1,
  location: {
    x: 1,
    y: 1
  },
  draw: function() {
    console.log('draw')
  }
};

circle.draw();

// Factory function
function createCircle(radius) {
  return {
    radius,
    draw: function () {
      console.log('draw');
    }
  }
};

const circle2 = createCircle(1)
circle2.draw()

//
//
// Constructor Function
function Circle(radius) {
  this.radius = radius
  this.draw = function() {
    console.log('draw');
  }
}

//
// exploring the constructor property's inherited function
const Circle1 = new Function ('radius', `
  this.radius = radius
  this.draw = function() {
    console.log('draw');
  }
`);

const circle3 = new Circle1(1);

console.log(circle3)
const another = new Circle(1);

//*IMPORTANT
// Enumerating properties
const circle4 = new Circle(10)

// Check all members of an object/each property key of an object and its value:
for (let key in circle4) {
  if (typeof circle4[key] !== 'function') //==> omit functions
    console.log(key, circle4[key]);
};

// Check all keys of an object:
const keys = Object.keys(circle4);

// Check if a key exists in an object:
if ('radius' in circle) {console.log("Yes, it exists")}


// *IMPORTANT
// Abstraction
//
// private properties
function CirclePrivate(radius) {
  this.radius = radius;

  let defaultLocation = { x: 0, y: 0 } //--> using let instead of this. makes it a
                                      // local variable. It dies outside of the function
                                      // preventing access from the outside to this variable.
  let = computerOptimumLocation = function(factor) {
    // ....
  }
  this.draw = function() {
    let x, y; //--> only in scope within this inner function
    computerOptimumLocation(0.1); // --> in closure with this inner function (from parent function)

    console.log('draw');
  }
};

const circle5 = new CirclePrivate(10)
circle5.draw()


// *IMPORTANT
// Get and Set
//
function CircleGetSet(radius) {
  this.radius = radius;

  let defaultLocation = { x: 0, y: 0 } // Cannot access it from the outside

  this.getDefaultLocation = function () {
    return defaultLocation;
  };

  this.draw = function() {
    console.log('draw');
  };

  Object.defineProperty(this, 'defaultLocation', { // ==> NEW
    get: function() { 
      return defaultLocation;
    }, 
    set: function(value) {
      if (!value.x || !value.y) {
        throw new Error("invalid location")
      }
      defaultLocation = value;
    }
  }); 
};

const circle6 = new CircleGetSet(10)
// access property instead of a method
//  instead of circle6.getDefaultLocation()
circle6.defaultLocation
circle6.draw()




// EXERCISE
// Create a stopwatch with OOP

function Stopwatch() {
  let startCount = null;
  let endCount = null;
  let duration = 0;

  this.start = () => {
    if (startCount) {
      throw new Error("Stopwatch already started")
    }
    startCount = new Date().getTime();
    endCount = 0;
  };

  this.stop = () => {
    if (!startCount) {
      throw new Error("Start stopwatch first")
    };
    if (endCount) {
      throw new Error("Stopwatch already stopped")
    };
    endCount = new Date().getTime();
  };
  
  this.duration = () => {
    duration = (endCount - startCount)/1000
    console.log(duration + " seconds");
    return duration + " seconds"
  }

  this.reset = () => {
    if (!startCount && !endCount) {
      throw new Error("already resetted")
    }
    startCount = null;
    endCount = null;
  }

  Object.defineProperty(this, 'duration', {
    get: () => {
      return duration;
    }
  })
};

const sw = new Stopwatch();
