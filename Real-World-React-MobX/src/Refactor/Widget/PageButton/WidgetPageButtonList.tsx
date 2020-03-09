import React, {HTMLAttributes, MouseEventHandler} from "react";
import {WidgetPageButtonItem} from "./WidgetPageButtonItem";
import {observer} from "mobx-react";
import {observable} from "mobx";
import "./WidgetPageButtonList.less";

interface Props {
    className?: string,
    color?: string,
    onButtonItemClick?: MouseEventHandler<HTMLButtonElement>,
    from: number,
    to: number
}

@observer
export class WidgetPageButtonList extends React.Component<Props> {

    @observable selected:number;

    constructor(props: Props) {
        super(props);
        this.selected = this.props.from;
    }

    range = (from: number, to: number) => {
        return Array.from({length: to - from + 1}, (_, i) => from + i);
    }


    pageButtonItems = () => {
        const {from, to, color} = this.props;

        return this.range(from, to).map((index) => {
            return <WidgetPageButtonItem onClick={this.clickHandler} color={color || ''} uid={index}
                                         active={this.selected === index}>{index}</WidgetPageButtonItem>
        })
    };

    clickHandler = (e: any) => {
        if(this.props.onButtonItemClick){
            this.props.onButtonItemClick(e);
        }
        this.selected = e.uid;
    }

    render() {
        return (
            <div className={`page-button-list ${this.props.className || ''}`}>
                {this.pageButtonItems()}
            </div>
        );
    }
}