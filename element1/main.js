const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.25, 0.3, 0.5);

    /* CAMERA */
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 4,
        Math.PI / 3,
        20,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    /* LIGHTING */
    const hemiLight = new BABYLON.HemisphericLight(
        "hemi",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    hemiLight.intensity = 0.6;

    const dirLight = new BABYLON.DirectionalLight(
        "dirLight",
        new BABYLON.Vector3(-1, -2, -1),
        scene
    );
    dirLight.position = new BABYLON.Vector3(10, 20, 10);

    /* SHADOWS */
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    /* MATERIALS */
    const woodMat = new BABYLON.StandardMaterial("woodMat", scene);
    woodMat.diffuseTexture = new BABYLON.Texture("textures/wood.jpg", scene);

    const floorMat = new BABYLON.StandardMaterial("floorMat", scene);
    floorMat.diffuseTexture = new BABYLON.Texture("textures/floor.png", scene);

    const checkerMat = new BABYLON.StandardMaterial("checkerMat", scene);
    checkerMat.diffuseTexture = new BABYLON.Texture(
        "https://assets.babylonjs.com/environments/checkerboard_basecolor.png",
        scene
    );

    /* PLATFORM */
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 12, height: 12 },
        scene
    );
    ground.material = floorMat;
    ground.receiveShadows = true;

    /* BACK WALL */
    const wall = BABYLON.MeshBuilder.CreateBox(
        "wall",
        { width: 12, height: 6, depth: 0.5 },
        scene
    );
    wall.position = new BABYLON.Vector3(0, 3, -6);
    wall.material = woodMat;
    wall.receiveShadows = true;

    /* SHAPES (LIKE LECTURE DEMO) */

    // Box
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.position = new BABYLON.Vector3(-3, 1, 0);
    box.material = checkerMat;

    // Cylinder
    const cylinder = BABYLON.MeshBuilder.CreateCylinder(
        "cylinder",
        { height: 2, diameter: 1.5 },
        scene
    );
    cylinder.position = new BABYLON.Vector3(3, 1, 0);
    cylinder.material = checkerMat;

    // Cone
    const cone = BABYLON.MeshBuilder.CreateCylinder(
        "cone",
        { height: 2, diameterTop: 0, diameterBottom: 1.5 },
        scene
    );
    cone.position = new BABYLON.Vector3(-3, 1, 3);
    cone.material = checkerMat;

    // Sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 1.5 },
        scene
    );
    sphere.position = new BABYLON.Vector3(3, 2.5, 3);
    sphere.material = checkerMat;

    // Floating Polyhedron (top)
    const poly = BABYLON.MeshBuilder.CreatePolyhedron(
        "poly",
        { type: 2, size: 1.5 },
        scene
    );
    poly.position = new BABYLON.Vector3(0, 5, 0);
    poly.material = checkerMat;

    /* SHADOW CASTERS */
    [box, cylinder, cone, sphere, poly].forEach(mesh => {
        shadowGenerator.addShadowCaster(mesh);
    });

    /* MOTION */
    scene.registerBeforeRender(() => {
        box.rotation.y += 0.01;
        cylinder.rotation.x += 0.01;
        poly.rotation.y += 0.02;

        // Floating effect
        poly.position.y = 5 + Math.sin(performance.now() * 0.002);
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