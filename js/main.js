// Required abilities of the calculators
// Accept used inputs of number, operator, and another number --done
// Store inputs --done
// Should accept decimal numbers --done
// Recognize inputs and perform calculations --done
// Retuen a result --done

// Features:
// Should acceptt longer arithmetic operations --done
// Store pervious total as start of next operation --done
// Clear button should clear all entries --done
// Should prevent invalid inputs (operators next to each other, two secimal points, ...)

const keys = document.querySelector('.calcButtons')
// Grabbing an even object when any button inside the calcButtons class is clicked
keys.addEventListener('click', event => {
  const { target } = event
  const { value } = target
  if (!target.matches('button')) {
    // return
  } else {
    // Pass value to parse method
    calculator.parseInput(value)
    // console.log(value)
  }
})

const calculator = {
  displayText: '0',
  previousTotal: null,

  parseInput (value) {
    // have any of the 'special buttons' been clicked
    switch (value) {
      case '=' :
      // calculate answer
        this.calcAnswer(this.displayText)
        break
      case 'AC' :
        // clear screen and store values
        this.clearAll()
        break
      case '.' :
        if (this.displayText === '0') {
          // pass '0.' into text method
          this.addText('0.')
        } else {
          // add value to text string
          this.addText(value)
        }
        break
      default :
      // add value to text string
        this.addText(value)
        break
    }
  },
  addText (value) {
    if (this.displayText === '0') {
      this.displayText = ''
    } else if (this.previousTotal !== null) {
      this.displayText = this.previousTotal
      this.previousTotal = null
    }

    // user has entered an invalid input don't proceed
    if (isNaN(+(value)) && isNaN(+(this.displayText))) {
      if (isNaN(this.displayText.slice(-1))) {
        return
      }
    }
    this.displayText += value
    // output display text to screen
    this.outputText(this.displayText)
  },

  outputText (text) {
    document.querySelector('.calcScreen').value = text
  },

  calcAnswer (equation) {
    const result = Function('return ' + equation)()
    this.outputText(result)
  },

  clearAll () {
    this.displayText = '0'
    this.previousTotal = null
    this.outputText(this.displayText)
  }

}
