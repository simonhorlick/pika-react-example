import * as React from "/web_modules/react.js";
import { CounterBloc } from "./counter_bloc.js"
import { StreamBuilder } from "./stream_builder.js";

export class Counter extends React.Component<{}, {}> {

  // bloc handles the business logic for Counter.
  bloc: CounterBloc;

  constructor(props: {}) {
    super(props);
    this.bloc = new CounterBloc();
  }

  click() {
    this.bloc.onButtonClick.next(1);
  }

  render() {
    return (
      <StreamBuilder
        stream={this.bloc.counter}
        builder={snapshot => (
          <button onClick={() => this.click()}>{snapshot.data}</button>
        )}
      />
    );
  }
}
