export class TradeWidget {
  constructor({ element, onConfirm }) {
      this._el = element;
      this._onConfirmCallback = onConfirm;

      this._el.addEventListener('input', e => {
        if (!e.target.closest('#amount')) return;

        const value = +e.target.value;
        this._updateDisplay(value);
      })

      this._el.addEventListener('click', e => {
         if (!e.target.closest('[data-button="buy"]')) return;

        this._onConfirm();
      })

      this._el.addEventListener('click', e => {
         if (!e.target.closest('[data-button="cancel"]')) return;

        this.close();
      })
  }

  trade(item) {
    this._currentItem = item;
    this._total = 0;

    this._render(item);
  }

  close() {
    this._el.querySelector('.modal').classList.remove('open')
  }

  _updateDisplay(value) {
    this._totalEl = this._totalEl || this._el.querySelector('#item-total')
    this._totalEl.textContent = this._currentItem.price * value;
  }

  _onConfirm() {
    const value = this._el.querySelector("#amount").value;
    this._onConfirmCallback(value);
    this.close();
  }

  _render(item) {
      this._el.innerHTML = `  
      <div id="modal" class="modal open">
        <div class="modal-content">
          <h4>Buying ${item.name}:</h4>
          <p>
            Current price: ${item.price}. 
            Total: <span id="item-total">${this._total}</span>
          </p>

          <div class="row">
            <form class="col s12">
                <div class="input-field col s4">
                    <input id="amount" type="text">
                    <label for="amount">Amount</label>
                </div>
            </form>
          </div>

          <div class="modal-footer">
            <a href="#!" data-button="buy" class="modal-close waves-effect waves-teal btn-flat">Buy</a>
            <a href="#!" data-button="cancel" class="modal-close waves-effect waves-teal btn-flat">Cancel</a>
          </div>
      </div>
      </div>
      `
  }
}
