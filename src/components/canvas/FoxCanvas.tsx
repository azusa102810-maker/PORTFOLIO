import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createFox, FoxAnimationState, FoxController } from './FoxModel';

interface FoxCanvasProps {
  formState: FoxAnimationState;
}

export const FoxCanvas: React.FC<FoxCanvasProps> = ({ formState }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<FoxController | null>(null);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setState(formState);
    }
  }, [formState]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mount.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(2.8, 2.2, 4.2);
    camera.lookAt(0, 1.0, 0);

    // Environment Lighting
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // Studio Lights
    const hemiLight = new THREE.HemisphereLight(0xfff7ed, 0x94a3b8, 0.7);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 1.4);
    keyLight.position.set(4, 5, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    // Fox Model
    const fox = createFox();
    fox.group.rotation.y = -0.65;
    scene.add(fox.group);
    controllerRef.current = fox;
    fox.setState(formState);

    // Clock & Render Loop
    const clock = new THREE.Clock();
    let animId: number;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const delta = clock.getDelta();
      fox.update(delta);
      renderer.render(scene, camera);
    };

    tick();

    // Resize Observer
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
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controllerRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] md:h-[500px] flex items-center justify-center">
      {/* 3D Canvas Mount Ref */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Interactive Status Indicator Badge */}
      <div className="absolute top-4 right-4 bg-white/90 border border-slate-200 shadow-sm px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 flex items-center gap-2 pointer-events-none backdrop-blur-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>
          {formState === 'idle' && '灵狐正在小憩 · Idle'}
          {formState === 'focused' && '灵狐正在认真倾听 · Listening'}
          {formState === 'typing' && '灵狐看着你输入... · Typing'}
          {formState === 'submitting' && '灵狐正在送信中... · Sending'}
          {formState === 'success' && '灵狐已成功送达你的留言！ · Success'}
        </span>
      </div>
    </div>
  );
};
