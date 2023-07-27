var container;
var camera, scene;
var renderer;
var wfobject;

init();
animate();

function init() {
    container = document.getElementById( 'wrapper' );
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x263238, 2000, 10000 );
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( scene.fog.color );
    container.appendChild( renderer.domElement );
    var geometry = new THREE.TorusKnotGeometry( 10, 3.6, 183, 20, 4, 14);
    var material = new THREE.MeshBasicMaterial( {   color: 0xeceff1,
                                                    wireframe: true,
                                                    transparent: true,
                                                    opacity: 0.1  } );
    wfobject = new THREE.Mesh( geometry, material );
    scene.add( wfobject );
    camera.position.z = 5;
    window.addEventListener( 'resize', onWindowResize, false );
}

function animate () {
    requestAnimationFrame( animate );
    render();
}

function render () {
    var r = (20 * Math.sin(Date.now()*0.0001))+20;
    camera.position.z = r;
    wfobject.rotation.x += 0.005;
    wfobject.rotation.y += 0.005;
    //wfobject.rotation.z += 0.005;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


animate();