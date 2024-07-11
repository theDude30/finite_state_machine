
import React from "react";
import { Button, Input, Select } from "antd"


const MONTHS = [1,2,3,4,5,6,7,8,9,10,11,12].map(elem=>({value:elem,label:elem}));
const YEARS = [1,2,3,4,5,6,7,8,9,10,11,12].map(elem=>({value:2024+elem,label:2024+elem}));


export default function AddPaymentMethod({onSuccess}){
    const creditNumber = React.createRef();

    const addPaymentMethod=async () => {
            console.log("creditNumber.current.input.value = ",creditNumber.current.input.value)
            await localStorage.setItem('hasPayment',creditNumber.current.input.value);
            onSuccess();
    }


    return  <form onSubmit={addPaymentMethod} role="form">
                <p>Enter your payment details to add a new card.</p>
                <div>
                    <span >card Number</span>
                    <Input type='text'  style={{paddindRight:10}} ref={creditNumber} data-testid="card-number-input"/>
                </div>
                <div style={{marginTop:10}}>
                    <span>Expiration</span>
                </div>
                <Select  defaultValue="Month"  style={{ width: 120, marginRight:10}}
                options={MONTHS}/>
                <Select defaultValue="Year" style={{ width: 120}}
                options={YEARS} />
                <p style={{marginBottom:0}}>CVV</p>
                <Input  type='text' style={{width:100}} data-testid="cvv-input"></Input>
                <div style={{float:"right",paddingTop:20}}>
                    <Button type="primary" htmlType="submit" >Add Payment</Button>
                </div>
            </form>
}
