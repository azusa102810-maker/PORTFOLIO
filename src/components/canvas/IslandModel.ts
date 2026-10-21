import * as THREE from 'three';

/**
 * Procedural Island Model
 * Crafted in the signature aesthetic of Adrian Hajdin's 3D Portfolio
 * Complete composite structure with rock formations, grassy plateaus,
 * Japanese pagoda, Torii gate, cherry blossoms, stone lanterns, and bridges.
 */
export function createIsland(): THREE.Group {
  const islandGroup = new THREE.Group();
  islandGroup.name = "FloatingIsland";

  // --- 1. Materials with physical properties ---
  const rockMaterial = new THREE.MeshStandardMaterial({
    color: 0x6e7b8b,
    roughness: 0.85,
    metalness: 0.1,
    flatShading: true,
  });

  const cliffBrownMaterial = new THREE.MeshStandardMaterial({
    color: 0x5a4d41,
    roughness: 0.9,
    metalness: 0.05,
    flatShading: true,
  });

  const grassMaterial = new THREE.MeshStandardMaterial({
    color: 0x5da859,
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true,
  });

  const grassHighlight = new THREE.MeshStandardMaterial({
    color: 0x72c46a,
    roughness: 0.7,
    metalness: 0.05,
    flatShading: true,
  });

  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x6d402b,
    roughness: 0.7,
    metalness: 0.1,
  });

  const redLacquerMaterial = new THREE.MeshStandardMaterial({
    color: 0xc83e2b,
    roughness: 0.35,
    metalness: 0.2,
  });

  const roofSlateMaterial = new THREE.MeshStandardMaterial({
    color: 0x243242,
    roughness: 0.5,
    metalness: 0.3,
  });

  const goldTrimMaterial = new THREE.MeshStandardMaterial({
    color: 0xe5b839,
    roughness: 0.3,
    metalness: 0.8,
  });

  const stonePathMaterial = new THREE.MeshStandardMaterial({
    color: 0xa8b4bd,
    roughness: 0.8,
    metalness: 0.1,
    flatShading: true,
  });

  const cherryBlossomMaterial = new THREE.MeshStandardMaterial({
    color: 0xffa8c5,
    roughness: 0.8,
    metalness: 0.05,
    flatShading: true,
  });

  const cherryBlossomLight = new THREE.MeshStandardMaterial({
    color: 0xffd1dc,
    roughness: 0.8,
    metalness: 0.05,
    flatShading: true,
  });

  const pineGreenMaterial = new THREE.MeshStandardMaterial({
    color: 0x2c6b4f,
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true,
  });

  const lanternGlowMaterial = new THREE.MeshStandardMaterial({
    color: 0xffdf78,
    emissive: 0xffa726,
    emissiveIntensity: 0.85,
    roughness: 0.3,
    metalness: 0.1,
  });

  const waterMaterial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.8,
  });

  // --- 2. Floating Island Rock Base & Terrain ---
  const terrainGroup = new THREE.Group();

  // Primary lower rock cone (faceted, upside down)
  const baseRockGeo = new THREE.ConeGeometry(5.8, 6.2, 9);
  const baseRock = new THREE.Mesh(baseRockGeo, rockMaterial);
  baseRock.rotation.x = Math.PI;
  baseRock.position.y = -3.1;
  baseRock.castShadow = true;
  baseRock.receiveShadow = true;
  terrainGroup.add(baseRock);

  // Secondary rock outcroppings to break uniformity
  const subRock1 = new THREE.Mesh(new THREE.ConeGeometry(3.6, 5.0, 7), cliffBrownMaterial);
  subRock1.rotation.x = Math.PI * 0.95;
  subRock1.rotation.z = 0.2;
  subRock1.position.set(2.4, -2.8, -1.2);
  subRock1.castShadow = true;
  terrainGroup.add(subRock1);

  const subRock2 = new THREE.Mesh(new THREE.ConeGeometry(3.2, 4.4, 6), cliffBrownMaterial);
  subRock2.rotation.x = Math.PI * 1.05;
  subRock2.rotation.z = -0.25;
  subRock2.position.set(-2.2, -2.5, 1.8);
  subRock2.castShadow = true;
  terrainGroup.add(subRock2);

  // Upper Grass Plateau (main ground)
  const plateauGeo = new THREE.CylinderGeometry(5.5, 5.8, 1.0, 12);
  const plateau = new THREE.Mesh(plateauGeo, grassMaterial);
  plateau.position.y = 0.5;
  plateau.receiveShadow = true;
  plateau.castShadow = true;
  terrainGroup.add(plateau);

  // Secondary grass layer with varied height
  const grassMound1 = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.8, 0.6, 9), grassHighlight);
  grassMound1.position.set(-1.2, 0.9, -1.0);
  grassMound1.receiveShadow = true;
  terrainGroup.add(grassMound1);

  const grassMound2 = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 3.0, 0.5, 8), grassMaterial);
  grassMound2.position.set(1.8, 0.85, 1.2);
  grassMound2.receiveShadow = true;
  terrainGroup.add(grassMound2);

  islandGroup.add(terrainGroup);

  // --- 3. Winding Stone Pathway & Steps ---
  const pathGroup = new THREE.Group();
  const pathCoords = [
    [-0.2, 0.82, 3.5, 0.5],
    [0.1, 0.82, 2.6, 0.45],
    [0.4, 0.82, 1.7, 0.5],
    [0.8, 0.83, 0.8, 0.55],
    [1.4, 0.84, 0.0, 0.5],
    [1.1, 0.85, -0.9, 0.45],
    [0.2, 0.88, -1.4, 0.55],
    [-0.8, 1.15, -1.6, 0.5],
    [-1.6, 1.22, -1.2, 0.6],
  ];

  pathCoords.forEach(([x, y, z, scale]) => {
    const stone = new THREE.Mesh(
      new THREE.CylinderGeometry(scale, scale * 1.1, 0.08, 6),
      stonePathMaterial
    );
    stone.position.set(x, y, z);
    stone.rotation.y = Math.random() * Math.PI;
    stone.receiveShadow = true;
    pathGroup.add(stone);
  });
  islandGroup.add(pathGroup);

  // --- 4. Japanese Pagoda / Shrine Structure ---
  const pagodaGroup = new THREE.Group();
  pagodaGroup.position.set(-1.8, 1.2, -1.0);
  pagodaGroup.rotation.y = 0.35;

  // Stone Foundation deck
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.3, 2.4),
    stonePathMaterial
  );
  foundation.position.y = 0.15;
  foundation.castShadow = true;
  foundation.receiveShadow = true;
  pagodaGroup.add(foundation);

  // Wooden Floor
  const woodDeck = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.12, 2.2),
    woodMaterial
  );
  woodDeck.position.y = 0.35;
  pagodaGroup.add(woodDeck);

  // 4 Red Lacquer Pillars
  const pillarGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 8);
  const pillarOffsets = [
    [-0.85, -0.85],
    [0.85, -0.85],
    [-0.85, 0.85],
    [0.85, 0.85],
  ];
  pillarOffsets.forEach(([px, pz]) => {
    const pillar = new THREE.Mesh(pillarGeo, redLacquerMaterial);
    pillar.position.set(px, 1.05, pz);
    pillar.castShadow = true;
    pagodaGroup.add(pillar);
  });

  // Shrine Sanctum Wall (Center Room)
  const shrineInner = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.1, 1.3),
    new THREE.MeshStandardMaterial({ color: 0xfbf2db, roughness: 0.9 })
  );
  shrineInner.position.y = 0.95;
  pagodaGroup.add(shrineInner);

  // First Tier Roof (Swept pagoda eave)
  const roofTier1 = new THREE.Mesh(
    new THREE.ConeGeometry(1.8, 0.65, 4),
    roofSlateMaterial
  );
  roofTier1.position.y = 1.95;
  roofTier1.rotation.y = Math.PI / 4;
  roofTier1.castShadow = true;
  pagodaGroup.add(roofTier1);

  // Golden Finial / Upper Spire
  const upperSpire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.08, 0.6, 8),
    goldTrimMaterial
  );
  upperSpire.position.y = 2.45;
  pagodaGroup.add(upperSpire);

  const spireJewel = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 12, 12),
    goldTrimMaterial
  );
  spireJewel.position.y = 2.8;
  pagodaGroup.add(spireJewel);

  // Pagoda Hanging Lantern
  const lantern = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.28, 0.2),
    lanternGlowMaterial
  );
  lantern.position.set(0, 1.4, 0.85);
  pagodaGroup.add(lantern);

  islandGroup.add(pagodaGroup);

  // --- 5. Traditional Torii Gate (Entrance Landmark) ---
  const toriiGroup = new THREE.Group();
  toriiGroup.position.set(0.0, 0.8, 3.4);
  toriiGroup.rotation.y = -0.1;

  // Left & Right Pillars
  const toriiPillarL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 1.8, 8), redLacquerMaterial);
  toriiPillarL.position.set(-0.7, 0.9, 0);
  toriiPillarL.castShadow = true;
  toriiGroup.add(toriiPillarL);

  const toriiPillarR = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 1.8, 8), redLacquerMaterial);
  toriiPillarR.position.set(0.7, 0.9, 0);
  toriiPillarR.castShadow = true;
  toriiGroup.add(toriiPillarR);

  // Black stone bases
  const baseL = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.25, 8), roofSlateMaterial);
  baseL.position.set(-0.7, 0.12, 0);
  toriiGroup.add(baseL);

  const baseR = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.25, 8), roofSlateMaterial);
  baseR.position.set(0.7, 0.12, 0);
  toriiGroup.add(baseR);

  // Lower Crossbeam (Nuki)
  const nuki = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.12, 0.12), redLacquerMaterial);
  nuki.position.set(0, 1.4, 0);
  toriiGroup.add(nuki);

  // Upper Curved Main Beam (Kasagi)
  const kasagi = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.18, 0.18), redLacquerMaterial);
  kasagi.position.set(0, 1.82, 0);
  kasagi.castShadow = true;
  toriiGroup.add(kasagi);

  const topBlackCap = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.06, 0.22), roofSlateMaterial);
  topBlackCap.position.set(0, 1.94, 0);
  toriiGroup.add(topBlackCap);

  islandGroup.add(toriiGroup);

  // --- 6. Stylized Cherry Blossom Trees (Sakura) ---
  function createCherryTree(x: number, y: number, z: number, scale = 1.0, rot = 0): THREE.Group {
    const tree = new THREE.Group();
    tree.position.set(x, y, z);
    tree.scale.setScalar(scale);
    tree.rotation.y = rot;

    // Organic curved trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.2, 1.6, 7),
      woodMaterial
    );
    trunk.position.set(0, 0.8, 0);
    trunk.rotation.z = -0.12;
    trunk.castShadow = true;
    tree.add(trunk);

    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.1, 0.9, 6),
      woodMaterial
    );
    branch.position.set(0.25, 1.25, 0.1);
    branch.rotation.z = 0.55;
    tree.add(branch);

    // Multi-tier blossom puffs
    const puffCoords = [
      [0.0, 1.8, 0.0, 0.85, cherryBlossomMaterial],
      [0.55, 1.55, 0.2, 0.65, cherryBlossomLight],
      [-0.45, 1.6, -0.2, 0.6, cherryBlossomMaterial],
      [0.1, 2.15, -0.1, 0.6, cherryBlossomLight],
    ];

    puffCoords.forEach(([px, py, pz, radius, mat]) => {
      const puff = new THREE.Mesh(
        new THREE.DodecahedronGeometry(radius as number, 1),
        mat as THREE.Material
      );
      puff.position.set(px as number, py as number, pz as number);
      puff.castShadow = true;
      puff.receiveShadow = true;
      tree.add(puff);
    });

    return tree;
  }

  islandGroup.add(createCherryTree(2.2, 0.85, -1.4, 1.1, 0.4));
  islandGroup.add(createCherryTree(3.0, 0.8, 0.5, 0.95, -0.6));
  islandGroup.add(createCherryTree(-2.8, 0.75, 1.0, 0.85, 1.2));

  // --- 7. Evergreen Pine Trees ---
  function createPineTree(x: number, y: number, z: number, scale = 1.0): THREE.Group {
    const pine = new THREE.Group();
    pine.position.set(x, y, z);
    pine.scale.setScalar(scale);

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.16, 1.2, 6),
      woodMaterial
    );
    trunk.position.y = 0.6;
    pine.add(trunk);

    const cone1 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.9, 6), pineGreenMaterial);
    cone1.position.y = 1.2;
    cone1.castShadow = true;
    pine.add(cone1);

    const cone2 = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.8, 6), pineGreenMaterial);
    cone2.position.y = 1.65;
    cone2.castShadow = true;
    pine.add(cone2);

    const cone3 = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.65, 6), pineGreenMaterial);
    cone3.position.y = 2.05;
    cone3.castShadow = true;
    pine.add(cone3);

    return pine;
  }

  islandGroup.add(createPineTree(-3.2, 0.7, -1.8, 1.0));
  islandGroup.add(createPineTree(1.2, 0.85, -2.6, 0.85));

  // --- 8. Stone Lanterns (Tōrō) along path ---
  function createStoneLantern(x: number, y: number, z: number): THREE.Group {
    const lanternObj = new THREE.Group();
    lanternObj.position.set(x, y, z);

    // Pedestal
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.2, 6), stonePathMaterial);
    base.position.y = 0.1;
    lanternObj.add(base);

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.45, 6), stonePathMaterial);
    post.position.y = 0.4;
    lanternObj.add(post);

    // Glowing Light Box
    const lightBox = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.24), lanternGlowMaterial);
    lightBox.position.y = 0.68;
    lanternObj.add(lightBox);

    // Roof Cap
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.16, 4), stonePathMaterial);
    cap.position.y = 0.88;
    cap.rotation.y = Math.PI / 4;
    lanternObj.add(cap);

    return lanternObj;
  }

  islandGroup.add(createStoneLantern(0.7, 0.85, 2.2));
  islandGroup.add(createStoneLantern(-0.6, 0.85, 1.2));
  islandGroup.add(createStoneLantern(1.6, 0.85, -0.6));

  // --- 9. Mountain Spring & Crystal Water Pond ---
  const pondGroup = new THREE.Group();
  pondGroup.position.set(2.0, 0.9, 0.8);

  const waterSurface = new THREE.Mesh(
    new THREE.CylinderGeometry(0.9, 0.95, 0.08, 12),
    waterMaterial
  );
  waterSurface.position.y = 0.02;
  pondGroup.add(waterSurface);

  // Decorative border river stones
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    const r = 0.95 + Math.sin(i * 3) * 0.1;
    const pebble = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.15, 0),
      stonePathMaterial
    );
    pebble.position.set(Math.cos(angle) * r, 0.06, Math.sin(angle) * r);
    pebble.scale.set(1.2, 0.7, 1);
    pondGroup.add(pebble);
  }
  islandGroup.add(pondGroup);

  // --- 10. Satellite Mini Floating Rocks with vegetation ---
  function createMiniIsland(x: number, y: number, z: number, scale = 1.0): THREE.Group {
    const mini = new THREE.Group();
    mini.position.set(x, y, z);
    mini.scale.setScalar(scale);

    const miniRock = new THREE.Mesh(
      new THREE.ConeGeometry(0.9, 1.4, 6),
      cliffBrownMaterial
    );
    miniRock.rotation.x = Math.PI;
    miniRock.position.y = -0.7;
    mini.add(miniRock);

    const miniGrass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.9, 0.25, 7),
      grassMaterial
    );
    miniGrass.position.y = 0.05;
    mini.add(miniGrass);

    const miniTree = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.45, 1),
      cherryBlossomMaterial
    );
    miniTree.position.y = 0.55;
    mini.add(miniTree);

    return mini;
  }

  islandGroup.add(createMiniIsland(-4.8, -0.8, -2.5, 0.85));
  islandGroup.add(createMiniIsland(4.5, -1.2, 2.8, 0.75));
  islandGroup.add(createMiniIsland(3.8, 0.2, -4.2, 0.65));

  // --- 11. Soft Contact Shadow Plane beneath floating island ---
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0.45)');
  grad.addColorStop(0.5, 'rgba(15, 23, 42, 0.18)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 128, 128);

  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowGeo = new THREE.PlaneGeometry(14, 14);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -7.5;
  islandGroup.add(shadowMesh);

  return islandGroup;
}
