import {createRoot} from "react-dom/client";
import * as React from "react";
import "./App.scss";
import AppView from "./AppView";
import AppUI from "./AppUI";

class App extends React.PureComponent {
    render() {
        return (<div className={"app-root fill-parent"}>
            <AppView id={"001"}/>
            <AppUI/>
        </div>);
    }

    componentDidMount() {
        setTimeout(() => {
            window.postMessage({
                type: "CloseAppLoadingUI",
            });
        }, 1);
    }
}

const appContainer = createRoot(document.getElementById("app-container") as Element);

appContainer.render(<App/>);