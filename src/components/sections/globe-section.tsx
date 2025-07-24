
'use client';

import React, { useEffect, useRef } from 'react';

declare const THREE: any;

export function GlobeSection() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof THREE === 'undefined') {
        console.error("Three.js not loaded");
        return;
    }

    let scene: any, camera: any, renderer: any, earth: any, controls: any;
    let currentMount = mountRef.current;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, currentMount!.clientWidth / currentMount!.clientHeight, 0.1, 1000);
      camera.position.z = 3;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(currentMount!.clientWidth, currentMount!.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      currentMount!.appendChild(renderer.domElement);

      const light = new THREE.AmbientLight(0xffffff, 2);
      scene.add(light);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      const textureLoader = new THREE.TextureLoader();
      const earthTexture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/earth-day.jpg');

      const geometry = new THREE.SphereGeometry(1, 64, 64);
      const material = new THREE.MeshPhongMaterial({ map: earthTexture });
      earth = new THREE.Mesh(geometry, material);
      scene.add(earth);

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      controls.enablePan = false;
      controls.enableDamping = true;

      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    function onWindowResize() {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    }

    init();
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="globe-section" className="py-20 md:py-28 bg-card/50">
        <div className="container px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Connecting The World</h2>
                <p className="mt-4 text-muted-foreground">
                    Our infrastructure spans the globe, ensuring reliable and high-quality connections no matter where you are.
                </p>
            </div>
            <div ref={mountRef} className="w-full h-[500px] cursor-grab active:cursor-grabbing"></div>
        </div>
    </section>
  );
}
