var cart = new Map();

function addToCart(productId) {
  const productQuantity = cart.get(productId) ?? 0;
  cart.set(productId, productQuantity + 1);
}

function removeFromCart(productId) {
  const productQuantity = cart.get(productId);
  if (!productQuantity) {
    return;
  }
  if (productQuantity > 1) {
    cart.set(productId, productQuantity - 1);
  } else {
    cart.delete(productId);
  }
}

addToCart("a");
addToCart("b");
addToCart("b");
addToCart("c");

addToCart("d");
addToCart("d");
removeFromCart("c");
removeFromCart("b");

console.log(cart);
