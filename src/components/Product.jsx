
import { Divider, Flex,Button } from "antd";
import productImage from '../assets/product-image.webp';
import sellerImg from '../assets/seller_img.jpeg';

function Seller({seller}){
    return (<div>
        <img src={sellerImg} style={{float: "left", padding: 10,width:50}}/>
        <div style={{display: "grid",lineHeight: "normal"}}>
        <div style={{float:"left",textAlign: "left",paddingLeft:10}}>
            <span style={{color:"black",fontWeight:"bold",textDecoration: "underline"}}>{seller.name}</span>
            <span>({seller.rating})</span>
        </div>
        <div style={{float:"left",textAlign: "left"}}>
            <span style={{color:"black",textDecoration: "underline",paddingLeft:10}}>Seller's other items</span>
        </div>
        <Divider style={{margin: 10,width: "100%"}}/>
    </div>
</div>
)}

function AuctionInformation({price,bidCount}){
    return  <div style={{textAlign:"left"}}>
    <h2>{price}</h2>
    <span style={{textDecoration:"underline"}}>{bidCount} bids</span>
  <span style={{marginLeft:10,color: "grey"}}>Ends in 3d 9hSaturday, 03:36 AM</span>
</div>
}


export default function Product({product}) {
    return (
    <Flex gap="middle"  style={{width: "100%"}}>
            <div style={{width: "25%"}}>
            <img src={productImage} style={{width: "100%"}}/>
            </div>
            <div style={{width: "75%"}}>
                <span style={{fontWeight: "bold",float: "left",padding: 10,lineHeight:"normal"}}>{product.title}</span>
                <Divider style={{margin: 10}}/>
                <Seller seller={product.seller}/>
                <div style={{lineHeight: "normal",marginLeft:10}}>
                <AuctionInformation price={product.price} bidCount={product.bidCount} />
                </div>
                <Button type="primary" style={{minWidth: "70%",minHeight: 48,margin:40,float: "left"}}><h3 style={{fontSize:16}}>place bid</h3></Button>
            </div>
    </Flex>)
}
