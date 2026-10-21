import * as THREE from 'three';

export interface PlaneController {
  group: THREE.Group;
  propeller: THREE.Mesh;
  update: (delta: number, isRotating: boolean, rotationVelocity: number) => void;
}

/**
 * Procedural Vintage Airplane Model
 * Designed after Adrian Hajdin's 3D portfolio plane
 * Responds to drag/turn inertia with dynamic roll, pitch, and high-speed propeller spin
 */
export function createPlane(): PlaneController {
  const planeGroup = new THREE.Group();
  planeGroup.name = "HeroPlane";

  // Materials
  const bodyPaint = new THREE.MeshStandardMaterial({
    color: 0xef4444, // Vibrant crimson
    roughness: 0.35,
    metalness: 0.25,
  });

  const stripePaint = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0.1,
  });

  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.4,
    metalness: 0.8,
  });

  const chromeNose = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.2,
    metalness: 0.9,
  });

  const glassWindshield = new THREE.MeshPhysicalMaterial({
    color: 0x93c5fd,
    transmission: 0.9,
    opacity: 0.7,
    transparent: true,
    roughness: 0.1,
    ior: 1.5,
  });

  const pilotSuit = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    roughness: 0.8,
  });

  const pilotSkin = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    roughness: 0.6,
  });

  // 1. Fuselage (Aerodynamic main body)
  const fuselageGeo = new THREE.ConeGeometry(0.38, 2.2, 10);
  const fuselage = new THREE.Mesh(fuselageGeo, bodyPaint);
  fuselage.rotation.x = Math.PI / 2;
  fuselage.castShadow = true;
  planeGroup.add(fuselage);

  // Engine Cowling / Front Cylinder
  const noseCowl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.36, 0.5, 12),
    stripePaint
  );
  noseCowl.rotation.x = Math.PI / 2;
  noseCowl.position.z = 1.0;
  noseCowl.castShadow = true;
  planeGroup.add(noseCowl);

  // Propeller Hub Nose Spinner
  const noseCone = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 0.4, 12),
    chromeNose
  );
  noseCone.rotation.x = Math.PI / 2;
  noseCone.position.z = 1.35;
  planeGroup.add(noseCone);

  // 2. Propeller (3 blades)
  const propellerGroup = new THREE.Group();
  propellerGroup.position.set(0, 0, 1.28);

  const bladeGeo = new THREE.BoxGeometry(0.12, 1.3, 0.03);
  const blade1 = new THREE.Mesh(bladeGeo, darkMetal);
  blade1.castShadow = true;
  propellerGroup.add(blade1);

  const blade2 = new THREE.Mesh(bladeGeo, darkMetal);
  blade2.rotation.z = (Math.PI * 2) / 3;
  propellerGroup.add(blade2);

  const blade3 = new THREE.Mesh(bladeGeo, darkMetal);
  blade3.rotation.z = (Math.PI * 4) / 3;
  propellerGroup.add(blade3);

  planeGroup.add(propellerGroup);

  // 3. Main Wings (High wing monoplane)
  const mainWing = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.06, 0.68),
    bodyPaint
  );
  mainWing.position.set(0, 0.28, 0.2);
  mainWing.castShadow = true;
  planeGroup.add(mainWing);

  // Wing stripes
  const wingStripeL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.065, 0.7), stripePaint);
  wingStripeL.position.set(-1.1, 0.28, 0.2);
  planeGroup.add(wingStripeL);

  const wingStripeR = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.065, 0.7), stripePaint);
  wingStripeR.position.set(1.1, 0.28, 0.2);
  planeGroup.add(wingStripeR);

  // Wing Struts
  const strutL = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 6), darkMetal);
  strutL.position.set(-0.7, 0.08, 0.2);
  strutL.rotation.z = -0.4;
  planeGroup.add(strutL);

  const strutR = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 6), darkMetal);
  strutR.position.set(0.7, 0.08, 0.2);
  strutR.rotation.z = 0.4;
  planeGroup.add(strutR);

  // 4. Cockpit & Aviator Pilot
  const windshield = new THREE.Mesh(
    new THREE.ConeGeometry(0.32, 0.45, 6, 1, true, 0, Math.PI),
    glassWindshield
  );
  windshield.position.set(0, 0.35, 0.45);
  windshield.rotation.x = 0.3;
  planeGroup.add(windshield);

  // Pilot Body & Helmet
  const pilotBody = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.28, 8), pilotSuit);
  pilotBody.position.set(0, 0.24, 0.05);
  planeGroup.add(pilotBody);

  const pilotHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), pilotSkin);
  pilotHead.position.set(0, 0.43, 0.05);
  planeGroup.add(pilotHead);

  const pilotGoggles = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.08), darkMetal);
  pilotGoggles.position.set(0, 0.45, 0.15);
  planeGroup.add(pilotGoggles);

  // 5. Tail Empennage (Vertical Fin & Horizontal Stabilizer)
  const verticalFin = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.65, 0.5),
    bodyPaint
  );
  verticalFin.position.set(0, 0.42, -1.0);
  verticalFin.rotation.x = -0.3;
  verticalFin.castShadow = true;
  planeGroup.add(verticalFin);

  const horizontalFin = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.04, 0.36),
    bodyPaint
  );
  horizontalFin.position.set(0, 0.2, -1.05);
  horizontalFin.castShadow = true;
  planeGroup.add(horizontalFin);

  // 6. Undercarriage Landing Gear
  const wheelL = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 10), darkMetal);
  wheelL.rotation.z = Math.PI / 2;
  wheelL.position.set(-0.45, -0.42, 0.4);
  planeGroup.add(wheelL);

  const wheelR = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 10), darkMetal);
  wheelR.rotation.z = Math.PI / 2;
  wheelR.position.set(0.45, -0.42, 0.4);
  planeGroup.add(wheelR);

  // Initial Placement
  planeGroup.scale.setScalar(0.7);
  planeGroup.position.set(0, -0.3, 3.8);

  let floatingTimer = 0;

  return {
    group: planeGroup,
    propeller: blade1,
    update: (delta: number, isRotating: boolean, rotationVelocity: number) => {
      floatingTimer += delta;

      // Fast propeller spin (spins even faster when dragging)
      const spinSpeed = isRotating ? 35 : 18;
      propellerGroup.rotation.z += delta * spinSpeed;

      // Atmospheric floating bobbing
      const bobY = Math.sin(floatingTimer * 2.2) * 0.08;
      const bobZ = Math.cos(floatingTimer * 1.5) * 0.03;
      planeGroup.position.y = -0.3 + bobY;

      // Dynamic banking (roll) and pitch based on user island rotation
      const targetRoll = -rotationVelocity * 4.5;
      const targetPitch = isRotating ? 0.08 : 0.0;

      planeGroup.rotation.z = THREE.MathUtils.damp(planeGroup.rotation.z, targetRoll, 6, delta);
      planeGroup.rotation.x = THREE.MathUtils.damp(planeGroup.rotation.x, targetPitch + Math.sin(floatingTimer * 1.8) * 0.04, 5, delta);
    }
  };
}
