
'use client';

import React, { useEffect, useRef, useState } from 'react';

declare const THREE: any;
declare const ThreeGlobe: any;

const GlobeAnimation: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const checkScripts = () => {
      if (typeof THREE !== 'undefined' && typeof ThreeGlobe !== 'undefined') {
        setScriptsLoaded(true);
      } else {
        setTimeout(checkScripts, 100);
      }
    };
    checkScripts();
  }, []);
  
  useEffect(() => {
    if (!scriptsLoaded || !globeRef.current) return;

    let globe: any;
    let renderer: any;
    let camera: any;
    let scene: any;
    let animationFrameId: number;

    const init = () => {
      if (!globeRef.current) return;

      const width = globeRef.current.clientWidth;
      const height = globeRef.current.clientHeight;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      globeRef.current.appendChild(renderer.domElement);
      
      scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xbbbbbb));
      scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 240;

      globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
      })
      .hexPolygonsData([])
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .hexPolygonColor(() => `#${'0123456789abcdef'.split('').map(() => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')}`)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .atmosphereColor('#9cff00')
      .atmosphereAltitude(0.25);


      const arcsData = [...Array(10).keys()].map(() => ({
          startLat: (Math.random() - 0.5) * 180,
          startLng: (Math.random() - 0.5) * 360,
          endLat: (Math.random() - 0.5) * 180,
          endLng: (Math.random() - 0.5) * 360,
          color: '#9cff00'
      }));

      globe.arcsData(arcsData)
          .arcColor('color')
          .arcDashLength(0.4)
          .arcDashGap(0.6)
          .arcDashAnimateTime(2000)
          .arcStroke(0.5);

      const globeMaterial = globe.globeMaterial();
      globeMaterial.color = new THREE.Color(0x3a228a);
      globeMaterial.emissive = new THREE.Color(0x220038);
      globeMaterial.emissiveIntensity = 0.1;
      globeMaterial.shininess = 0.7;

      scene.add(globe);

      const tb = new (THREE as any).TrackballControls(camera, renderer.domElement);
      tb.minDistance = 101;
      tb.rotateSpeed = 5;
      tb.zoomSpeed = 0.8;

      const animate = () => {
        camera.lookAt(scene.position);
        tb.update();
        globe.rotation.y += 0.002;
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        if (globeRef.current) {
          const newWidth = globeRef.current.clientWidth;
          const newHeight = globeRef.current.clientHeight;
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animationFrameId);
        if (globeRef.current && renderer.domElement) {
            globeRef.current.removeChild(renderer.domElement);
        }
      };
    }

    const cleanup = init();

    return () => {
      if (cleanup) cleanup();
    };

  }, [scriptsLoaded]);

  return <div ref={globeRef} id="globe-container" style={{ width: '100%', height: '500px', cursor: 'grab' }} />;
};

export default GlobeAnimation;
