/**
 * Credit: https://github.com/jeromeetienne/threex.geometricglow
 */

const THREE = require('three')
import {dilateGeometry} from './dilategeometry';
import {createAtmosphereMaterial} from './atmospherematerial';
import {createPulsingAtmosphereMaterial} from './pulsingatmospherematerial';

export class GeometricGlowMesh {

    constructor(mesh) {
        this.object3d = new THREE.Object3D;

        var geometry = mesh.geometry.clone()
        dilateGeometry(geometry, 3);
        var material = createAtmosphereMaterial();
        material.uniforms.glowColor.value = new THREE.Color('yellow')
        material.uniforms.coeficient.value = 0.01
        material.uniforms.power.value = 3.0
        this.insideMesh = new THREE.Mesh(geometry, material );
        this.object3d.add(this.insideMesh);

        var geometry = mesh.geometry.clone()
        dilateGeometry(geometry, 0.1)
        geometry = new THREE.BufferGeometry().fromGeometry( geometry );
        var material = createPulsingAtmosphereMaterial();
        material.uniforms.glowColor.value = new THREE.Color('yellow')
        material.uniforms.coeficient.value = 0.01
        material.uniforms.power.value = 3.0
        material.uniforms.pulsePercent.value = 0.0;
        material.side = THREE.BackSide
        this.outsideMesh = new THREE.Mesh( geometry, material );
        this.object3d.add(this.outsideMesh);

        this.pulseMagnitudeArray = [];
        this.direction = [];
        for(let i = 0; i<this.outsideMesh.geometry.attributes.position.count; i++) {
            this.direction.push(Math.round(Math.random()));
            this.pulseMagnitudeArray.push(Math.random())
        }
    
        this.pulseMagnitudeBufferAttribute = new THREE.BufferAttribute(new Float32Array(this.pulseMagnitudeArray), 1);
        this.outsideMesh.geometry.addAttribute('pulseMagnitude', this.pulseMagnitudeBufferAttribute);

        this.millisecondsLast = new Date().getTime();
        this.period = 500;
        this.pulseDirection = 1;
    }

    animate() {
        let timeDiff = new Date().getTime()-this.millisecondsLast;
        for(let i = 0; i < this.pulseMagnitudeArray.length; i++) {

            if(this.direction[i] == 1) {
                this.outsideMesh.geometry.attributes.pulseMagnitude.array[i] += Math.random()*timeDiff/this.period;
                if (this.outsideMesh.geometry.attributes.pulseMagnitude.array[i] > 1) {
                    this.outsideMesh.geometry.attributes.pulseMagnitude.array[i] = 1;
                    this.direction[i] = -1;
                }
            } else {
                this.outsideMesh.geometry.attributes.pulseMagnitude.array[i] -= Math.random()*timeDiff/this.period;
                if (this.outsideMesh.geometry.attributes.pulseMagnitude.array[i] < 0) {
                    this.outsideMesh.geometry.attributes.pulseMagnitude.array[i] = 0;
                    this.direction[i] = 1;
                }
            }
        }
       // console.log(this.outsideMesh.geometry.attributes.pulseMagnitude.array)
        this.outsideMesh.geometry.attributes.pulseMagnitude.needsUpdate = true;
        this.outsideMesh.material.uniforms.pulsePercent.value = 2.0;
        this.outsideMesh.material.uniforms.pulsePercent.needsUpdate = true;
        this.millisecondsLast = new Date();
    }
}