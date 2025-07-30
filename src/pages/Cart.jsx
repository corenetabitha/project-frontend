import CartSection from '../components/CartSection';

function Cart() {
  return (
    <div className="p-8">
      <h1 className="text-3xl text-orange-600 font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <CartSection type="purchase" />
        <CartSection type="borrow" />
      </div>
    </div>
  );
}

export default Cart;