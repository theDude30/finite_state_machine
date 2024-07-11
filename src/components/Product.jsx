
import { Divider, Flex,Button } from "antd";
import productImage from '../assets/product-image.webp';
import sellerImg from '../assets/seller_img.jpeg';
import './Product.css'

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


export default function Product({product,onBidButtonClick}) {
    return (
    <Flex gap="middle" className="product_container">
            <div className="img_container">
            <img src={productImage} className="product_img"/>
            </div>
            <div className="product_details">
                <span className="title" >{product.title}</span>
                <Divider className="divider" />
                <Seller seller={product.seller}/>
                <div className="auction_info">
                    <AuctionInformation price={product.price} bidCount={product.bidCount} />
                </div>
                <Button type="primary" className="place_bid_btn" onClick={onBidButtonClick}><h3 className="place_bid_btn_label">place bid</h3></Button>
            </div>
    </Flex>)
}
