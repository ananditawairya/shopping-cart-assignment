export function addItemToCart(data,cartData){
    const {id:pid,stock } = data;
    let status = 'Success'
    let quantity=1;
    let currentStock=stock-1;
    if(cartData[pid]){
        console.log("old item",cartData[pid]['stock'],data['stock']);
      if(cartData[pid]['stock']>0  ){
          quantity=cartData[pid]['quantity']+1
          currentStock=cartData[pid]['stock']-1;
      }else{
        //let tempData={...cartData};
        status = 'Failed'
        console.log("Stock Exausted!")
        return {'newCartData':cartData,'status':status}
      }
    }
      let tempData={...cartData,[pid]:{...data,['quantity']:quantity,['stock']:currentStock}};
      return {'newCartData':tempData,'status':status}
}

export function removeItemFromCart(data,cartData){
  const {id:pid,stock,quantity } = data;
  let currentQuantity=quantity-1;
  let currentStock=stock+1;
  console.log("old item",cartData[pid]['stock'],data['stock'],"quantity : ", currentQuantity,"stock : ", currentStock, typeof currentQuantity, typeof currentStock);
  let tempData={...cartData,[pid]:{...data,['quantity']:currentQuantity,['stock']:currentStock}};
    if(currentQuantity===0  )
      delete tempData[pid]
  return {'newCartData':tempData};


}
