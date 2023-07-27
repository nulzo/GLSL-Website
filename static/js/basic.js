let container;
let camera, scene, renderer;
let uniforms;

let loader = new THREE.TextureLoader();
let texture, bg;
loader.setCrossOrigin("anonymous");
loader.load(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
    (tex) => {
        texture = tex;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        loader.load(
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/clouds-1-tile.jpg',
            (tex) => {
                bg = tex;
                bg.wrapS = THREE.RepeatWrapping;
                bg.wrapT = THREE.RepeatWrapping;
                bg.minFilter = THREE.LinearFilter;
                init();
                animate();
            }
        );
    }
);

function init() {
    container = document.getElementById('container');

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry(2, 2);

    uniforms = {
        u_time: {type: "f", value: 1.0},
        u_resolution: {type: "v2", value: new THREE.Vector2()},
        u_noise: {type: "t", value: texture},
        u_bg: {type: "t", value: bg},
        u_mouse: {type: "v2", value: new THREE.Vector2()},
        u_scroll: {type: 'f', value: 0}
    };

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });
    material.extensions.derivatives = true;

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    document.addEventListener('pointermove', (e) => {
        let ratio = window.innerHeight / window.innerWidth;
        uniforms.u_mouse.value.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
        uniforms.u_mouse.value.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;

        e.preventDefault();
    });
}

function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate(delta) {
    requestAnimationFrame(animate);
    render(delta);
}

//
// let capturer = new CCapture({
//     verbose: true,
//     framerate: 60,
//     // motionBlurFrames: 4,
//     quality: 90,
//     format: 'webm',
//     workersPath: 'js/'
// });
//
// let capturing = false;
//
// isCapturing = function (val) {
//     if (val === false && window.capturing === true) {
//         capturer.stop();
//         capturer.save();
//     } else if (val === true && window.capturing === false) {
//         capturer.start();
//     }
//     capturing = val;
// }
// toggleCapture = function () {
//     isCapturing(!capturing);
// }

let then = 0;

function render(delta) {

    uniforms.u_time.value = -1000 + delta * 0.0002;
    uniforms.u_scroll.value = window.scrollY;
    renderer.render(scene, camera);

}