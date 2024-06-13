const TipCalculator = () => {
  // USE STATES
  const [bill, setBill] = React.useState();
  const [people, setPeople] = React.useState();
  const [tip, setTip] = React.useState();
  const [focus, setFocus] = React.useState(-1);
  const [err, setErr] = React.useState([false]);

  // GLOBAL VARIABLES
  const amount =
    ((bill * (tip / 100)) / people - 0.1).toFixed(2) == "NaN" ||
    ((bill * (tip / 100)) / people - 0.1).toFixed(2) == "Infinity"
      ? "0.00"
      : ((bill * (tip / 100)) / people - 0.01).toFixed(2);
  const total =
    (
      (parseFloat(bill) + parseFloat(bill) * (parseFloat(tip) / 100)) /
      parseInt(people)
    ).toFixed(2) == "NaN"
      ? "0.00"
      : (
          (parseFloat(bill) + parseFloat(bill) * (parseFloat(tip) / 100)) /
          parseInt(people)
        ).toFixed(2);
  const [elemId, setElemId] = React.useState(0);

  const percents = [5, 10, 15, 25, 50];
  const ipg = document.getElementsByClassName("input-group");
  const fc = document.getElementsByClassName("form-control");
  const msg = document.getElementsByClassName("msg");

  // EVENT LISTENER
  document.addEventListener("wheel", function () {
    if (document.activeElement.type === "number") {
      document.activeElement.blur();
    }
  });

  // EVENT HANDLERS
  const handleChange = (val, id, type) => {
    if (!val.target.value || parseInt(val.target.value) <= 0) {
      msg[id].classList.add("err-txt");
      setErr([true, id]);
      if (type === "bill") {
        setBill();
      }
      if (type === "tip") {
        setTip();
      }
      if (type === "people") {
        setPeople();
      }
    } else {
      msg[id].classList.remove("err-txt");
      setErr([false, id]);
      if (type === "bill") {
        setBill(val.target.value);
      }
      if (type === "tip") {
        setTip(val.target.value);
        document
          .getElementsByClassName("percent-btn")
          [elemId].classList.remove("active");
      }
      if (type === "people") {
        setPeople(val.target.value);
      }
    }
  };

  const handleClick = (val, id) => {
    const active = document.getElementsByClassName("percent-btn");
    fc[1].value = "";
    ipg[1].classList.remove("err");
    ipg[1].classList.remove("focus");
    msg[1].classList.remove("err-txt");
    for (let i = 0; i < active.length; i++) {
      if (i !== id) {
        active[i].classList.remove("active");
      } else {
        active[i].classList.add("active");
      }
    }
    setElemId(id);
    setTip(val.target.value);
  };

  const reset = () => {
    if (
      document.getElementsByClassName("reset")[0].classList.contains("active")
    ) {
      setBill();
      setTip();
      setPeople();
      setElemId(0);
      document
        .getElementsByClassName("percent-btn")
        [elemId].classList.remove("active");
      for (let i = 0; i < fc.length; i++) {
        fc[i].value = "";
      }
    }
  };

  // RETURNED HTML
  return (
    <div className="holder">
      <img src="./images/logo.svg" alt="Logo" className="logo" />
      <div className="inner">
        <div className="calculator">
          <p className="input-txt">
            <span>Bill</span> <span className="msg">Can't Be Zero</span>
          </p>
          <div
            className={`input-group mb-3 ${
              focus == 0 && err[1] !== 0
                ? "focus"
                : focus == 0 && err[1] == 0 && err[0]
                ? "err"
                : ""
            }`}
            onFocus={() => setFocus(0)}
          >
            <span className="input-group-text" id="basic-addon1">
              <img src="./images/icon-dollar.svg" />
            </span>
            <input
              type="number"
              className="form-control bord"
              aria-describedby="basic-addon1"
              placeholder="0"
              onChange={(prop) => handleChange(prop, 0, "bill")}
            />
          </div>
          <p className="input-txt mar">
            {" "}
            <span>Select Tip %</span>
            <span className="msg">Can't Be Zero</span>
          </p>
          <div className="input-grid">
            {percents.map((e, k) => (
              <button
                type="button"
                key={k}
                className="percent-btn btn"
                value={e}
                onClick={(prop) => handleClick(prop, k)}
              >
                {e}%
              </button>
            ))}
            <div
              className={`input-group mb-3 ${
                focus == 1 && err[1] !== 1
                  ? "focus"
                  : focus == 1 && err[1] == 1 && err[0]
                  ? "err"
                  : ""
              }`}
              onFocus={() => setFocus(1)}
            >
              <input
                type="number"
                className="form-control mid"
                aria-describedby="basic-addon1"
                onChange={(prop) => handleChange(prop, 1, "tip")}
                placeholder="Custom"
              />
            </div>
          </div>
          <p className="input-txt mar">
            {" "}
            <span>Number of People</span>
            <span className="msg">Can't Be Zero</span>
          </p>
          <div
            className={`input-group mb-3 ${
              focus == 2 && err[1] !== 2
                ? "focus"
                : focus == 2 && err[1] == 2 && err[0]
                ? "err"
                : ""
            }`}
            onFocus={() => setFocus(2)}
          >
            <span className="input-group-text" id="basic-addon1">
              <img src="./images/icon-person.svg" />
            </span>
            <input
              type="number"
              className="form-control bord"
              aria-describedby="basic-addon1"
              placeholder="0"
              onChange={(prop) => handleChange(prop, 2, "people")}
            />
          </div>
        </div>
        <div className="display">
          <div className="flex-items">
            <div className="dis-head">
              <p className="head">Tip Amount</p>
              <p className="sub-t">/ person</p>
            </div>
            <p className="amt">${amount}</p>
          </div>
          <div className="flex-items">
            <div className="dis-head">
              <p className="head">Total</p>
              <p className="sub-t">/ person</p>
            </div>
            <p className="amt">${total}</p>
          </div>
          <button
            type="button"
            className={`btn reset ${
              bill > 0 && tip > 0 && people > 0 ? "active" : ""
            }`}
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// RENDER METHOD
ReactDOM.render(<TipCalculator />, document.getElementById("root"));
