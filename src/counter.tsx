import { Component, h } from "/web_modules/preact.js";
import { Subject, Subscription } from "/web_modules/rxjs.js";
import { scan } from "/web_modules/rxjs/operators.js";

interface CounterState {
  counter: number;
}

export class Counter extends Component<{}, CounterState> {
  // onButtonClick is a sink that expects a '1' every time the button is
  // clicked.
  onButtonClick: Subject<number>;

  subscription: Subscription;

  constructor(props: {}) {
    super(props);
    this.state = {
      counter: 0
    };
    this.onButtonClick = new Subject();
    this.subscription = Subscription.EMPTY;
  }

  componentDidMount() {
    this.subscription = this.onButtonClick
      .pipe(scan((acc, val) => acc + val))
      .subscribe(val => this.setState({ counter: val }));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  click() {
    this.onButtonClick.next(1);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.click()}>{this.state.counter}</button>
      </div>
    );
  }
}
