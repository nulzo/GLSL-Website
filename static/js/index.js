import Blob from "./blob.js";
import Gl from "../webgl/index.js";
class App {
    constructor() {
        this.blobs = [];
        this.addBlobs();

        // Main animation tl
        this.tl = gsap.timeline({
            delay: 0.25,
        });

        this.tl
            .add(this.article())
            .add(this.animBlobs(), '-=1.5');
    }

    addBlobs() {
        // size, speed, color, freq, density, strength, offset
        const blob1 = new Blob(1.75, 0.3, 0.5, 1.5, 0.12, Math.PI);

        blob1.position.set(-8.5, 3.25, 2);

        blob1.rotation.set(-0.4, 0, 0.5);

        this.blobs = [blob1];

        Gl.scene.add(...this.blobs);
    }

    article() {
        // Main content
        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.inOut',
            }
        });

        // Content clip
        const content = document.querySelector('.content span');
        const contentClip = {x: 0};

        tl
            .from('.title div, .subtitle div', {
                duration: 2,
                xPercent: -100,
                // stagger: 0.1,
            })
            .from('.menu__inner-translate', {
                duration: 1.5,
                yPercent: -100,
            }, '-=1.5')
            .to(contentClip, {
                duration: 1.5,
                x: 100,
                onUpdate: () => {
                    content.style.setProperty('--clip', `${contentClip.x}%`);
                },
            }, '-=1.25')
            .from('.play', {
                duration: 1,
                scale: 0,
                rotate: '-62deg',
            }, '-=1.5');

        return tl;
    }

    animBlobs() {
        // Move Threejs Blobs
        const tl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: 'power3.inOut'
            },
        });

        const uniformAlphas = [
            this.blobs[0].mesh.material.uniforms.uAlpha,
            this.blobs[1].mesh.material.uniforms.uAlpha,
            this.blobs[2].mesh.material.uniforms.uAlpha,
        ];

        tl
            .from(this.blobs[0].position, {z: -5})
            .from(this.blobs[1].position, {z: -30}, '-=1.75')
            .from(this.blobs[2].position, {z: 12}, '-=1.75')
            .from(uniformAlphas, {
                value: 0,
                stagger: 0.2,
                ease: 'power3.inOut'
            }, 0);

        return tl;
    }
}

new App();