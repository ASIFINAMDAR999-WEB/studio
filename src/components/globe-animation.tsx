
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

declare const THREE: any;
declare const ThreeGlobe: any;

export function GlobeAnimation() {
    const globeEl = useRef<HTMLDivElement>(null);
    const [globe, setGlobe] = useState<any>(null);

    const initGlobe = useCallback(() => {
        if (typeof THREE === 'undefined' || typeof ThreeGlobe === 'undefined' || !globeEl.current) {
            return;
        }

        const N = 30;
        const gData = [...Array(N).keys()].map(() => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360,
            size: Math.random() / 3,
            color: ['#673AB7', '#3F51B5', '#FFFFFF'][Math.floor(Math.random() * 3)],
        }));
        
        const newGlobe = new ThreeGlobe({
                waitForGlobeReady: true,
                animateIn: true,
            })
            .hexPolygonsData(gData)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .hexPolygonColor(d => d.color)
            .showAtmosphere(true)
            .atmosphereColor('#3F51B5')
            .atmosphereAltitude(0.25);

        setTimeout(() => {
            const ARCS_DATA = [...Array(10).keys()].map(() => ({
                startLat: (Math.random() - 0.5) * 180,
                startLng: (Math.random() - 0.5) * 360,
                endLat: (Math.random() - 0.5) * 180,
                endLng: (Math.random() - 0.5) * 360,
                color: '#673AB7'
            }));

            newGlobe.arcsData(ARCS_DATA)
                .arcColor('color')
                .arcDashLength(0.4)
                .arcDashGap(2)
                .arcDashInitialGap(() => Math.random() * 5)
                .arcDashAnimateTime(1000)
                .arcAltitude(0.5)
                .arcsTransitionDuration(1000);
        }, 1000);
        
        const globeMaterial = newGlobe.globeMaterial();
        globeMaterial.color = new THREE.Color(0x1a1a2e);
        globeMaterial.emissive = new THREE.Color(0x1a1a2e);
        globeMaterial.emissiveIntensity = 0.1;
        globeMaterial.shininess = 0.7;

        const scene = new THREE.Scene();
        scene.add(newGlobe);
        scene.add(new THREE.AmbientLight(0xbbbbbb));
        scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

        const camera = new THREE.PerspectiveCamera();
        camera.aspect = globeEl.current.offsetWidth / globeEl.current.offsetHeight;
        camera.updateProjectionMatrix();
        camera.position.z = 240;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(globeEl.current.offsetWidth, globeEl.current.offsetHeight);
        globeEl.current.innerHTML = '';
        globeEl.current.appendChild(renderer.domElement);
        
        const tbControls = new (THREE as any).TrackballControls(camera, renderer.domElement);
        tbControls.minDistance = 101;
        tbControls.rotateSpeed = 5;
        tbControls.zoomSpeed = 0.8;

        (function animate() {
            camera.lookAt(newGlobe.position);
            tbControls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        })();

        newGlobe.controls().autoRotate = true;
        newGlobe.controls().autoRotateSpeed = 1.8;

        setGlobe(newGlobe);
    }, []);

    useEffect(() => {
        let attempts = 0;
        const interval = setInterval(() => {
            if (typeof THREE !== 'undefined' && typeof ThreeGlobe !== 'undefined') {
                clearInterval(interval);
                initGlobe();
            } else if (attempts > 20) { 
                clearInterval(interval);
                if (globeEl.current) {
                    globeEl.current.innerText = "Failed to load 3D assets. Please refresh."
                }
            }
            attempts++;
        }, 200);

        return () => {
            clearInterval(interval);
            if (globe) {
                globe.controls().dispose();
            }
        };
    }, [initGlobe, globe]);

    const handleResize = useCallback(() => {
        if (globe && globeEl.current) {
            const { camera, renderer } = globe.scene().children[0];
            const width = globeEl.current.offsetWidth;
            const height = globeEl.current.offsetHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    }, [globe]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
    
    return <div ref={globeEl} style={{ width: '100%', height: '100%' }} />;
}
