import * as THREE from 'three';

export interface SkyController {
  group: THREE.Group;
  update: (delta: number) => void;
}

/**
 * Procedural Sky & Atmospheric Clouds
 * Features drifting fluffy cumulus cloud clusters and subtle horizon mist
 */
export function createSky(): SkyController {
  const skyGroup = new THREE.Group();
  skyGroup.name = "SkyEnvironment";

  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.95,
    metalness: 0.0,
    flatShading: true,
  });

  const cloudGroup = new THREE.Group();
  const clouds: { mesh: THREE.Group; speed: number; resetZ: number }[] = [];

  function createCloudCluster(scale = 1.0): THREE.Group {
    const cluster = new THREE.Group();
    const puffCount = 5 + Math.floor(Math.random() * 4);

    for (let i = 0; i < puffCount; i++) {
      const radius = 0.8 + Math.random() * 0.6;
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(radius, 1), cloudMat);
      puff.position.set(
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 1.5
      );
      cluster.add(puff);
    }
    cluster.scale.setScalar(scale);
    return cluster;
  }

  // Populate 12 clouds at various radii and heights
  const cloudSpawnData = [
    { x: -14, y: 7, z: -8, scale: 1.4, speed: 0.35 },
    { x: 12, y: 8.5, z: -12, scale: 1.8, speed: 0.28 },
    { x: -18, y: 5.5, z: 10, scale: 1.5, speed: 0.4 },
    { x: 16, y: 6.2, z: 6, scale: 1.3, speed: 0.32 },
    { x: -6, y: 9.2, z: -16, scale: 2.1, speed: 0.25 },
    { x: 8, y: 5.0, z: -4, scale: 1.1, speed: 0.38 },
    { x: -12, y: 4.8, z: -14, scale: 1.6, speed: 0.3 },
    { x: 15, y: 9.8, z: 14, scale: 1.9, speed: 0.22 },
  ];

  cloudSpawnData.forEach((data) => {
    const cloudMesh = createCloudCluster(data.scale);
    cloudMesh.position.set(data.x, data.y, data.z);
    cloudGroup.add(cloudMesh);
    clouds.push({
      mesh: cloudMesh,
      speed: data.speed,
      resetZ: data.z
    });
  });

  skyGroup.add(cloudGroup);

  return {
    group: skyGroup,
    update: (delta: number) => {
      clouds.forEach((cloud) => {
        cloud.mesh.position.x += delta * cloud.speed;
        // Wrap around horizontally
        if (cloud.mesh.position.x > 26) {
          cloud.mesh.position.x = -26;
        }
      });
    }
  };
}
