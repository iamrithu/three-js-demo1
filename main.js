import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')

})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30)
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const tours = new THREE.Mesh(geometry, material);

scene.add(tours);


const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const gridHElper = new THREE.GridHelper(200, 50);
scene.add(gridHElper);
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper, gridHElper);



const controls = new OrbitControls(camera, renderer.domElement);


function star() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);

}

Array(200).fill().forEach(star);


const spaceTexture = new THREE.TextureLoader().load('./assets/forest.svg');
scene.background = spaceTexture



const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./assets/normal.jpg');

const moon = new THREE.Mesh(

    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
);
moon.position.set(1, 1, 1)
scene.add(moon)

function animate() {


    requestAnimationFrame(animate);

    tours.rotation.x += 0.01;
    tours.rotation.y += 0.005;
    tours.rotation.z += 0.01;

    controls.update();



    renderer.render(scene, camera);
}

animate();


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    moon.rotation.x += 0.05;
    // moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    // moon.position.x += 0.05;
    moon.position.y += 0.075;
    moon.position.z += 0.05;
}
document.body.onscroll = moveCamera;