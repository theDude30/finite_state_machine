
import React,{useRef} from "react"
import {Button,Input} from 'antd';

export default function PlaceBidForm({onSubmit}) {
    const bidInputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(bidInputRef.current.value);
    }


    return <form onSubmit={handleSubmit}>
    <h3>Place Your bid</h3>
    <div style={{display: "flex"}}>
        <Input ref={bidInputRef} type="number" placeholder="Enter your bid" required/>
        <Button type="primary" htmlType="submit" style={{paddingRight:10}}>Place Order</Button>
    </div>
    </form>
}
