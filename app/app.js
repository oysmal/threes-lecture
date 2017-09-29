const THREE = require('three');
import {State} from './utils/state';
import {SolarSystem} from './solarsystem';

// entry point to our application
export class App {
    
    constructor() {
        this.state = State.getInstance(); // get the state
        this.solarSystem = new SolarSystem(this.state); // Get the solar system and inject the state

        // Create atmospheric white light
        let amb = new THREE.AmbientLight(0xFFFFFF);
        this.state.scene.add(amb);

        // Add camera to scene
        this.state.scene.add(this.state.camera);
        this.state.camera.position.z = 50;  // move alittle

        // Clear window to black and set size
        this.state.renderer.setClearColor(0x000000);
        this.state.renderer.setSize(this.state.width, this.state.height);

        this.render();  // start rendering
    }

    // Render the scene
    render() {
        this.solarSystem.animate(); // call our solarSystem's animation method

        // Perform the render of the scene from our camera's point of view
        this.state.renderer.render(this.state.scene, this.state.camera);

        // this line loops the render call, remember to bind our context so we can access our stuff!
        window.requestAnimFrame(this.render.bind(this));
    }
}


// shim layer with setTimeout fallback (ignore this)
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
    