import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TestAnimationProps {
  testType: 'dry' | 'wet' | 'spectroscopic';
}

const TestAnimation: React.FC<TestAnimationProps> = ({ testType }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create test-specific elements
    let testElements: THREE.Object3D[] = [];
    switch (testType) {
      case 'dry':
        testElements = createDryTestElements();
        break;
      case 'wet':
        testElements = createWetTestElements();
        break;
      case 'spectroscopic':
        testElements = createSpectroscopicTestElements();
        break;
    }
    testElements.forEach(element => scene.add(element));

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Add test-specific animations here
      switch (testType) {
        case 'dry':
          animateDryTest(testElements);
          break;
        case 'wet':
          animateWetTest(testElements);
          break;
        case 'spectroscopic':
          animateSpectroscopicTest(testElements);
          break;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [testType]);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
};

function createDryTestElements(): THREE.Object3D[] {
  const group = new THREE.Group();

  const sieve = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 0.1, 32),
    new THREE.MeshBasicMaterial({ color: 0x888888 })
  );
  group.add(sieve);

  const particles = new THREE.Group();
  for (let i = 0; i < 50; i++) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x8B4513 })
    );
    particle.position.set(
      Math.random() * 2 - 1,
      Math.random() * 2 + 1,
      Math.random() * 2 - 1
    );
    particles.add(particle);
  }
  group.add(particles);

  return [group];
}

function animateDryTest(elements: THREE.Object3D[]) {
  const [group] = elements;
  const particles = group.children[1].children;
  particles.forEach((particle: THREE.Object3D) => {
    if (particle.position.y > -1) {
      particle.position.y -= 0.05;
    } else {
      particle.position.y = 2;
    }
  });
}

function createWetTestElements(): THREE.Object3D[] {
  const group = new THREE.Group();

  const beaker = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 2, 32),
    new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.5 })
  );
  group.add(beaker);

  const water = new THREE.Mesh(
    new THREE.CylinderGeometry(0.75, 0.75, 1.5, 32),
    new THREE.MeshBasicMaterial({ color: 0x4444ff, transparent: true, opacity: 0.5 })
  );
  water.position.y = -0.25;
  group.add(water);

  return [group];
}

function animateWetTest(elements: THREE.Object3D[]) {
  const [group] = elements;
  const water = group.children[1];
  water.scale.y = 1 + Math.sin(Date.now() * 0.005) * 0.05;
}

function createSpectroscopicTestElements(): THREE.Object3D[] {
  const group = new THREE.Group();

  const sample = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.1, 1),
    new THREE.MeshBasicMaterial({ color: 0x8B4513 })
  );
  group.add(sample);

  const laser = new THREE.Group();
  const laserBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 2, 8),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  laserBeam.rotation.z = Math.PI / 2;
  laser.add(laserBeam);

  const laserSource = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x333333 })
  );
  laserSource.position.x = -1;
  laser.add(laserSource);

  laser.position.y = 0.5;
  group.add(laser);

  return [group];
}

function animateSpectroscopicTest(elements: THREE.Object3D[]) {
  const [group] = elements;
  const laser = group.children[1];
  laser.rotation.y += 0.02;
}

export default TestAnimation;