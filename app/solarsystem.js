const THREE = require('three');

/**
 * Our solar system. Remember, Separation of Concerns is the most important design pattern!
 */
export class SolarSystem {
    
    constructor(state) {
        this.state = state; // Store the injected state

        // define sun settings
        let sunTextureUrl = 'assets/texture_sun.jpg';
        let radius = 5;
        let widthSegments = 16;
        let heightSegments = 16;

        // Create the sun
        this.sun = this.createTexturedPhongPlanet(radius, widthSegments, heightSegments, sunTextureUrl);
        this.sun.name = 'sun';

        // Add sun to the scene
        this.state.scene.add(this.sun);

        // create a point light and set it as a child of the sun (so the sun shines), use 5 as intensity (play around and see what this does for yourselves)
        this.sunlight = new THREE.PointLight(0xFFFFFF, 5);
        this.sun.add(this.sunlight);

        // Create an orbit node for the earth around the sun (Same concept as the WebGLScenegraph)
        this.earthOrbitAroundSun = new THREE.Object3D();
        this.sun.add(this.earthOrbitAroundSun);

        // after the sun has been added, add the earth to it's orbit
        radius = 2.5;   // change to very unrealistic, but at least smaller, radius
        let earthTextureUrl = 'assets/texture_earth.jpg';

        // Create and add earth
        this.earth = this.createTexturedPhongPlanet(radius, widthSegments, heightSegments, earthTextureUrl);
        this.earth.name = 'earth';

        // Translate earth out from the sun
        this.earth.position.x = 15;
        this.earthOrbitAroundSun.add(this.earth);
    }

    createTexturedPhongPlanet(radius, widthSegments, heightSegments, textureUrl) {

        let tex = new THREE.TextureLoader().load(textureUrl);
        let planetGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

        // Create our sun's material, making it a Phong material so it supports light.
        let planetMaterial = new THREE.MeshPhongMaterial({ map: tex });
        let planet = new THREE.Mesh(planetGeometry, planetMaterial);

        return planet;
    }

    // Lets do all the updating of our objects in this method, so we can just call this from the render method in app.js!
    animate() {
        this.rotateObject(this.sun, [0.0, 0.01, 0.0]);
        this.rotateObject(this.earthOrbitAroundSun, [0.0, 0.01, 0.0]);
        this.rotateObject(this.earth, [0.0, 0.02, 0.0]);
    }

    // Helper function
    rotateObject(object, rotation) {
        object.rotation.x += rotation[0];
        object.rotation.y += rotation[1];
        object.rotation.z += rotation[2];
    }
}