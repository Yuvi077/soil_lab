// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const SoilSeparationAnimation: React.FC = () => {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });

//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create a container
//     const container = new THREE.Mesh(
//       new THREE.CylinderGeometry(2, 2, 4, 32),
//       new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.5 })
//     );
//     scene.add(container);

//     // Create soil particles
//     const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
//     const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });

//     const particles: THREE.Mesh[] = [];
//     for (let i = 0; i < 200; i++) {
//       const particle = new THREE.Mesh(particleGeometry, particleMaterial);
//       particle.position.set(
//         Math.random() * 4 - 2,
//         Math.random() * 4 + 2,
//         Math.random() * 4 - 2
//       );
//       scene.add(particle);
//       particles.push(particle);
//     }

//     camera.position.z = 10;

//     const animate = () => {
//       requestAnimationFrame(animate);

//       particles.forEach(particle => {
//         if (particle.position.y > -2) {
//           particle.position.y -= 0.05;
//         } else {
//           particle.position.y = 4;
//         }
//       });

//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       if (mountRef.current) {
//         camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       mountRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} className="w-full h-full" />;
// };

// export default SoilSeparationAnimation;