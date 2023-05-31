import {PureComponent, RefObject} from "react";
import * as React from "react";
import {ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, Vector3} from "babylonjs";

interface AppViewProps {
    id: string;
}

class AppView extends PureComponent<AppViewProps> {
    canvasRef: RefObject<HTMLCanvasElement>;

    engine: Engine | null = null;

    constructor(props: AppViewProps) {
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    render() {
        return (<canvas className={"fill-parent"} id={"main-canvas"} ref={this.canvasRef}/>);
    }

    componentDidMount() {
        console.log(this.canvasRef.current);

        this.initializeEngine();
    }

    initializeEngine() {
        if (this.engine != null) {
            console.log("initialized!!!!")
            return;
        }

        this.engine = new Engine(this.canvasRef.current, true, {
            antialias: true,
        });

        const scene = new Scene(this.engine, {});
        const camera = new ArcRotateCamera("MainCamera", Math.PI * (20 / 180), Math.PI * (80 / 180), 10, Vector3.Zero(), scene);

        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvasRef.current, true);

        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        const sphere = MeshBuilder.CreateSphere("sphere", {
            diameter: 1,
            segments: 32,
        }, scene);

        // sphere.position.y = 0;

        const ground = MeshBuilder.CreateGround("ground", {width: 6, height: 3}, scene);
        ground.position.y = -0.5;

        this.engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", () => {
            this.engine?.resize();
        });
    }
}

export default AppView;