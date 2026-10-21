import * as THREE from 'three';

export type FoxAnimationState = 'idle' | 'focused' | 'typing' | 'submitting' | 'success';

export interface FoxController {
  group: THREE.Group;
  setState: (state: FoxAnimationState) => void;
  update: (delta: number) => void;
}

/**
 * Procedural Articulated 3D Fox Model
 * Replicates the interactive 3D character on Adrian Hajdin's contact page.
 * Reacts dynamically to user typing, focusing inputs, and submitting.
 */
export function createFox(): FoxController {
  const foxGroup = new THREE.Group();
  foxGroup.name = "CompanionFox";

  // Materials
  const orangeCoat = new THREE.MeshStandardMaterial({
    color: 0xee5a24, // Vivid fox orange
    roughness: 0.7,
    metalness: 0.05,
    flatShading: true,
  });

  const whiteCoat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0.05,
    flatShading: true,
  });

  const blackNose = new THREE.MeshStandardMaterial({
    color: 0x1e272e,
    roughness: 0.3,
    metalness: 0.2,
  });

  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.1,
    metalness: 0.8,
  });

  const earInner = new THREE.MeshStandardMaterial({
    color: 0xfed330,
    roughness: 0.9,
    metalness: 0.0,
    flatShading: true,
  });

  // 1. Torso / Body (slightly sloped sitting pose)
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 1.1, 1.3),
    orangeCoat
  );
  body.position.set(0, 0.95, 0);
  body.rotation.x = -0.15;
  body.castShadow = true;
  body.receiveShadow = true;
  foxGroup.add(body);

  // White chest bib
  const chestBib = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.85, 0.25),
    whiteCoat
  );
  chestBib.position.set(0, 1.05, 0.6);
  chestBib.rotation.x = -0.15;
  foxGroup.add(chestBib);

  // 2. Head Pivot & Cranium
  const headPivot = new THREE.Group();
  headPivot.position.set(0, 1.5, 0.45);

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.75, 0.85),
    orangeCoat
  );
  head.position.set(0, 0.25, 0);
  head.castShadow = true;
  headPivot.add(head);

  // White cheeks / muzzle base
  const cheekL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 0.4), whiteCoat);
  cheekL.position.set(-0.35, 0.15, 0.25);
  headPivot.add(cheekL);

  const cheekR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 0.4), whiteCoat);
  cheekR.position.set(0.35, 0.15, 0.25);
  headPivot.add(cheekR);

  // Snout
  const snout = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.55, 4),
    whiteCoat
  );
  snout.rotation.x = Math.PI / 2;
  snout.rotation.y = Math.PI / 4;
  snout.position.set(0, 0.2, 0.6);
  headPivot.add(snout);

  // Black Nose Button
  const nose = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 8, 8),
    blackNose
  );
  nose.position.set(0, 0.25, 0.88);
  headPivot.add(nose);

  // Eyes
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), eyeMaterial);
  eyeL.position.set(-0.25, 0.34, 0.42);
  headPivot.add(eyeL);

  const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), eyeMaterial);
  eyeR.position.set(0.25, 0.34, 0.42);
  headPivot.add(eyeR);

  // Left & Right Pointed Ears
  const earL = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.55, 4), orangeCoat);
  earL.position.set(-0.32, 0.8, 0.0);
  earL.rotation.z = 0.25;
  earL.rotation.y = Math.PI / 4;
  earL.castShadow = true;
  headPivot.add(earL);

  const earLInner = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.42, 4), earInner);
  earLInner.position.set(-0.31, 0.77, 0.05);
  earLInner.rotation.z = 0.25;
  earLInner.rotation.y = Math.PI / 4;
  headPivot.add(earLInner);

  const earR = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.55, 4), orangeCoat);
  earR.position.set(0.32, 0.8, 0.0);
  earR.rotation.z = -0.25;
  earR.rotation.y = Math.PI / 4;
  earR.castShadow = true;
  headPivot.add(earR);

  const earRInner = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.42, 4), earInner);
  earRInner.position.set(0.31, 0.77, 0.05);
  earRInner.rotation.z = -0.25;
  earRInner.rotation.y = Math.PI / 4;
  headPivot.add(earRInner);

  foxGroup.add(headPivot);

  // 3. Four Legs & Paws
  // Front Left
  const legFL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.8, 6), orangeCoat);
  legFL.position.set(-0.32, 0.4, 0.5);
  legFL.castShadow = true;
  foxGroup.add(legFL);

  const pawFL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.22), blackNose);
  pawFL.position.set(-0.32, 0.06, 0.54);
  foxGroup.add(pawFL);

  // Front Right
  const legFR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.8, 6), orangeCoat);
  legFR.position.set(0.32, 0.4, 0.5);
  legFR.castShadow = true;
  foxGroup.add(legFR);

  const pawFR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.22), blackNose);
  pawFR.position.set(0.32, 0.06, 0.54);
  foxGroup.add(pawFR);

  // Hind Left (Sitting tuck)
  const legBL = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), orangeCoat);
  legBL.scale.set(0.8, 1.2, 1.4);
  legBL.position.set(-0.46, 0.4, -0.25);
  foxGroup.add(legBL);

  const pawBL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.26), blackNose);
  pawBL.position.set(-0.42, 0.05, 0.0);
  foxGroup.add(pawBL);

  // Hind Right (Sitting tuck)
  const legBR = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), orangeCoat);
  legBR.scale.set(0.8, 1.2, 1.4);
  legBR.position.set(0.46, 0.4, -0.25);
  foxGroup.add(legBR);

  const pawBR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.26), blackNose);
  pawBR.position.set(0.42, 0.05, 0.0);
  foxGroup.add(pawBR);

  // 4. Bushy Tail with white tip
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, 0.5, -0.65);

  const tailBody = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 1.2, 7),
    orangeCoat
  );
  tailBody.position.set(0, 0.4, -0.35);
  tailBody.rotation.x = -1.2;
  tailPivot.add(tailBody);

  const tailTip = new THREE.Mesh(
    new THREE.ConeGeometry(0.24, 0.45, 7),
    whiteCoat
  );
  tailTip.position.set(0, 0.85, -0.75);
  tailTip.rotation.x = -1.2;
  tailPivot.add(tailTip);

  foxGroup.add(tailPivot);

  // 5. Contact Shadow
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 64;
  shadowCanvas.height = 64;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(32, 32, 4, 32, 32, 28);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 64, 64);

  const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(shadowCanvas),
    transparent: true,
    depthWrite: false,
  });
  const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.01;
  foxGroup.add(contactShadow);

  // Animation internal state
  let currentState: FoxAnimationState = 'idle';
  let animTimer = 0;

  return {
    group: foxGroup,
    setState: (newState: FoxAnimationState) => {
      currentState = newState;
    },
    update: (delta: number) => {
      animTimer += delta;

      if (currentState === 'idle') {
        // Soft breathing
        body.position.y = 0.95 + Math.sin(animTimer * 2) * 0.03;
        // Subtle curious head sway
        headPivot.rotation.y = Math.sin(animTimer * 1.2) * 0.15;
        headPivot.rotation.x = 0.05 + Math.cos(animTimer * 1.8) * 0.04;
        // Tail slow wag
        tailPivot.rotation.y = Math.sin(animTimer * 2.5) * 0.35;
        tailPivot.rotation.z = Math.cos(animTimer * 1.2) * 0.1;
      } else if (currentState === 'focused' || currentState === 'typing') {
        // Fox leans forward attentively toward user typing
        body.position.y = 0.95;
        headPivot.rotation.y = THREE.MathUtils.damp(headPivot.rotation.y, -0.35, 8, delta);
        headPivot.rotation.x = THREE.MathUtils.damp(headPivot.rotation.x, 0.18, 8, delta);
        // Quick energetic tail flick
        tailPivot.rotation.y = Math.sin(animTimer * 7) * 0.45;
        // Ear twitch
        earL.rotation.z = 0.25 + (currentState === 'typing' ? Math.sin(animTimer * 12) * 0.08 : 0);
      } else if (currentState === 'submitting') {
        // Bouncing anticipation
        foxGroup.position.y = Math.abs(Math.sin(animTimer * 8)) * 0.2;
        tailPivot.rotation.y = Math.sin(animTimer * 14) * 0.6;
        headPivot.rotation.y = 0;
      } else if (currentState === 'success') {
        // Celebratory victory hop
        foxGroup.position.y = Math.abs(Math.sin(animTimer * 5)) * 0.35;
        headPivot.rotation.x = -0.2;
        tailPivot.rotation.y = Math.sin(animTimer * 16) * 0.7;
        headPivot.rotation.y = Math.sin(animTimer * 4) * 0.3;
      }
    }
  };
}
