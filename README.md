# Next.js Fullstack Video Platform

A fully functional, media-focused full-stack web application built using **Next.js (App Router)**. This platform enables users to register, log in, and upload videos seamlessly, utilizing **ImageKit** for optimized media delivery and storage. 

## 🚀 Key Features

*   **Robust Authentication:** Secure user registration and authentication enabled by NextAuth.js.
*   **Media Management:** Seamless video uploads and optimized video/image delivery powered by ImageKit.
*   **Database Integration:** MongoDB paired with Mongoose for structured, reliable data storage.
*   **Modern UI/UX:** Styled using Tailwind CSS v4 with clean, scalable icons from Lucide React.
*   **API Routes:** Built-in backend endpoints managed natively via Next.js.

## 🛠️ Technology Stack

*   **Frontend:** [Next.js](https://nextjs.org/) (React 19), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
*   **Database:** [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/)
*   **Media & Storage:** [ImageKit](https://imagekit.io/) (`@imagekit/next`)

## ⚙️ Getting Started

### Prerequisites
*   Node.js
*   MongoDB Database URI
*   ImageKit URL, Public Key, and Private Key

### Installation

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following keys:
    ```env
    MONGODB_URI=your_mongodb_uri
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
