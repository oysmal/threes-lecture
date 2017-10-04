import {State} from './utils/state';
import {App} from './app';
import {SolarSystem} from './solarsystem';

let state = new State();

new App(state);
new SolarSystem(state);
