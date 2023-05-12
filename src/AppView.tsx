import {PureComponent, RefObject} from "react";
import * as React from "react";
import * as BABYLON from "babylonjs";

interface AppViewProps {
    id: string;
}

class AppView extends PureComponent<AppViewProps> {
    canvasRef: RefObject<HTMLCanvasElement>;

    engine: BABYLON.Engine | null = null;

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

        this.engine = new BABYLON.Engine(this.canvasRef.current,true,{
            antialias:true,

        })

    }
}

export default AppView;