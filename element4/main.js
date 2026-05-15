const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.25, 0.25, 0.45);

    /* COLLISIONS + GRAVITY */
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
    camera.keysUp = [];
camera.keysDown = [];
camera.keysLeft = [];
camera.keysRight = [];
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
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);

groundMat.diffuseTexture = new BABYLON.Texture(

    "../element3/textures/wood.jpg",

    scene

);

groundMat.diffuseTexture.uScale = 4;

groundMat.diffuseTexture.vScale = 4;

ground.material = groundMat;

    /* PLAYER */
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

boxMat.diffuseTexture = new BABYLON.Texture(
    "../element2/textures/wood.jpg",
    scene
);

box.material = boxMat;

    /* =========================
       GUI – HEALTH BAR
    ========================= */
    const guiTexture =
        BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const panel = new BABYLON.GUI.Rectangle();
    panel.width = "260px";
    panel.height = "30px";
    panel.cornerRadius = 5;
    panel.color = "white";
    panel.thickness = 2;
    panel.background = "black";
    panel.top = "20px";
    panel.left = "20px";
    panel.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    guiTexture.addControl(panel);

    const healthBar = new BABYLON.GUI.Rectangle();
    healthBar.width = "160px";
    healthBar.height = "20px";
    healthBar.background = "green";
    healthBar.horizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.addControl(healthBar);

    let health = 100;

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

        if (inputMap[" "] && isGrounded) {
            verticalVelocity = jumpForce;
            isGrounded = false;
        }

        verticalVelocity += gravity;
        moveVector.y = verticalVelocity;

        const oldY = player.position.y;
        player.moveWithCollisions(moveVector);

        if (player.position.y === oldY) {
            verticalVelocity = 0;
            isGrounded = true;
        }

        /* Camera follows */
        camera.position.x = player.position.x;
        camera.position.z = player.position.z - 10;

        /* Fake damage when touching box */
        const distanceToBox = BABYLON.Vector3.Distance(player.position, box.position);

if (distanceToBox < 2.2) {
    health -= 0.2;
    health = Math.max(health, 0);
    healthBar.width = (health * 2) + "px";
}
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
