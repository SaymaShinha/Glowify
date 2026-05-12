
# Admin login
### email: admin@gmail.com
### password: admin

# User login
### email: user@gmail.com
### password: user



# Glowify

# 1. Glowify – Software Requirements Specification (SRS)

## 1. Project Overview

**Project Name:** Glowify

**Type:** Cosmetic & Skincare eCommerce Platform

**Tech Stack:** MERN (MongoDB, Express.js, React/Next.js, Node.js)

### Objective

A modern skincare eCommerce platform focused on:

- Personalized skincare shopping
- Clean & minimal UI experience
- Secure authentication system
- Admin inventory & order management

---

## 2. User Roles

### 2.1 Guest User

- Browse products
- View product details
- Filter by category / skin type
- Cannot purchase

---

### 2.2 Customer (Authenticated User)

- Add to cart & checkout
- Save skincare preferences (skin type)
- Manage profile & addresses
- View order history

---

### 2.3 Admin

- Manage products & categories
- Manage orders
- Manage users

---

## 3. Functional Requirements

---

## 3.1 Home Page

### Features

- Hero banner (skincare promo)
- Categories (Cleanser, Serum, Moisturizer, Sunscreen)
- Featured products
- Discount section

### Functionalities

- Product listing via API
- Category + skin type filtering
- Responsive UI

---

## 3.2 Authentication System

### Pages

- Login
- Register

### Features

- JWT authentication
- Role-based access (Admin/User)
- Password hashing (bcrypt)

---

## 3.3 Product Module

### Product List

- Grid view
- Filters:
    - Category
    - Skin type (oily, dry, combination)
    - Price

### Product Details

- Image gallery
- Ingredients list
- Skin type compatibility
- Add to cart

---

## 3.4 Cart & Checkout

### Features

- Add/remove items
- Update quantity
- Price calculation

### Checkout

- Shipping address
- Order confirmation

---

## 3.5 User Dashboard

### Sections

**Order History**

- View past orders
- Status (Pending, Delivered, Cancelled)

**Profile Settings**

- Update personal info
- Save skin type
- Address management

---

## 3.6 Admin Dashboard

### Overview

- Total products
- Low stock alert
- New orders

---

### Products Management

- Create / Update / Delete
- Upload product images
- Manage stock
- Add ingredients info

---

### Categories Management

- Create / Edit category
- Assign products

---

### Orders Management

- View all orders
- Update status

---

### Users Management

- View users
- Track activity

---

## 4. Database Design (MongoDB)

### Users

```
{
name,
email,
password,
skinType: "oily" | "dry" | "combination",
role: "user" | "admin",
addresses: [],
createdAt
}
```

---

### Products

```
{
name,
price,
discount,
category,
skinType,
ingredients: [],
stock,
images: [],
description
}
```

---

### Orders

```
{
userId,
items: [{ productId, quantity }],
totalPrice,
status,
shippingAddress,
createdAt
}
```

---

### Categories

```
{
name,
description,
image
}
```

---

## 5. API Structure

### Auth

- POST /api/auth/register
- POST /api/auth/login

---

### Products

- GET /api/products
- GET /api/products/:id
- POST /api/products (admin)

---

### Orders

- POST /api/orders
- GET /api/orders/user
- GET /api/orders (admin)

---

### Users

- GET /api/users
- PUT /api/users/profile

---

## 6. Security Requirements

- JWT authentication
- Password hashing (bcrypt)
- Role-based authorization
- Rate limiting

---

## 7. Non-Functional Requirements

### Performance

- Optimized image loading

### Responsiveness

- Mobile-first design

---

## 8. UI/UX Requirements

- Soft pastel color palette
- Clean minimal layout
- Smooth transitions
- Skincare-focused branding

---

## 9. Suggested Folder Structure

### Backend

```
/src
  /controllers
  /models
  /routes
  /middlewares
  /utils
```

---

### Frontend (Next.js)
