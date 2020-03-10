import React from "react";
import "./WidgetLoading.less";

export enum LoadingSize {
    SM = "SM",
    LG = "LG"
}

interface Props {
    className?: string,
    loadingSize?: LoadingSize
}

export class WidgetLoading extends React.Component<Props>{
    render() {
        const spinnerType = this.props.loadingSize === LoadingSize.SM ? "sm-spinner-border" : "";
        return (
            <div className={`spinner-border ${spinnerType} ${this.props.className}`} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
}