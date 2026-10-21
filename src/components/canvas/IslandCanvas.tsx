import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createIsland } from './IslandModel';
import { createPlane, PlaneController } from './PlaneModel';
import { createBird, BirdController } from './BirdModel';
import { createSky, SkyController } from './SkyEnvironment';
import { soundEngine } from '../../utils/audioSynth';

interface IslandCanvasProps {
  currentStage: number | null;
  setCurrentStage: (stage: number | null) => void;
  targetStageAngle: number | null;
  onClearTargetStageAngle: () => void;
}

// Stage angle mapping (radians) for the 4 key landmarks
export const STAGE_ANGLES: Record<number, number> = {
  1: 0.1,            // Stage 1: Welcome & Intro
  2: Math.PI * 0.52, // Stage 2: Experience & Skills
  3: Math.PI * 1.05, // Stage 3: Featured Projects
  4: Math.PI * 1.58, // Stage 4: Contact & Collaboration
};

export const IslandCanvas: React.FC<IslandCanvasProps> = ({
  setCurrentStage,
  targetStageAngle,
  onClearTargetStageAngle,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<THREE.Group | null>(null);
  const planeControllerRef = useRef<PlaneController | null>(null);
  const birdControllerRef = useRef<BirdController | null>(null);
  const skyControllerRef = useRef<SkyController | null>(null);

  // Interaction mutable refs (avoid React re-renders in 60fps tick)
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const rotationSpeedRef = useRef(0);
  const dampingFactor = 0.94;
  const isPointerDownRef = useRef(false);
  const targetAngleRef = useRef<number | null>(null);

  // Sync target stage angle when user clicks a stage button in HUD
  useEffect(() => {
    if (targetStageAngle !== null) {
      targetAngleRef.current = targetStageAngle;
      onClearTargetStageAngle();
    }
  }, [targetStageAngle, onClearTargetStageAngle]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Renderer Configuration
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mount.appendChild(renderer.domElement);

    // 2. Scene, Fog & Camera
    const scene = new THREE.Scene();
    const skyHorizonColor = new THREE.Color(0xbfe6f8);
    scene.background = skyHorizonColor;
    scene.fog = new THREE.Fog(0xbfe6f8, 16, 52);

    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    // Camera positioned at pleasant isometric-like viewing angle
    camera.position.set(0, 3.8, 14.5);
    camera.lookAt(0, 0.4, 0);

    // 3. Studio Environment Map (PMREM)
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // 4. Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xb1e1ff, 0x38404a, 0.85);
    scene.add(hemiLight);

    const sunKeyLight = new THREE.DirectionalLight(0xfffaed, 1.6);
    sunKeyLight.position.set(8, 14, 10);
    sunKeyLight.castShadow = true;
    sunKeyLight.shadow.mapSize.width = 2048;
    sunKeyLight.shadow.mapSize.height = 2048;
    sunKeyLight.shadow.camera.near = 0.5;
    sunKeyLight.shadow.camera.far = 40;
    sunKeyLight.shadow.camera.left = -10;
    sunKeyLight.shadow.camera.right = 10;
    sunKeyLight.shadow.camera.top = 10;
    sunKeyLight.shadow.camera.bottom = -10;
    sunKeyLight.shadow.bias = -0.0004;
    sunKeyLight.shadow.normalBias = 0.02;
    scene.add(sunKeyLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // 5. Build 3D Models
    const island = createIsland();
    island.position.set(0, -0.6, 0);
    island.rotation.y = STAGE_ANGLES[1]; // Start at Stage 1
    scene.add(island);
    islandRef.current = island;

    const plane = createPlane();
    scene.add(plane.group);
    planeControllerRef.current = plane;

    const bird = createBird();
    scene.add(bird.group);
    birdControllerRef.current = bird;

    const sky = createSky();
    scene.add(sky.group);
    skyControllerRef.current = sky;

    // Pre-warm shader programs to prevent initial frame stutter
    renderer.compile(scene, camera);

    // 6. Interaction Event Handlers
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      isPointerDownRef.current = true;
      isDraggingRef.current = true;
      targetAngleRef.current = null; // Interrupt auto-rotation
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      lastMouseXRef.current = clientX;
    };

    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !islandRef.current) return;
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const deltaX = clientX - lastMouseXRef.current;
      lastMouseXRef.current = clientX;

      const sensitivity = 0.006;
      rotationSpeedRef.current = deltaX * sensitivity;
      islandRef.current.rotation.y += rotationSpeedRef.current;

      // Occasional gentle rotation sound
      if (Math.abs(deltaX) > 8) {
        soundEngine.playWhoosh();
      }
    };

    const onPointerUp = () => {
      isPointerDownRef.current = false;
      isDraggingRef.current = false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        targetAngleRef.current = null;
        rotationSpeedRef.current = 0.025;
        soundEngine.playWhoosh();
      } else if (e.key === 'ArrowRight') {
        targetAngleRef.current = null;
        rotationSpeedRef.current = -0.025;
        soundEngine.playWhoosh();
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElem.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    window.addEventListener('keydown', onKeyDown);

    // 7. Calculate Stage from Normalized Angle
    let lastReportedStage: number | null = 1;

    const checkStage = (currentRotY: number) => {
      // Normalize rotation into [0, 2π)
      const twoPi = 2 * Math.PI;
      let normalized = currentRotY % twoPi;
      if (normalized < 0) normalized += twoPi;

      let detectedStage: number | null = null;
      const tolerance = 0.42;

      for (const [stg, targetAngle] of Object.entries(STAGE_ANGLES)) {
        const diff = Math.min(
          Math.abs(normalized - targetAngle),
          Math.abs(normalized - (targetAngle + twoPi)),
          Math.abs(normalized - (targetAngle - twoPi))
        );
        if (diff < tolerance) {
          detectedStage = Number(stg);
          break;
        }
      }

      if (detectedStage !== lastReportedStage) {
        lastReportedStage = detectedStage;
        setCurrentStage(detectedStage);
      }
    };

    // 8. 60 FPS Render Loop
    const clock = new THREE.Clock();
    let animId: number;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const delta = clock.getDelta();

      if (islandRef.current) {
        // Smooth target rotation interpolation (when clicking stage tab)
        if (targetAngleRef.current !== null) {
          const currentRot = islandRef.current.rotation.y;
          const targetRot = targetAngleRef.current;
          
          // Compute shortest path in circle
          const twoPi = Math.PI * 2;
          let diff = (targetRot - currentRot) % twoPi;
          if (diff > Math.PI) diff -= twoPi;
          if (diff < -Math.PI) diff += twoPi;

          islandRef.current.rotation.y += diff * Math.min(delta * 4.5, 1);
          rotationSpeedRef.current = diff * 0.2;

          if (Math.abs(diff) < 0.005) {
            islandRef.current.rotation.y = targetRot;
            targetAngleRef.current = null;
            rotationSpeedRef.current = 0;
          }
        } else if (!isDraggingRef.current) {
          // Inertia damping
          rotationSpeedRef.current *= dampingFactor;
          if (Math.abs(rotationSpeedRef.current) < 0.0001) {
            rotationSpeedRef.current = 0;
          }
          islandRef.current.rotation.y += rotationSpeedRef.current;
        }

        checkStage(islandRef.current.rotation.y);
      }

      // Update Plane, Bird, Sky
      const isActivelyRotating = isDraggingRef.current || Math.abs(rotationSpeedRef.current) > 0.002;
      planeControllerRef.current?.update(delta, isActivelyRotating, rotationSpeedRef.current);
      birdControllerRef.current?.update(delta);
      skyControllerRef.current?.update(delta);

      renderer.render(scene, camera);
    };

    tick();

    // 9. Resize Handling
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);

      domElem.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      domElem.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      islandRef.current = null;
    };
  }, [setCurrentStage]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
    />
  );
};
