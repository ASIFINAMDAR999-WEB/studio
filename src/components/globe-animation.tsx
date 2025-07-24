
'use client';

import React, { useEffect, useRef } from 'react';

declare const THREE: any;
declare const ThreeGlobe: any;

export const GlobeAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof THREE === 'undefined' || typeof ThreeGlobe === 'undefined' || !containerRef.current) return;

    const Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
      })
      .hexPolygonsData([])
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .arcsData([])
      .arcColor(() => '#9cff00')
      .arcAltitude(() => Math.random() * 0.8 + 0.1)
      .arcStroke(() => 0.5)
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(() => Math.random() * 4000 + 500);

    const globeMaterial = Globe.globeMaterial() as any;
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    const N_ARCS = 20;
    const GData = [...Array(N_ARCS).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
    }));
    Globe.arcsData(GData);

    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.8));

    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 220;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    let domElement: HTMLCanvasElement | null = null;
    if (containerRef.current) {
      domElement = renderer.domElement;
      containerRef.current.appendChild(domElement);
    }

    const controls = new (THREE as any).OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    const onResize = () => {
      if (containerRef.current) {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', onResize);
    
    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      if (domElement && containerRef.current) {
        containerRef.current.removeChild(domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
