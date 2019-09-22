import { BehaviorSubject, Observable } from "/web_modules/rxjs.js";
import { scan } from "/web_modules/rxjs/operators.js";

// CounterBloc handles the business logic for the Counter component. It starts
// a counter at zero and increments it each time a click event is added to
// onButtonClick.
export class CounterBloc {
    // onButtonClick is a sink that expects a '1' every time the button is
    // clicked.
    onButtonClick = new BehaviorSubject<number>(0);

    // counter is a stream that emits the current value of the counter.
    counter: Observable<number>;

    constructor() {
        this.counter = this.handleButtonClicks();
    }

    // handleButtonClicks returns a stream that emits how many times the
    // button has been clicked.
    handleButtonClicks() {
        return this.onButtonClick
            .pipe(scan((acc, val) => acc + val))
    }
}