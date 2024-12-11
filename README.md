# E-Commerce Web Application

## **Project Overview**
This project is a multi-page e-commerce web application built using **React**. It allows users to browse and purchase products online. The app provides role-based access for users and artisans (admins) with functionalities like user registration, login, shopping cart, and payment integration. The application also includes an **admin dashboard** for managing product inventory and user activity.

---

## **Features**
- **User Authentication**: Separate login and registration for users and artisans.
- **Admin Dashboard**: Artisans (admins) can manage products, users, and track orders.
- **Product Listing**: Users can browse and view details of products.
- **Shopping Cart**: Users can add, update, and remove products from the cart.
- **Payment Gateway**: Secure payment processing through Razorpay, Stripe, or PayPal.
- **Responsive Design**: The app is mobile-friendly and works on all devices.

---

## **Tech Stack**
| **Technology**   | **Usage**                          |
|-----------------|-------------------------------------|
| **React.js**     | Frontend framework for building UI. |
| **React Router** | Handles page navigation.            |
| **CSS**          | Styling for the application.        |
| **Payment Gateway** | Razorpay, Stripe, or PayPal for payments. |
| **Node.js / Express.js** | Optional for API requests. |
| **MongoDB (Optional)** | For user and product data storage. |

---

## **Project Structure**
```
├── public
├── src
│   ├── components
│   │   ├── Navbar.js
│   │   ├── Home.js
│   │   ├── ProductsList.js
│   │   ├── CartPage.js
│   │   ├── PaymentPage.js
│   │   ├── UserRegister.js
│   │   ├── UserLogin.js
│   │   └── Admin
│   │       ├── AdminRegister.js
│   │       └── Dashboard.js
│   ├── App.js
│   └── index.js
├── .gitignore
├── README.md
└── package.json
```

---

## **Installation & Setup**
To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000/`.

---

## **Available Routes**
| **Path**            | **Component**      | **Description**                    |
|--------------------|-------------------|-------------------------------------|
| `/`                 | **Home**           | The homepage of the app.             |
| `/productsList`     | **ProductsList**   | Displays all available products.    |
| `/artisian-register`| **AdminRegister**  | Artisan/admin registration.        |
| `/artisian-login`   | **ArtisianLogin**  | Login page for artisans.            |
| `/user-register`    | **UserRegister**   | User registration page.             |
| `/user-login`       | **UserLogin**      | User login page.                    |
| `/dashboard/*`      | **Dashboard**      | Dashboard for admin functionalities.|
| `/cart`             | **CartPage**       | Displays products in the cart.      |
| `/payment`          | **PaymentPage**    | Processes payments for orders.      |

---

## **Payment Gateway Integration**
The app integrates with **Razorpay, Stripe, or PayPal** for secure payments. The payment process works as follows:

1. **User Checkout**: User proceeds to the checkout page.
2. **Payment Page**: The user enters payment details and clicks "Pay Now".
3. **Payment Gateway**: Razorpay/Stripe/PayPal processes the payment.
4. **Order Confirmation**: After successful payment, the order status is updated.

### **Sample Razorpay Integration**
```javascript
const options = {
  key: 'RAZORPAY_KEY_ID',
  amount: totalAmount * 100, // Amount in paise
  currency: 'INR',
  name: 'E-Commerce Web App',
  description: 'Test Transaction',
  image: '/logo.png',
  handler: function (response) {
    console.log(response);
  },
  prefill: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    contact: '9999999999'
  },
  theme: {
    color: '#3399cc'
  }
};

const paymentObject = new window.Razorpay(options);
paymentObject.open();
```

---

## **How to Contribute**
1. **Fork the repository**.
2. **Create a feature branch**:
   ```bash
   git checkout -b feature-name
   ```
3. **Make changes and commit**:
   ```bash
   git commit -m "Added a new feature"
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature-name
   ```
5. **Submit a pull request**.

---

## **Known Issues & Possible Improvements**
- **Add Toast Notifications**: Display success/error messages for login, payments, etc.
- **Wishlist**: Allow users to save items for later purchase.
- **Loading Indicators**: Add loading animations during API requests.
- **Order History**: Let users view past orders.

---

## **Contact**
If you have any questions, feel free to contact the developer.

**Author**: Gangeswaran  
**Email**: gangeswaran375@gmail.com  
**GitHub**: https://github.com/gangeswaran

---

**License**  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

