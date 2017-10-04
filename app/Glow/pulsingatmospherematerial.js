/**
 * Credit: https://github.com/jeromeetienne/threex.geometricglow
 */

const THREE = require('three')

/**
 * from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
 * @return {[type]} [description]
 */
export const createPulsingAtmosphereMaterial = () => {
	var vertexShader	= [
		'varying vec3	vVertexWorldPosition;',
		'varying vec3	vVertexNormal;',

		'varying vec4	vFragColor;',
        'uniform float  pulsePercent;',
        'attribute float pulseMagnitude;',
        'varying float pulseMag;',

		'void main(){',
		'	vVertexNormal	= normalize(normalMatrix * normal);',
		'	vec3 vPos = position + normal*pulseMagnitude*pulsePercent;',
		'	vVertexWorldPosition	= (modelMatrix * vec4(vPos, 1.0)).xyz;',
        '   pulseMag = pulseMagnitude;',
		'	// set gl_Position',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4(vPos, 1.0);',
		'}',

		].join('\n')
	var fragmentShader	= [
		'uniform vec3	glowColor;',
		'uniform float	coeficient;',
		'uniform float	power;',

		'varying vec3	vVertexNormal;',
		'varying vec3	vVertexWorldPosition;',

		'varying vec4	vFragColor;',
        'varying float pulseMag;',

		'void main(){',
		'	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
		'	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
		'	viewCameraToVertex	= normalize(viewCameraToVertex);',
		'	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power)*(1.0-pulseMag);',
		'	gl_FragColor		= vec4(glowColor, intensity);',
		'}',
	].join('\n')

	// create custom material from the shader code above
	//   that is within specially labeled script tags
	var material	= new THREE.ShaderMaterial({
		uniforms: { 
			coeficient	: {
				type	: "f", 
				value	: 1.0
			},
			power		: {
				type	: "f",
				value	: 2
			},
			glowColor	: {
				type	: "c",
				value	: new THREE.Color('yellow')
			},
			pulsePercent	: {
				type	: "f",
				value	: 0.0
			},
		},
		vertexShader	: vertexShader,
		fragmentShader	: fragmentShader,
		//blending	: THREE.AdditiveBlending,
		transparent	: true,
		depthWrite	: false,
	});
	return material
}