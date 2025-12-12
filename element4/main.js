const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.25, 0.25, 0.45);

    /* ENABLE COLLISIONS + GRAVITY */
    scene.collisionsEnabled = true;
    scene.gravity = new BABYLON.Vector3(0, -0.4, 0);

    /* LIGHT */
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    light.intensity = 0.9;

    /* CAMERA */
    const camera = new BABYLON.FreeCamera(
        "camera",
        new BABYLON.Vector3(0, 5, -10),
        scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);

    /* GROUND */
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 20, height: 20 },
        scene
    );
    ground.checkCollisions = true;

    /* PLAYER (CAPSULE) */
    const player = BABYLON.MeshBuilder.CreateCapsule(
        "player",
        { height: 2, radius: 0.5 },
        scene
    );
    player.position.y = 1;
    player.checkCollisions = true;
    player.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);

    const playerMat = new BABYLON.StandardMaterial("playerMat", scene);
    playerMat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
    player.material = playerMat;

    /* OBSTACLE */
    const box = BABYLON.MeshBuilder.CreateBox(
        "box",
        { size: 1.5 },
        scene
    );
    box.position = new BABYLON.Vector3(0, 0.75, 2);
    box.checkCollisions = true;

    const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture("textures/wood.jpg", scene);
    box.material = boxMat;

    /* INPUT */
    const inputMap = {};
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            evt => inputMap[evt.sourceEvent.key.toLowerCase()] = true
        )
    );

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            evt => inputMap[evt.sourceEvent.key.toLowerCase()] = false
        )
    );

    /* MOVEMENT + JUMP */
    const speed = 0.15;
    let isGrounded = false;
    let verticalVelocity = 0;
    const jumpForce = 0.25;
    const gravity = -0.02;

    scene.onBeforeRenderObservable.add(() => {
        let moveVector = BABYLON.Vector3.Zero();

        if (inputMap["w"]) moveVector.z += speed;
        if (inputMap["s"]) moveVector.z -= speed;
        if (inputMap["a"]) moveVector.x -= speed;
        if (inputMap["d"]) moveVector.x += speed;

        /* JUMP */
        if (inputMap[" "] && isGrounded) {
            verticalVelocity = jumpForce;
            isGrounded = false;
        }

        verticalVelocity += gravity;
        moveVector.y = verticalVelocity;

        const oldY = player.position.y;
        player.moveWithCollisions(moveVector);

        /* Ground check */
        if (player.position.y === oldY) {
            verticalVelocity = 0;
            isGrounded = true;
        }

        /* Camera follows player */
        camera.position.x = player.position.x;
        camera.position.z = player.position.z - 10;
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});