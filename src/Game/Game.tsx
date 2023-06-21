import React from "react";
import {createRoot} from "react-dom/client";
import GameUI from "./UI/GameUI";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

interface IGameProps {

}

class Game extends React.PureComponent<IGameProps> {
    public static instance: Game | null = null;

    canvasContainerRef = React.createRef<HTMLDivElement>();

    renderer: THREE.WebGLRenderer | null = null;

    width: number = 0;
    height: number = 0;
    needsUpdateSize: boolean = true;

    scene: THREE.Scene | null = null;

    camera: THREE.PerspectiveCamera | null = null;

    cameraController: OrbitControls | null = null;

    constructor(props: IGameProps) {
        super(props);
        if (Game.instance != this) {
            Game.instance = this;
        } else {
            console.log("Game.instance is this!!");
        }
    }

    render() {
        return (<React.Fragment>
            <div ref={this.canvasContainerRef}
                 style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%"}}>
            </div>
            <GameUI/>
        </React.Fragment>);
    }

    componentDidMount() {
        // console.log(this.canvasContainerRef);

        this.initialize().then();

        setTimeout(() => {
            window.postMessage({
                type: "CloseAppLoadingUI",
            });
        }, 100);
    }

    initialize = async () => {
        if (this.renderer !== null) return;

        if (!this.canvasContainerRef.current) return;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,

        });

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#b4b4b4");
        this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 500);
        this.scene.add(this.camera);
        this.camera.position.set(0, 0, 5);
        this.cameraController = new OrbitControls(this.camera, this.renderer.domElement);
        this.cameraController.enableDamping = true;
        this.cameraController.dampingFactor = 0.05;
        this.cameraController.minDistance = 2;
        this.cameraController.maxDistance = 20;
        this.cameraController.minPolarAngle = Math.PI * 0.1;
        this.cameraController.maxPolarAngle = Math.PI * 0.9;
        this.cameraController.update();

        let ambientLight = new THREE.AmbientLight("#666", 1);
        this.scene.add(ambientLight)
        // let hemisphereLight = new THREE.HemisphereLight("#fff", "#888", 1);
        // this.scene.add(hemisphereLight);
        let light = new THREE.DirectionalLight("#fff", 1);

        this.camera.add(light);
        light.position.set(-2, 5, 0);

        light.target.position.set(0, 0, 0);

        console.log(light);

        let plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 1, 1, 1), new THREE.MeshStandardMaterial({
            color: "#fff"
        }));
        let sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), new THREE.MeshStandardMaterial({
            color: "#4efcd9",
            roughness: 0.1,
            wireframe: false,
        }));

        this.scene.add(plane, sphere);

        const resizeObserver = new ResizeObserver(this.onContainerSizeChange);
        resizeObserver.observe(this.canvasContainerRef.current);

        this.canvasContainerRef.current.appendChild(this.renderer.domElement);

        this.renderer.setAnimationLoop(this.rendererAnimationLoop);
    }

    updateSize = (width: number, height: number) => {
        if (this.width === width && this.height === height) return;
        this.width = width;
        this.height = height;
        this.needsUpdateSize = true;
    };

    onContainerSizeChange = (entries: ResizeObserverEntry[]) => {
        entries.forEach(entry => {
            this.updateSize(entry.contentRect.width, entry.contentRect.height);
        });
    };

    rendererAnimationLoop = (time: number, frame: XRFrame) => {
        if (this.needsUpdateSize) {
            if (this.camera) {
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();
            }
            this.renderer?.setSize(this.width, this.height);
            this.needsUpdateSize = false;
        }
        // console.log("time",time);

        this.cameraController?.update();
        this.renderer?.render(this.scene!, this.camera!);
    };
}

const root = createRoot(document.getElementById("app-container") as Element);
root.render(<Game/>);

export default Game;

