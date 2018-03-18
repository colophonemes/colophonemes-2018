import 'p5/lib/addons/p5.dom'

export default function sketch (p5) {
  // global variables
  const origin = [0, 0]
  let canvasBounds
  let MAX_LENGTH
  let MIN_LENGTH
  let offset
  let oldBounds

  let arms

  let traceBuffer
  let lastTraceColor
  let lastTraceColorDirections
  let lastTraceColorSpeed

  function calculateBounds (bounds = [300, 300]) {
    // recalc
    canvasBounds = bounds
    MAX_LENGTH = Math.round(Math.max(...canvasBounds) / 4)
    MIN_LENGTH = 1
    offset = canvasBounds.map(b => b / 2)
  }

  function createCanvas () {
    p5.createCanvas(...canvasBounds)
    traceBuffer = p5.createGraphics(...canvasBounds)
    getArms()
  }

  function getArms () {
    arms = fillArray(randomInt(4) + 2, () => new Arm(0, 15 * (randomInt(10) + 1), randomDirection() * Math.random() / 10))
  }

  p5.setup = () => {
    calculateBounds()
    createCanvas()
    lastTraceColor = fillArray(3, p5.random(255))
    lastTraceColorDirections = fillArray(3, randomDirection)
    lastTraceColorSpeed = 1
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    const {bounds} = props
    if (!traceBuffer) return
    if (!bounds.equals(oldBounds)) {
      calculateBounds(bounds.toJS())
      p5.resizeCanvas(...canvasBounds)
      traceBuffer.size(...canvasBounds)
      getArms()
      oldBounds = bounds
    }
  }

  p5.draw = () => {
    p5.background(255)
    p5.image(traceBuffer, 0, 0)
    p5.push() // L1
    p5.translate(...offset)

    let i = 0
    for (let arm of arms) {
      // get the previous arm in the sequence
      const prev = i > 0 ? arms[i - 1] : null
      const newStart = prev ? prev.end : origin
      // update the arm, using the previous arm's end position
      arm.update(newStart)
      i++
    }
    // display the arms in random order, so the trails may go over or under
    const armI = arms.map((a, i) => i).sort(randomDirection)
    for (let i of armI) {
      const trace = i !== 0
      arms[i].display(trace)
    }
    // add the tracer images
    p5.pop()
  }

  function Arm (angle, length, speed = 0, expansion = 0) {
    this.start = origin
    this.end = origin
    this.length = length > MIN_LENGTH
      ? (length < MAX_LENGTH ? length : MAX_LENGTH)
      : MIN_LENGTH
    this.speed = Math.abs(speed)
    this.direction = Math.abs(speed) > speed ? -1 : 1
    this.angle = angle
    this.mass = 4

    this.expansion = Math.abs(expansion)
    this.expansionDirection = Math.abs(expansion) > expansion ? -1 : 1

    this.traceColor = fillArray(3, () => randomInt(255))
    this.traceColor.push(127)

    // draw the arm and the mass at the end
    this.display = (trace) => {
      p5.stroke(0, 0, 0, 64)
      p5.fill(0)
      p5.strokeWeight(2)
      p5.line(...this.start, ...this.end)
      p5.fill(0, 0, 0, 127)
      p5.ellipse(...this.end, this.mass, this.mass)
      if (trace) drawTrace(this.end, this.traceColor)
    }

    // update the arm's angle and start/end position
    this.update = (newStart) => {
      if (newStart) this.start = newStart // update with a different origin (e.g. the previous arm's endpoint)
      if (this.speed) this.angle += (this.speed * this.direction) // update the angle
      if (this.expansion) {
        this.length += this.expansion * this.expansionDirection
        if (this.length > MAX_LENGTH || this.length < MIN_LENGTH) this.expansionDirection *= -1
      }
      const x = this.length * p5.sin(this.angle) + this.start[0]
      const y = this.length * p5.cos(this.angle) + this.start[1]
      this.end = [x, y]
    }
  }

  function drawTrace ([x, y], color) {
    if (!color) {
      lastTraceColor = lastTraceColor.map((a, i) => {
        let newA = a + (lastTraceColorSpeed * lastTraceColorDirections[i])
        if (newA > 255 || newA < 0) {
          lastTraceColorDirections[i] = lastTraceColorDirections[i] * -1 // reverse the direction
          newA = newA < 0 ? 1 : 254
        }
        return newA
      })
      traceBuffer.fill(...lastTraceColor)
    } else {
      traceBuffer.fill(...color)
    }
    traceBuffer.noStroke()
    const c = [x + offset[0], y + offset[1]]
    const size = fillArray(2, 3)
    traceBuffer.ellipse(...c, ...size)
  }
}

function randomInt (upper) {
  return Math.round(Math.random() * upper)
}

function randomDirection () {
  return randomInt(1) ? -1 : 1
}

function fillArray (length, fill) {
  return Array.apply(null, new Array(length)).map(a => typeof fill === 'function' ? fill() : fill)
}
