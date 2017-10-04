const THREE = require('three');
import {GeometricGlowMesh} from './Glow/geometricglowmesh';

/**
 * Our solar system. Remember, Separation of Concerns is the most important design pattern!
 */
export class SolarSystem {
    
    constructor(state) {
        this.state = state; // Store the injected state

        // define sun settings
        let sunTextureUrl = 'assets/texture_sun.jpg';
        let radius = 5;
        let widthSegments = 64;
        let heightSegments = 64;

        // Create a soft atmospheric white light so that we can barely see the dark side of the earth.
        let amb = new THREE.AmbientLight(0xFFFFFF, 0.05);
        this.state.scene.add(amb); // Add the light to the scene.

        // Create the sun
        let sunTex = new THREE.TextureLoader().load(sunTextureUrl);
        let sunGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        

        // Create our sun's material, making it a Phong material so it supports light.
        let sunMaterial = new THREE.MeshBasicMaterial({ map: sunTex });
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.name = 'sun';

        // Add sun to the scene
        this.state.scene.add(this.sun);

        this.glowMesh = new GeometricGlowMesh(this.sun)
        this.sun.add(this.glowMesh.object3d)
        this.glowMesh.insideMesh.material.uniforms.glowColor.value.set(0xFFFF44);
        this.glowMesh.outsideMesh.material.uniforms.glowColor.value.set(0xFFFF44);
        this.state.animate_objects.push(this.glowMesh);

        // create a point light and set it as a child of the sun (so the sun shines), use 5 as intensity (play around and see what this does for yourselves)
        this.sunlight = new THREE.PointLight(0xFFFFFF, 3);
        this.sun.add(this.sunlight);

        // Create an orbit node for the earth around the sun (Same concept as the WebGLScenegraph)
        this.earthOrbitAroundSun = new THREE.Object3D();
        this.sun.add(this.earthOrbitAroundSun);

        // after the sun has been added, add the earth to it's orbit
        radius = 2.5;   // change to very unrealistic, but at least smaller, radius
        let earthTextureUrl = 'assets/texture_earth.jpg';

        // Create and add earth
        let earthTex = new THREE.TextureLoader().load(earthTextureUrl);
        let earthGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

        // Create our sun's material, making it a Phong material so it supports light.
        let earthMaterial = new THREE.MeshPhongMaterial({ map: earthTex, shininess:0.5 });
        this.earth = new THREE.Mesh(earthGeometry, earthMaterial);
        this.earth.name = 'earth';

        // Translate earth out from the sun
        this.earth.position.x = 15;
        this.earthOrbitAroundSun.add(this.earth);

        this.state.animate_objects.push(this);
    }

    // Lets do all the updating of our objects in this method, so we can just call this from the render method in app.js!
    animate() {
        this.rotateObject(this.sun, [0.0, 0.005, 0.0]);
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