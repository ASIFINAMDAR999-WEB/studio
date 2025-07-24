
'use client';

import React, { useEffect, useRef } from 'react';

declare const THREE: any;
declare const ThreeGlobe: any;

export function GlobeAnimation() {
  const globeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof THREE === 'undefined' || typeof ThreeGlobe === 'undefined') {
      console.error('Three.js or ThreeGlobe is not loaded');
      return;
    }

    const Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
      })
      .hexPolygonsData(Array.from({ length: 1000 }, () => ({})))
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.62)
      .hexPolygonColor(() => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)
      .arcsData(Array.from({ length: 10 }, () => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
      })))
      .arcColor(() => '#9cff00')
      .arcDashLength(0.9)
      .arcDashGap(0.2)
      .arcDashAnimateTime(1000)
      .arcsTransitionDuration(1000)
      .arcStroke(0.5);

    Globe.rotateY(-Math.PI * (5 / 9));
    Globe.rotateZ(-Math.PI / 6);

    const globeMaterial = Globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (globeContainerRef.current) {
      globeContainerRef.current.innerHTML = '';
      globeContainerRef.current.appendChild(renderer.domElement);
    }

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 220;

    // Add camera controls
    const tb = new (THREE as any).TrackballControls(camera, renderer.domElement);
    tb.minDistance = 101;
    tb.rotateSpeed = 5;
    tb.zoomSpeed = 0.8;
    
    // Animation loop
    const animate = () => {
      camera.lookAt(Globe.position);
      Globe.rotation.y += 0.002;
      tb.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const onResize = () => {
        if(globeContainerRef.current) {
            camera.aspect = globeContainerRef.current.offsetWidth / globeContainerRef.current.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(globeContainerRef.current.offsetWidth, globeContainerRef.current.offsetHeight);
        }
    };

    const currentRef = globeContainerRef.current;
    
    window.addEventListener('resize', onResize, false);
    
    // Initial size setup
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
       if (currentRef) {
        currentRef.innerHTML = '';
      }
    };
  }, []);

  return <div ref={globeContainerRef} id="globe-container" className="absolute top-0 left-0 w-full h-full z-0" />;
}
