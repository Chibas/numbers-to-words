type DigitsDictionary = {
  [key: number]: string;
}
type Separators = {
  [key: string]: number;
}

export class NumberFormatter {
  private digits: DigitsDictionary = {
    1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine',
    10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 
    17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty', 30: 'thirty', 40: 'fourty', 50: 'fifty',
    60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety'
  };
  private separators : Separators = { thousand: 1000, hundred: 100, decimal: 10, digits: 1 }

  protected formatStringArray = (wordsList: string[]): string => {
    if (Object.values(this.digits).includes(wordsList.at(-2)!)) {
      const tmp = wordsList.pop();
      wordsList[wordsList.length - 1] += '-' + tmp;
    }
    return new (Intl as any).ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(wordsList);
  }

  protected numberFormatter = (number: number): string => {
    let wordsList: string[] = [];
    for (let key in this.separators) {
        if (number >= this.separators[key]) {
          let value: number = Math.floor(number / this.separators[key]);
          wordsList.push(
            this.digits[number] || this.digits[value * this.separators[key]] || `${this.digits[value]} ${key}`
          );
          number = number % ((this.digits[number] && number) || this.separators[key]);
        }
    }
    return this.formatStringArray(wordsList);
  }

  public format = (number: number) => {
    if(isNaN(number)) {
      throw new Error('Not a number');
    } else if(number < 0 || number > 100000 ) {
      throw new Error('Number not in range 0 - 100,000')
    }
    return this.numberFormatter(number)
  }
}

