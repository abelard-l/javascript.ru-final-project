export class Portfolio {
  constructor({ element, balance }) {
      this._el = element;
      this._portfolioWorth = 0;
      this._balance = balance;

      this._render();
      this._updateBalance();
  }

  addItem(money, value, price) {
    const amount = (value * price).toFixed(2);

    this._portfolioWorth += +amount;
    this._balance -= amount;
    this._updateBalance();

    this._el.querySelector("#purchase").innerHTML += `
    <b>${money}</b> Amount: ${value} Price ${amount} <br />
    `; 
  }


  _updateBalance() {
    this._el.querySelector("#balance").innerHTML = `
        Current balance: ${this._balance}
        <br />
        Portfolio Worth: ${this._portfolioWorth}
    `;
  }

  _render() {
      this._el.innerHTML = `
          <div class="card-panel hoverable center-align">
              <p id="balance"></p>
              <div id="purchase">
              </div>
          </div>
      `
  }
}
