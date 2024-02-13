import { Products, ShippingInfo, User } from "./types";

export interface MessageResponse {
    success: boolean;
    message: string;
}

export interface UserResponse {
    success: boolean;
    user: User;
}

export interface Productresponse {
    success: boolean;
    products: Products[];
    productsCount: number;
    resultPerPage: number;
    filteredProductCount: number;
}

export interface ProductDetailsResponse {
    success: boolean;
    product: Products;
}

export interface ReviewResponseInterface {
    success: boolean;
}

interface BodyData {
    comment: string;
    productId: string;
    rating: number;
}

export interface ReviewBodyData {
    myForm: BodyData;
    userId: string
}

export interface DashboardResponse {
    success: boolean;
    productCount: number;
    userCount: number;
    orderCount: number;
    totalAmount: number;
    inStock: number;
    outOfStock: number;
}

//Admin all products

export interface Review {
    user: string;
    name: string;
    rating: number;
    comment: string;
    _id: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    ratings: number;
    image: string;
    category: string;
    stock: number;
    numberOfReviews: number;
    returnDays: number;
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AdminAllProductResponse {
    success: boolean;
    products: Product[];
}

export interface UpdateProductBody {
    name: string;
    category: string;
    stock: number;
    price: number;
    image: string;
    returnDays: number;
    description: string;
}

export interface UpdateProductData {
    myForm: UpdateProductBody;
    userId: string;
    id: string;
}
export interface AddProductData {
    myForm: UpdateProductBody;
    userId: string;
}
export interface DeleteProductData {
    id: string;
    userId: string;
}

export interface GetAdminUsersResponse {
    success: boolean;
    users: User[];
}

//Order
export interface OrderItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: string;
    returnDays: number;
}

export interface Order {
    orderItems: OrderItem[];
    paymentMethod: string;
    itemsPrice: number;
    deliveryCharge: number;
    totalPrice: number;
    shippingInfo: ShippingInfo;
}

export interface OrderCodBody {
    myForm: Order;
    userId: string;
}

export interface OrderResponse {
    success: boolean;
    message: string;
}

interface PaymentVerificationForm {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    orderOptions: Order
}

export interface PaymentVerification {
    myForm: PaymentVerificationForm;
    userId: string;
}

interface PaymentInfo {
    _id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export interface OrderDetailResponse {
    success: boolean;
    order: {
        shippingInfo: ShippingInfo;
        _id: string;
        orderItems: OrderItem[];
        user: User;
        itemsPrice: number;
        deliveryCharge: number;
        totalPrice: number;
        paymentMethod: string;
        paymentInfo: PaymentInfo;
        paidAt: string;
        orderStatus: string;
        returnDate: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}

export interface GetAllOrderData {
    success: boolean;
    totalAmount: number;
    orders: {
        shippingInfo: {
            roomNumber: string;
            hostel: string;
            phoneNo: string;
        };
        _id: string;
        orderItems: {
            name: string;
            price: number;
            quantity: number;
            image: string;
            product: string;
            _id: string;
        }[];
        user: {
            _id: string;
            name: string;
            email: string;
        };
        itemsPrice: number;
        deliveryCharge: number;
        totalPrice: number;
        paymentMethod: string;
        paymentInfo: {
            _id: string;
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
        };
        paidAt: string;
        orderStatus: string;
        returnDate: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }[];
}

export interface GetMyOrderData {
    success: boolean;
    orders: {
        _id: string;
        shippingInfo: {
            roomNumber: string;
            hostel: string;
            phoneNo: string;
        };
        orderItems: {
            name: string;
            price: number;
            quantity: number;
            image: string;
            product: string;
            _id: string;
        }[];
        user: {
            _id: string;
            name: string;
            email: string;
        };
        itemsPrice: number;
        deliveryCharge: number;
        totalPrice: number;
        paymentMethod: string;
        paymentInfo?: {
            _id: string;
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
        };
        paidAt?: string;
        orderStatus: string;
        returnDate: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }[];
}

export interface DeleteOrderResponse{
    success: boolean;
}