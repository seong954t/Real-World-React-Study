import React from "react";

export default class Loading extends React.Component<any, any> {
    render() {
        return (
            <div className="text-center m-4">
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}