import { render, h, Component } from 'preact';
import { Clock } from './clock';
import { ClockTimer } from './clock-timer';
import { EnhancedTitle } from './high-order';

render(
  <div>
    <h1>Monolith clock</h1>
    <Clock time={new Date()} />
    <h1>Composite clock</h1>
    <ClockTimer time={new Date()} />
    <h1>Enhanced component</h1>
    <EnhancedTitle/>
  </div>, document.body);
