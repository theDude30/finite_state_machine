
import { Input, Modal, Select } from "antd"


const MONTHS = [1,2,3,4,5,6,7,8,9,10,11,12].map(elem=>({value:elem,label:elem}));
const YEARS = [1,2,3,4,5,6,7,8,9,10,11,12].map(elem=>({value:2024+elem,label:2024+elem}));


export default function AddPaymentMethod(){
    return  <Modal title="Add Payment Method" open onOk={()=>alert('ddd')} onCancel={()=>alert('ddd')} >
            <p>Enter your payment details to add a new card.</p>
            <div>
                <span >card Number</span>
                <Input type='text'  style={{paddindRight:10}}/>
            </div>
            <div style={{marginTop:10}}>
                <span>Expiration</span>
            </div>
            <Select  defaultValue="Month"  style={{ width: 120, marginRight:10}}
            options={MONTHS}/>
            <Select defaultValue="Year" style={{ width: 120}}
            options={YEARS} />

             <p style={{marginBottom:0}}>CVV</p>
            <Input  type='text' style={{width:100}}></Input>
  </Modal>
}
