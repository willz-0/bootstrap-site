const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

let currentScene;

/* -------- SCENE A -------- */
const createSceneA = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.2, 0.5, 0.3);

    const camera = new BABYLON.ArcRotateCamera(
        "camA",
        Math.PI / 4,
        Math.PI / 3,
        10,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
        "lightA",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    const ground = BABYLON.MeshBuilder.CreateGround(
        "groundA",
        { width: 6, height: 6 },
        scene
    );

    const box = BABYLON.MeshBuilder.CreateBox(
        "boxA",
        { size: 2 },
        scene
    );
    box.position.y = 1;
    const portal = BABYLON.MeshBuilder.CreateCylinder(
    "portal",
    { height: 4, diameter: 2 },
    scene
);

portal.position = new BABYLON.Vector3(3, 2, 0);
const portalMat = new BABYLON.StandardMaterial("portalMat", scene);
portalMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
portal.material = portalMat;
    scene.registerBeforeRender(() => {
        box.rotation.y += 0.02;
    });

    return scene;
};

/* -------- SCENE B -------- */
const createSceneB = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.2, 0.3, 0.6);

    const camera = new BABYLON.ArcRotateCamera(
        "camB",
        Math.PI / 2,
        Math.PI / 2.5,
        10,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.DirectionalLight(
        "lightB",
        new BABYLON.Vector3(-1, -2, -1),
        scene
    );
    light.position = new BABYLON.Vector3(10, 20, 10);

    const ground = BABYLON.MeshBuilder.CreateGround(
        "groundB",
        { width: 6, height: 6 },
        scene
    );

    const sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphereB",
        { diameter: 2 },
        scene
    );
    sphere.position.y = 1.4;

   scene.registerBeforeRender(() => {
    sphere.rotation.x += 0.04;
    sphere.rotation.y += 0.04;
    sphere.position.y = 1.4 + Math.sin(Date.now() * 0.005) * 0.5;
});
    const guiB = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UIB");

const textB = new BABYLON.GUI.TextBlock();

textB.text = "SCENE B - Press 1 to switch back";
textB.color = "yellow";
textB.fontSize = 32;
textB.top = "-40%";

guiB.addControl(textB);

    return scene;
};

/* -------- Swtch scene -------- */
const switchScene = (sceneCreator) => {
    if (currentScene) {
        currentScene.dispose();
    }
    currentScene = sceneCreator();
};


switchScene(createSceneA);


window.addEventListener("keydown", (event) => {
    if (event.key === "1") {
        switchScene(createSceneA);
    }
    if (event.key === "2") {
        switchScene(createSceneB);
    }
});


engine.runRenderLoop(() => {
    if (currentScene) {
        currentScene.render();
    }
});

window.addEventListener("resize", () => {
    engine.resize();
});
