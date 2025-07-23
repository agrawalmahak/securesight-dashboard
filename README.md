
# SecureSight Dashboard - Technical Assessment

A full-stack dashboard for the fictional CCTV monitoring software, SecureSight. This application allows users to view, manage, and analyze security incidents from multiple camera feeds in real-time.

**Live URL:** [Vercel Deployment](https://securesight-dashboard-ucxi.vercel.app/)

-----

## ✨ Features

  * **Dynamic Video Player:** Features a main player that displays a unique video for each incident, along with two secondary video feeds for situational awareness.
  * **Animated Incident List:** A fully interactive list where incidents can be selected with smooth entrance animations.
  * **Responsive Design:** The layout adapts for a seamless experience on both desktop and mobile devices.
  * **Interactive Timeline (Extra Credit):** A timeline at the bottom visualizes all incidents over a 24-hour period. Clicking a marker on the timeline updates the entire UI.

> **Note on "Resolve" Functionality:** The "Resolve Incident" feature, including its API route and UI button, was fully implemented but temporarily disabled due to a persistent, environment-specific build error on Vercel. The working code for this feature can be reviewed in the project's Git history.

-----

## 🛠️ Tech Decisions

  * **Framework:** **Next.js 15 (App Router)** was used as required, providing a modern full-stack environment.
  * **Database & ORM:** **Neon (Serverless Postgres)** with **Prisma** was chosen for its scalability and compatibility with serverless environments like Vercel.
  * **Styling:** **Tailwind CSS** was used for its utility-first approach, enabling the rapid development of the custom and responsive design.
  * **Animation:** **Framer Motion** was used to add professional entrance animations and smooth layout transitions.

-----

## 🚀 Deployment Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/agrawalmahak/securesight-dashboard.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd securesight-dashboard
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**
      * Create a file named `.env` in the root of the project.
      * Add your Neon database connection string to it:
        ```env
        DATABASE_URL="postgresql://user:password@..."
        ```
5.  **Sync and seed the database:**
    ```bash
    npx prisma db push
    npx prisma db seed
    ```
6.  **Run the development server:**
    ```bash
    npm run dev
    ```

-----

## 🔮 If I Had More Time…

  * **Real-time Updates:** Implement WebSockets to push new incidents to clients in real-time.
  * **Full Timeline Interactivity:** Add drag-to-scrub functionality to the timeline.
  * **Authentication:** Implement a full user login system using NextAuth.js.
  * **Testing:** Write unit and integration tests with Jest and React Testing Library.