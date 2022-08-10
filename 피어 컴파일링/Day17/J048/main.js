import { Restaurant } from "./restaurant.js";
import { DeliveryRestaurant } from "./deliveryRestaurant.js";

const menu = Object.freeze({
  1: { 라면: 3 },
  2: { 떡볶이: 5 },
  3: { 닭볶음탕: 15 },
  4: { 갈비찜: 20 },
});

// rl 은 메인에서 하는 쪽이 나은 듯..
const restaurant = new Restaurant(menu);
restaurant.open();

// const deliveryRestaurant = new DeliveryRestaurant(menu, 2, 3);
// deliveryRestaurant.open();
