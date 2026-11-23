# ExamNexus 🚀

ExamNexus is a premium, student-driven initiative dedicated to making university academic resources easily accessible. It serves as a one-stop destination for **Previous Year Questions (PYQs)**, **Notes**, and **Lab Files** across multiple engineering and management branches.

---

## ✨ Features

- **Comprehensive Resource Library** 📚
  - Explore handpicked PYQs, well-organized lecture notes, and lab files.
  - Covers 6 main branches: B.Tech CSE, BCA, B.Com, MBA, B.Tech ECE, and BBA.
- **Premium User Interface** 🎨
  - Stunning modern design with a glassmorphism aesthetic.
  - Smooth micro-animations, staggered reveals, and responsive transitions.
  - Advanced cinematic scroll triggers (using IntersectionObserver).
- **Advanced Filtering System** 🔍
  - Instantly search and filter resources by Branch, Semester, Subject, and Year.
- **User Authentication & Profiles** 🔐
  - Built-in Supabase authentication (Login/Signup).
  - Dedicated Profile dashboard for managing saved files, uploading new resources, and adjusting user settings.
- **Upload Functionality** 📤
  - Allows verified students and faculty to securely upload new study materials, keeping the repository up-to-date.
- **Fully Responsive** 📱
  - Meticulously optimized across all breakpoints (Laptops, Tablets, and Mobile phones).

---

## 🛠️ Technology Stack

- **Frontend core**: HTML5, Vanilla JavaScript, CSS3
- **Design system/Styling**: Custom CSS Variables, Flexbox, CSS Grid, Advanced CSS Animations/Transitions
- **Backend & Database**: Supabase (PostgreSQL), Supabase Auth API
- **Icons & Typography**: Font Awesome 6.x, Google Fonts (Space Grotesk, Inter)

---

## 📂 Project Structure

```text
📁 project-3/
│
├── index.html          # Landing page & Hero section
├── about.html          # About Us page, Mission, and Platform Stats
├── branches.html       # Overview of all 6 branches and sub-topics
├── pyqs.html           # Previous Year Questions filter and repo
├── resources.html      # Study notes and lab files repository
├── contact.html        # Contact form and FAQs
├── login.html          # User authentication (Login)
├── signup.html         # User registration (Signup)
├── profile.html        # User Dashboard (Settings, Saved Items, Uploads)
│
├── style.css           # Global stylesheet & Core design system
├── auth.css            # Specialized styling for auth and profile pages
│
├── script.js           # Core frontend logic (Filters, Nav, Animations)
├── auth.js             # Authentication routing, Session handling (Supabase integration)
│
└── README.md           # This documentation map
```

---

## 🚀 How to Run Locally

You do not need a complex build pipeline to run ExamNexus locally. Because it uses Vanilla JS, HTML, and CSS, it can be tested very easily:

1. **Clone or Download** the repository to your local machine.
2. **Open `index.html`** in your favorite browser.
   - _Alternately, use a tool like **Live Server** in VS Code for a better local development experience (which resolves any potential CORS issues with browser `file://` protocols)._
3. **Configure Supabase** (Optional, for backend/auth editing):
   - Update `SUPABASE_URL` and `SUPABASE_KEY` inside `auth.js` to point to your designated Supabase backend bucket.

---

## 🖌️ Design System Highlights

ExamNexus uses a strict CSS variable methodology for maintaining a sophisticated dark-mode aesthetic:

- **Primary Colors**: Deep space blues (`#0a0e1a`) and premium midnight navy (`#141b2d`).
- **Gradient Accents**: Custom multi-stop linear gradients combining Cyan (`#00d4ff`), Purple (`#7b61ff`), and Pink (`#ff6b9d`).
- **Glassmorphism**: Achieved using `backdrop-filter: blur()` paired with layered, translucent `rgba` borders and backgrounds.

---

## 🤝 Contributing

Contributions are always welcome. Whether you're adding new PYQs, updating broken links, or proposing a UI enhancement:

1. Contact the repository maintainers.
2. Make your additions following the existing Vanilla CSS naming conventions.
3. Test layout changes across Mobile (`< 768px`) and Desktop (`> 1024px`) before merging.
