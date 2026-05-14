const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.35);

  // LIGHT
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.9;

  // CAMERA
  const camera = new BABYLON.FollowCamera(
    "followCam",
    new BABYLON.Vector3(0, 8, -15),
    scene
  );

  camera.radius = 15;
  camera.heightOffset = 6;
  camera.rotationOffset = 180;
  camera.cameraAcceleration = 0.05;
  camera.maxCameraSpeed = 10;

  camera.attachControl(canvas, true);
  scene.activeCamera = camera;

  // COLLISIONS
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
  scene.collisionsEnabled = true;
  scene.enablePhysics();

  // GROUND
  const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseTexture = new BABYLON.Texture(
    "textures/wood.jpg",
    scene
  );

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 60, height: 60 },
    scene
  );
  ground.material = groundMat;
  groundMat.diffuseTexture.uScale = 10;
groundMat.diffuseTexture.vScale = 10;
  
  ground.checkCollisions = true;

  // COLLISION BOX
  const box = BABYLON.MeshBuilder.CreateBox(
    "collisionBox",
    { size: 3 },
    scene
  );
  box.position = new BABYLON.Vector3(5, 1.5, 0);
  box.checkCollisions = true;
  box.physicsImpostor = new BABYLON.PhysicsImpostor(
    box,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 1, restitution: 0.2 },
  scene
);

  // PLAYER
  BABYLON.SceneLoader.ImportMesh(
    "",
    "models/men/",
    "dummy3.babylon",
    scene,
    function (meshes) {
      const player = meshes[0];

      player.scaling = new BABYLON.Vector3(3, 3, 3);
      player.position = new BABYLON.Vector3(0, 1, 0);

      player.checkCollisions = true;
      player.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
      player.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);

      camera.lockedTarget = player;

      const speed = 0.15;
      const inputMap = {};

      scene.actionManager = new BABYLON.ActionManager(scene);

      scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnKeyDownTrigger,
          (evt) => {
            inputMap[evt.sourceEvent.key.toLowerCase()] = true;
          }
        )
      );

      scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnKeyUpTrigger,
          (evt) => {
            inputMap[evt.sourceEvent.key.toLowerCase()] = false;
          }
        )
      );

      scene.onBeforeRenderObservable.add(() => {
        if (inputMap["w"]) player.moveWithCollisions(player.forward.scale(speed));
        if (inputMap["s"]) player.moveWithCollisions(player.forward.scale(-speed));
        if (inputMap["a"]) player.rotate(BABYLON.Vector3.Up(), -0.05);
        if (inputMap["d"]) player.rotate(BABYLON.Vector3.Up(), 0.05);
      });
    }
  );

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
