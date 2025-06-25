<a name="readme-top"></a>

<h1 align="center">
  <br>
  <a><img src="path/to/your/logo.png" alt="Uallapop-Logo" width="200"></a>
  <br>
  Uallapop - A Full-Stack Marketplace Platform
  <br>
</h1>

<h4 align="center">A sophisticated, full-stack clone of the Wallapop marketplace, built with a powerful and dynamic backend.</h4>

<div align="center">
  <a href="#-built-with">Built With</a> •
  <a href="#-architectural-deep-dive--technical-implementation">Architecture</a> •
  <a href="#-core-feature-engineering">Features</a>
</div>

<br>

![screenshot](path/to/your/main_screenshot.png)

---

## 🛠️ Built With

<div align="center">
  
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
<br>
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Amazon AWS](https://img.shields.io/badge/AWS-%23232F3E.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🏛️ Architectural Deep Dive & Technical Implementation

This project is a comprehensive, enterprise-grade clone of the Wallapop marketplace, engineered from the ground up. It serves as a sophisticated demonstration of full-stack development, showcasing a decoupled architecture with a Java Spring Boot backend, a dynamic React frontend, and a fully containerized environment orchestrated by Docker.

The core of the application is not just a simple CRUD interface but a complex, polymorphic system designed to handle varied and dynamic data models, mirroring the challenges of real-world, large-scale e-commerce platforms.

The architecture was deliberately chosen to be robust, scalable, and maintainable, reflecting modern software engineering best practices.

### **Backend: Java & Spring Boot**

The backend is a RESTful API built on Spring Boot, serving as the central nervous system of the application.

* **Security Framework:** Security is paramount and implemented using the **Spring Security** framework. The authentication pipeline is stateless, leveraging **JSON Web Tokens (JWT)**.
    * **Password Encryption:** User credentials are never stored in plaintext. Passwords are salted and hashed using the **BCrypt strong hashing algorithm**.
    * **JWT Lifecycle:** Upon successful login, a signed JWT is generated and sent to the client. Subsequent API requests are intercepted by a custom filter chain that validates the token's signature and expiration, populating the `SecurityContextHolder` to manage authorization for protected endpoints.

* **Data Persistence Layer:** Data management is handled by **Spring Data JPA**, acting as an abstraction over Hibernate.
    * **Repository Pattern:** The design extensively uses the repository pattern for clean separation of the data access layer.
    * **Optimized Queries:** Beyond standard CRUD operations, the application employs custom, performance-tuned JPQL and native SQL queries (`@Query`) to handle complex joins and data projections, minimizing database load. All business logic is encapsulated within `@Transactional` service methods to ensure data integrity.

* **Image Handling Strategy:** The project intentionally explores two distinct strategies for binary file storage to demonstrate a nuanced understanding of their trade-offs:
    * **Product Images (File System):** To ensure high performance and scalability, and to prevent database bloat, product images are stored in a dedicated directory on the file system. In a production environment, this approach maps directly to using a cloud storage solution like **AWS S3**.
    * **User Avatars (Database):** For experimental purposes and to demonstrate versatility, user avatars are compressed and stored as BLOBs within the MySQL database itself. This highlights an alternative strategy often considered for smaller, less frequently updated assets.

### **Frontend: React.js**

The frontend is a single-page application (SPA) built with React, developed with a focus on purity and foundational skills.

* **Custom Component Architecture:** The UI was built entirely from scratch. **No third-party component libraries** (like Material-UI or Bootstrap) were used. This decision was made to demonstrate a deep, fundamental mastery of React, state management, JSX, and advanced CSS, resulting in a pixel-perfect replica of the original Wallapop design.
* **State Management & Hooks:** The application state is managed locally within components using React Hooks (`useState`, `useEffect`). For global concerns like authentication status and user context, the **Context API** is utilized to provide a clean and efficient way to pass data through the component tree without prop drilling.
* **Asynchronous Communication:** The frontend communicates with the backend REST API asynchronously using the `Fetch API`. This includes robust logic for managing loading states, handling HTTP responses, and gracefully catching errors to ensure a smooth user experience.

### **Database: MySQL**

The relational schema was carefully designed in MySQL to support the application's complex data requirements. It features a normalized structure with foreign key constraints to maintain data integrity and is indexed on critical columns to ensure efficient query performance, especially on product search and retrieval operations.

### **Infrastructure: Docker & AWS Deployment**

* **Full Containerization:** The entire application stack—the Spring Boot backend, the React frontend (served via a lightweight web server), and the MySQL database—is fully containerized using **Docker** and orchestrated by **Docker Compose**. This encapsulates all dependencies, guarantees a consistent environment from development to production, and drastically simplifies deployment.
* **Cloud Deployment Validation:** The containerized application was successfully deployed to **Amazon Web Services (AWS)** to validate its production-readiness. The architecture utilized **Amazon ECS (Elastic Container Service)** for container orchestration and **Amazon RDS** for a managed, scalable MySQL instance, proving the portability and effectiveness of the Docker-based workflow.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ✨ Core Feature Engineering

### 1. The Dynamic Product Engine: A System That Adapts to the User

The true heart of this project is its ability to understand that selling a car is fundamentally different from posting a job or listing a smartphone. The platform was engineered from the ground up to adapt its entire workflow based on what the user is selling, creating a highly intuitive and specialized experience.

**How It Works, From the User's Perspective:**

The user's journey begins with a single, crucial choice: the product category. This choice triggers a cascade of changes across the application:

* **If the user selects "Cars":** The system immediately presents a form tailored for vehicles. It intelligently asks for details like **Brand, Model, Year, Horsepower, Mileage, and Transmission type**. It knows these are the details a car buyer needs.

* **If the user selects "Jobs":** The car-specific form disappears entirely. A new, purpose-built interface appears, asking for information relevant to a service listing, such as **Profession, Job Title, Experience Level, and Hourly Rate**.

* **If the user selects "Other Items":** The system demonstrates another layer of intelligence. It prompts the user to choose a sub-category. For example, selecting "Electronics" and then "Smartphone" will generate a form asking for **Storage Capacity, Screen Size, Color, and the product's physical condition** (e.g., "New," "Used," "Like New").

**The Intelligence Behind the Scenes:**

This isn't just a simple form with hidden fields. The application is designed as a collection of "specialists." There's a module that is an expert on cars, another on jobs, and so on. When a user picks a category, the main system acts as a manager, handing the entire process over to the correct specialist module. This specialist is responsible for:

1.  **Gathering the Right Information:** It knows exactly which data points are required for its specific category and builds the user form accordingly.
2.  **Displaying Information Correctly:** This is key. The final product page for a car will have a clean, technical specifications table. A job listing page will be formatted like a professional services ad. A smartphone page will highlight its key features. The layout and presentation are completely unique to the category.
3.  **Handling Edits Intelligently:** When a user edits a listing, the system again calls the correct specialist to present the right editing interface. You can't accidentally change a car's "horsepower" to an "hourly rate."

This design makes the platform incredibly powerful for the user and keeps the codebase clean, organized, and easy to extend. Adding a new category like "Real Estate" would simply mean building a new "specialist" module without having to overhaul the entire system.

### 2. User & Account Management: A Secure Personal Hub

Every user is given a personal and secure command center to manage their identity and market activity on the platform.

* **Secure Identity:** User accounts are the foundation of trust in the marketplace. When a user registers, their password is not stored directly. Instead, it's instantly converted into a secure, irreversible encrypted code. Login sessions are protected by a temporary "security key" (JWT) that validates every action the user takes, ensuring their account is safe. This key is designed to expire after a period of inactivity, automatically protecting users who forget to log out.
* **Personal Dashboard:** This is the user's hub for managing their listings. The system automatically queries the database and sorts their products into two clear lists: "On Sale" and "Sold." This provides an at-a-glance overview of their activity.
* **Full Control Over Listings:** From the dashboard, users have direct control. They can edit any detail of a listing, and the system will present them with the correct, category-specific form. They can also manage the status of a sale with a single click, for instance, by marking an item as "Reserved" for a potential buyer, which visually flags it across the site.

### 3. Social Engagement: Building a Community Marketplace

A marketplace thrives on interaction. This platform includes features designed to foster a sense of community and provide valuable feedback to sellers.

* **Product Popularity Metrics:** Every product listing publicly displays two key metrics: **View Count** and **Like Count**.
    * **Behind the View Count:** The system registers a "view" each time a product's detail page is visited. This gives sellers immediate, valuable insight into how much exposure their items are getting.
    * **Behind the Like System:** When a user "likes" a product, the system creates a direct link in the database between that user's profile and the specific item. This allows users to keep a personalized list of interesting products to revisit later. For sellers, this "like count" serves as a powerful social proof indicator, showing potential buyers that the item is desirable. Users can also "like" or "follow" other sellers, helping to build reputation and trust within the community.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
