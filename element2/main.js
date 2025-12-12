const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  /* CAMERA */
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3,
    90,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  /* LIGHT */
  new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  /* SKYBOX */
  const skybox = BABYLON.MeshBuilder.CreateBox(
    "skyBox",
    { size: 1000 },
    scene
  );

  const skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMat", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    "skybox/skybox_", // <-- THIS IS THE IMPORTANT FIX
    scene
  );
  skyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;

  /* GROUND */
  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 200, height: 200 },
    scene
  );

  const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseTexture = new BABYLON.Texture(
    "textures/valleygrass.png",
    scene
  );
  ground.material = groundMat;

  /* WHITE HOUSES */
  const houseMat = new BABYLON.StandardMaterial("houseMat", scene);
  houseMat.diffuseColor = BABYLON.Color3.White();

  const housePositions = [
    { x: -20, z: -20 },
    { x: 20, z: -20 },
    { x: -20, z: 20 },
    { x: 20, z: 20 }
  ];

  housePositions.forEach(pos => {
    const house = BABYLON.MeshBuilder.CreateBox(
      "house",
      { size: 8 },
      scene
    );
    house.position.set(pos.x, 4, pos.z);
    house.material = houseMat;
  });

  /* TREE SPRITES */
  const treeManager = new BABYLON.SpriteManager(
    "treeManager",
    "sprites/tree.png",
    10,
    { width: 512, height: 512 },
    scene
  );
  treeManager.texture.hasAlpha = true;

  const palmManager = new BABYLON.SpriteManager(
    "palmManager",
    "sprites/palmtree.png",
    10,
    { width: 512, height: 512 },
    scene
  );
  palmManager.texture.hasAlpha = true;

  const trees = [
    { x: -40, z: 0 },
    { x: 0, z: -40 },
    { x: 40, z: 0 }
  ];

  trees.forEach(pos => {
    const tree = new BABYLON.Sprite("tree", treeManager);
    tree.position.set(pos.x, 10, pos.z);
    tree.size = 20;
  });

  const palms = [
    { x: -30, z: 30 },
    { x: 30, z: 30 }
  ];

  palms.forEach(pos => {
    const palm = new BABYLON.Sprite("palm", palmManager);
    palm.position.set(pos.x, 12, pos.z);
    palm.size = 24;
  });

  return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});