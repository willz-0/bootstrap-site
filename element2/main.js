const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    /* CAMERA */
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 3,
        80,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = Math.PI / 2.3;
    camera.lowerRadiusLimit = 20;
    camera.upperRadiusLimit = 150;

    /* LIGHT */
    new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    /* ✅ SKY (SINGLE IMAGE – THIS IS THE FIX) */
    const sky = BABYLON.MeshBuilder.CreateSphere(
        "sky",
        { diameter: 1000, sideOrientation: BABYLON.Mesh.BACKSIDE },
        scene
    );

    const skyMat = new BABYLON.StandardMaterial("skyMat", scene);
    skyMat.emissiveTexture = new BABYLON.Texture(
        "skybox/skybox_pz.jpg",
        scene
    );
    skyMat.disableLighting = true;
    sky.material = skyMat;

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

    /* HOUSES (4) */
    const houseMat = new BABYLON.StandardMaterial("houseMat", scene);
    houseMat.diffuseTexture = new BABYLON.Texture(
        "textures/semihouse.png",
        scene
    );

    const roofMat = new BABYLON.StandardMaterial("roofMat", scene);
    roofMat.diffuseTexture = new BABYLON.Texture(
        "textures/roof.jpg",
        scene
    );

    const housePositions = [
        { x: -20, z: -20 },
        { x: 20, z: -20 },
        { x: -20, z: 20 },
        { x: 20, z: 20 }
    ];

    housePositions.forEach(pos => {
        const house = BABYLON.MeshBuilder.CreateBox(
            "house",
            { width: 6, height: 8, depth: 6 },
            scene
        );
        house.position.set(pos.x, 4, pos.z);
        house.material = houseMat;

        const roof = BABYLON.MeshBuilder.CreateBox(
            "roof",
            { width: 8.5, height: 2, depth: 8.5 },
            scene
        );
        roof.position.set(pos.x, 9, pos.z);
        roof.material = roofMat;
    });

    /* TREE SPRITES */
    const treeManager = new BABYLON.SpriteManager(
        "trees",
        "sprites/tree.png",
        10,
        { width: 512, height: 512 },
        scene
    );

    const palmManager = new BABYLON.SpriteManager(
        "palms",
        "sprites/palmtree.png",
        10,
        { width: 512, height: 512 },
        scene
    );

    const trees = [
        { x: -40, z: 0 },
        { x: 0, z: -40 },
        { x: 40, z: 0 }
    ];

    trees.forEach(pos => {
        const tree = new BABYLON.Sprite("tree", treeManager);
        tree.position.set(pos.x, 10, pos.z);
        tree.size = 12;
    });

    const palms = [
        { x: -35, z: 35 },
        { x: 35, z: 35 }
    ];

    palms.forEach(pos => {
        const palm = new BABYLON.Sprite("palm", palmManager);
        palm.position.set(pos.x, 12, pos.z);
        palm.size = 14;
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
