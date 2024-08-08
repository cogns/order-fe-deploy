function initState(){
    return{
        //역직렬화 
        productInCart: JSON.parse(localStorage.getItem('productInCart')) ||[],
        totalQuantity: localStorage.getItem('totalQuantity') || 0,

    }
}



const practice={
    state: initState,
    mutations:{
        addCart(state, product){
            const existProduct = state.productInCart.find(p => p.id == product.id);
            if(existProduct){
                existProduct.quantity += product.quantity;
            }else{
                state.productInCart.push(product);
            }
            state.totalQuantity = parseInt(state.totalQuantity) + product.quantity;
            // 로컬스토리지에 데이터 직렬화하여 삽입
            localStorage.setItem('productInCart', JSON.stringify(state.productInCart));
            localStorage.setItem('totalQuantity', state.totalQuantity);
        },
        clearCart(state){
            state.productInCart = [];
            state.totalQuantity =0;
            localStorage.removeItem('productInCart');
            localStorage.removeItem('totalQuantity');
        }
    },
    actions:{
        addCart(context, product){
            context.commit('addCart', product);
        },
        clearCart(context){
            context.commit('clearCart');
        }
    },
    getters:{
        getTotalQuantity: state => state.totalQuantity,
        getProductInCart: state => state.productInCart
    }

}
export default practice;