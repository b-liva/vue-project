class JNumber{
    constructor(number) {
      if (typeof number === 'string'){
        number = parseFloat(number);
      }
      this.number = number;
    }
    thousandSeparate(){
      return this.number.toLocaleString();
    }
  }
export {JNumber}