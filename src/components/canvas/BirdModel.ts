import * as THREE from 'three';

export interface BirdController {
  group: THREE.Group;
  update: (delta: number) => void;
}

/**
 * Procedural Soaring Bird Model
 * Circles high above the island with cyclic wing flapping and banking trajectory
 */
export function createBird(): BirdController {
  const birdGroup = new THREE.Group();
  birdGroup.name = "SoaringBird";

  const featherMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.6,
    metalness: 0.1,
  });

  const beakMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, // Amber beak
    roughness: 0.4,
    metalness: 0.2,
  });

  const wingTipMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Dark navy tip
    roughness: 0.6,
  });

  // Torso / Body
  const bodyGeo = new THREE.ConeGeometry(0.12, 0.6, 6);
  const body = new THREE.Mesh(bodyGeo, featherMat);
  body.rotation.x = Math.PI / 2;
  birdGroup.add(body);

  // Beak
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.22, 5), beakMat);
  beak.rotation.x = -Math.PI / 2;
  beak.position.z = 0.4;
  birdGroup.add(beak);

  // Left Wing with pivot
  const leftWingPivot = new THREE.Group();
  leftWingPivot.position.set(-0.08, 0.02, 0.05);

  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.22), featherMat);
  leftWing.position.x = -0.35;
  leftWing.rotation.y = -0.2;
  leftWingPivot.add(leftWing);

  const leftTip = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.022, 0.16), wingTipMat);
  leftTip.position.x = -0.7;
  leftWingPivot.add(leftTip);

  birdGroup.add(leftWingPivot);

  // Right Wing with pivot
  const rightWingPivot = new THREE.Group();
  rightWingPivot.position.set(0.08, 0.02, 0.05);

  const rightWing = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.22), featherMat);
  rightWing.position.x = 0.35;
  rightWing.rotation.y = 0.2;
  rightWingPivot.add(rightWing);

  const rightTip = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.022, 0.16), wingTipMat);
  rightTip.position.x = 0.7;
  rightWingPivot.add(rightTip);

  birdGroup.add(rightWingPivot);

  // Tail
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.02, 0.3), featherMat);
  tail.position.set(0, 0.02, -0.4);
  birdGroup.add(tail);

  // Orbit state
  let angle = 0;
  const radius = 6.8;
  const height = 3.6;
  let wingFlapTime = 0;

  birdGroup.scale.setScalar(0.7);

  return {
    group: birdGroup,
    update: (delta: number) => {
      angle += delta * 0.35;
      wingFlapTime += delta * 4.5;

      // Circular path
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      birdGroup.position.set(x, height + Math.sin(angle * 2) * 0.5, z);

      // Tangential heading + banking
      birdGroup.rotation.y = angle + Math.PI / 2;
      birdGroup.rotation.z = -0.25; // Gentle inward bank

      // Wing flapping animation
      const flap = Math.sin(wingFlapTime) * 0.45;
      leftWingPivot.rotation.z = flap;
      rightWingPivot.rotation.z = -flap;
    }
  };
}
