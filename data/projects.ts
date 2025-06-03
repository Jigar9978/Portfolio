export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  fullDescription: string
  image: string
  gallery: string[]
  videoUrl?: string
  videoType?: "mp4" | "youtube" | "vimeo"
  technologies: string[]
  github?: string // Make optional with ?
  live?: string // Make optional with ?
  category: string
  duration: string
  team: string
  status: string
  year: string
  featured: boolean
  challenges: string[]
  features: string[]
}

export const projectsData: Project[] = [
  {
  id: 1,
  title: "GetMyPass – Event Ticketing Platform",
  subtitle: "Smart event management and digital ticketing solution",
  description:
    "GetMyPass is a full-stack web application designed for seamless event creation, category management, and secure digital ticketing, with a powerful admin interface and mobile-optimized experience.",
  fullDescription: `GetMyPass is a modern event ticketing platform built using the MERN stack and Next.js App Router. It allows event organizers to create and manage categories and events while users can browse and book tickets digitally.

Key modules include:
• Admin panel to manage event categories and events (with images, icons, dates, tickets, etc.)
• Cloudinary integration for efficient image storage and delivery
• OTP-based secure login via Twilio for user authentication
• Dynamic and responsive UI for both desktop and mobile devices
• Digital ticket generation system for paperless entry
• MongoDB-based flexible schema to store nested events inside categories
• Real-time updates on category or event changes using client-side revalidation

This project was built for academic purposes during BCA and showcases skills in authentication, CRUD operations, REST APIs, and cloud image handling. It has a professional-grade UI with scalable backend logic and modular code structure.`,
  image: "/getmypass.jpeg", // <-- Replace with actual main image link
  gallery: [
    "/getmypass.jpeg",
    "/getmypass/getmypass-1.png",
    "/getmypass/getmypass-2.png",
    "/getmypass/getmypass-3.png",
    "/getmypass/getmypass-4.png",
  ],
  videoUrl: "/getmypass/getmypass-demo.mp4",
  videoType: "mp4",
  technologies: [
    "Next.js 15",
    "Node js",
    "MongoDB Atlas",
    "Tailwind CSS",
    "Twilio",
    "Cloudinary",
    "Vercel",
    "Shadcn/UI",
  ],
  github: "https://github.com/Jigar9978/GetMyPass", 
  live: "https://get-my-pass.vercel.app", 
  category: "Full Stack",
  duration: "2 months",
  team: "Team Project",
  status: "Completed",
  year: "2024 & 2025",
  featured: true,
  challenges: [
    "Implementing nested MongoDB schema to store events inside categories",
    "Handling image uploads via Cloudinary in Vercel environment",
    "Integrating secure OTP login via Twilio API",
    "Ensuring responsive layout for mobile devices",
  ],
  features: [
    "Category and Event CRUD management",
    "Twilio-based phone number OTP login",
    "Cloudinary image handling with preview",
    "Mobile-responsive admin and user UI",
    "Digital ticketing system",
    "MongoDB nested document structure",
    "Vercel deployment optimized for Next.js App Router",
    "Separate admin panel and public-facing pages",
  ],
},
{
  id: 2,
  title: "SplitMate – Group Expense Splitter",
  subtitle: "Simplified group expense tracking and settlement app",
  description:
    "SplitMate is a mobile-first React Native app designed to manage group expenses easily, allowing users to track who paid what and calculate who owes whom.",
  fullDescription: `SplitMate is a lightweight yet powerful mobile app built using React Native CLI that helps groups track shared expenses and settle up easily. Ideal for trips, roommates, or group events.

Key modules include:
• Group creation with members
• Expense tracking with payer and shared members
• Automatic calculation of who owes whom
• Local storage with AsyncStorage for offline data persistence

This project is developed for job preparation and showcases skills in React Native, AsyncStorage, navigation, component reusability, state management, and mobile UI design. It offers a clean, modern interface with practical features inspired by apps like Splitwise.`,
  image: "/splitmate/splitmate-main.jpg", // <-- Replace with actual image link
  gallery: [
    "/splitmate/splitmate-main.jpg",
    "/splitmate/splitmate-1.jpg",
    "/splitmate/splitmate-2.jpg",
    "/splitmate/splitmate-3.jpg",
  ],
  videoUrl: "/splitmate/splitmatevideo.mp4", // optional
  videoType: "mp4",
  technologies: [
    "React Native CLI",
    "JavaScript",
    "AsyncStorage",
    "React Navigation",
    "Native Modules",
    "Android Studio"
  ],
  github: "https://github.com/Jigar9978/SplitMate-Group-Expense-Splitter-App-", 
  live: "", 
  category: "Mobile App",
  duration: "1 weeks",
  team: "Solo Project",
  status: "Completed",
  year: "2025",
  featured: true,
  challenges: [
    "Implementing accurate logic for expense splitting and settlements",
    "Managing local storage for offline persistence",
    "Creating clean and dynamic UI for group and expense screens",
    "Debugging device-specific React Native issues"
  ],
  features: [
    "Create and manage multiple groups",
    "Add members to each group",
    "Add shared expenses with payer and split logic",
    "View summary of who owes whom",
    "Local storage using AsyncStorage",
    "Mobile-friendly, responsive UI",
    "Simple and intuitive user experience"
  ],
},
{
  id: 3,
  title: "MediMate – Medicine Reminder App",
  subtitle: "Timely medicine reminders with tracking and history",
  description:
    "MediMate is a React Native CLI app designed to help users manage their daily medicine schedules with timely notifications and track their intake history.",
  fullDescription: `MediMate is a simple yet effective mobile application built using React Native CLI that reminds users to take their medicines on time and helps track whether the medicine was taken or missed.

Key modules include:
• Adding medicines with name, time (morning/evening), and schedule
• Timely local notifications using Notifee
• User response tracking via notification actions (Yes/No)
• History screen to view taken/missed medicines
• Local data storage using AsyncStorage

This project is part of job preparation and demonstrates skills in React Native CLI, notification integration, local storage, time-based scheduling, and UI/UX design. The app provides a clean, user-friendly interface with practical use cases for daily life.`,

  image: "/madimate/madimate-main.png", // <-- Replace with actual image link
  gallery: [
    "/madimate/madimate-main.png",
    "/madimate/madimate-1.jpg",
    "/madimate/madimate-2.jpg",
    "/madimate/madimate-3.jpg",
    "/madimate/madimate-4.jpg"
  ],
  videoUrl: "/madimate/madimatevideo.mp4", // optional
  videoType: "mp4",
  technologies: [
    "React Native CLI",
    "JavaScript",
    "AsyncStorage",
    "Notifee",
    "React Navigation",
    "Android Studio"
  ],
  github: "https://github.com/Jigar9978/MediMate---Medicine-Reminder-App", 
  live: "", 
  category: "Mobile App",
  duration: "1 week",
  team: "Solo Project",
  status: "Completed",
  year: "2025",
  featured: true,
  challenges: [
    "Scheduling precise medicine reminders using Notifee",
    "Handling notification actions and tracking user responses",
    "Maintaining accurate history of taken/missed medicines",
    "Building a clean and simple UI for ease of use"
  ],
  features: [
    "Add medicines with scheduled times (morning/evening)",
    "Receive timely local notifications for each dose",
    "Respond via notification actions (Yes/No)",
    "Track medicine intake history in a dedicated screen",
    "Data stored locally with AsyncStorage",
    "Simple, clean, and responsive mobile UI",
    "Works offline without any login/signup"
  ],
},
{
  id: 4,
  title: "Figma to CSS – Responsive Home Page",
  subtitle: "Responsive landing page built from Figma design",
  description:
    "Converted a Figma-designed home page into a fully responsive layout using HTML and CSS with proper mobile and tablet breakpoints.",
  fullDescription: `This project involved building a pixel-perfect, responsive **Home Page** from a given Figma design. The focus was on layout accuracy, typography matching, and responsiveness across devices.

Key tasks included:
• Navbar with centered logo and responsive hamburger menu for mobile
• Banner, content sections, and CTA blocks exactly as per design
• Responsive layout using media queries for mobile and tablet
• Clean and maintainable HTML & CSS code structure

This project demonstrates the ability to translate UI designs into frontend code while keeping responsiveness and design accuracy in mind. It was part of personal practice and job preparation.`,
  
  image: "/figma-css/figma-main.png", // Replace with actual image if needed
  gallery: [
    "/figma-css/figma-main.png",
    "/figma-css/figma-1.png",
    "/figma-css/figma-2.png",
    "/figma-css/figma-3.png",
  ],
  videoUrl: "/figma-css/figmatocss.mp4", 
  videoType: "mp4",
  technologies: [
    "HTML5",
    "CSS3",
    "Responsive Design",
    "Media Queries",
    "Figma"
  ],
  github: "https://github.com/Jigar9978/Figma-to-responsive-homepage", 
  live: "", 
  category: "Frontend Web",
  duration: "2 days",
  team: "Solo Project",
  status: "Completed",
  year: "2025",
  featured: true,
  challenges: [
    "Creating accurate layout from Figma for all screen sizes",
    "Building responsive navbar with hamburger functionality",
    "Aligning typography and spacing as per design",
    "Maintaining responsiveness without using frameworks"
  ],
  features: [
    "Responsive Home Page from Figma design",
    "Pixel-perfect navbar with logo and hamburger menu",
    "Optimized layout for desktop, tablet, and mobile",
    "Clean, well-structured HTML & CSS code",
    "No external libraries used for layout – pure CSS"
  ],
},

]
