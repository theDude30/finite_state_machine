
import React,{useRef} from "react"
import {Button} from 'antd';

export default function PlaceBidForm({onSubmit}) {
    const bidInputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(bidInputRef.current.value);
    }


    return <form onSubmit={handleSubmit}>
        <input type="number" ref={bidInputRef} placeholder="Enter your bid" required/>
        <Button type="primary" htmlType="submit">Place Order</Button>
    </form>
}
