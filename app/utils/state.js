let instance = null;
const THREE = require('three');

export class State {
    constructor() {

        // Singleton setup
        if (instance) {
            console.log("Bonjour hi!");
            return instance;
        } else {
            instance = this;
        }

        // Set our "global" variables
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.fov = 45;
        this.near = 0.1;
        this.far = 1000;
        this.canvas = document.body;

        this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.scene = new THREE.Scene();

        // Create renderer, set antialias to true if possible
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        return instance;
    }

    // Use this to get a reference to State object (can also just use new, same stuff, but this is alike to Java)
    static getInstance() {
        if (instance) {
            return instance;
        } else {
            return new State();
        }
    }
};