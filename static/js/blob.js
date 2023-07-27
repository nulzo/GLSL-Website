export default class Blob extends THREE.Object3D {
    constructor(size, speed, color, density, strength, offset) {
        super();
        let vertexShader =
            `
            varying vec2 vUv;
            varying float vDistort;
            
            uniform float uTime;
            uniform float uHue;
            uniform float uAlpha;
            
            vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
              return a + b * cos(6.28318 * (c * t + d));
            }
            
            void main() {
              float distort = vDistort * 2.0;
            
              vec3 brightness = vec3(0.5, 0.5, 0.5);
              vec3 contrast = vec3(0.5, 0.5, 0.5);
              vec3 oscilation = vec3(1.0, 1.0, 1.0);
              vec3 phase = vec3(0.0, 0.1, 0.2);
            
              vec3 color = cosPalette(uHue + distort, brightness, contrast, oscilation, phase);
            
              gl_FragColor = vec4(color, uAlpha);
            }
            `
        ;
        let fragmentShader =
            `
            varying vec2 vUv;
            varying float vDistort;
            
            uniform float uTime;
            uniform float uHue;
            uniform float uAlpha;
            
            vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
              return a + b * cos(6.28318 * (c * t + d));
            }
            
            void main() {
              float distort = vDistort * 2.0;
            
              vec3 brightness = vec3(0.5, 0.5, 0.5);
              vec3 contrast = vec3(0.5, 0.5, 0.5);
              vec3 oscilation = vec3(1.0, 1.0, 1.0);
              vec3 phase = vec3(0.0, 0.1, 0.2);
            
              vec3 color = cosPalette(uHue + distort, brightness, contrast, oscilation, phase);
            
              gl_FragColor = vec4(color, uAlpha);
            }
            `
        ;
        this.geometry = new THREE.IcosahedronGeometry(size, 64);
        this.material = new THREE.ShaderMaterial({
            vertexShader, fragmentShader, uniforms: {
                uTime: {value: 0},
                uSpeed: {value: speed},
                uNoiseDensity: {value: density},
                uNoiseStrength: {value: strength},
                uFreq: {value: 3},
                uAmp: {value: 6},
                uHue: {value: color},
                uOffset: {value: offset},
                red: {value: 0},
                green: {value: 0},
                blue: {value: 0},
                uAlpha: {value: 1.0},
            }, defines: {
                PI: Math.PI
            }, transparent: true,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.add(this.mesh);
    }
}