module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "home-hero":
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./src/assets/workshop.jpg')",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
        transform: "transform",
        opacity: "opacity",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#8B4513",    // Saddle Brown - rich wood color
          secondary: "#F4EBD0",  // Soft cream - light wood tone
          accent: "#228B22",     // Forest Green - representing forest/plants
          neutral: "#5E503F",    // Dark brown - for text and details
          background: "#FAF3E0", // Beige - warm, light background
          "primary-content": "#FFFFFF", // White - for text on primary color
          
          // Keeping all other values the same
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
      {
        dark: {
          primary: "#2C3E50",    // Dark slate blue - deep forest at night
          secondary: "#34495E",  // Darker slate blue - for contrast
          accent: "#27AE60",     // Emerald green - forest foliage
          neutral: "#ECF0F1",    // Light grayish blue - for text
          background: "#1C2833", // Very dark blue - night sky
        
          "primary-content": "#FFFFFF", // White - for text on primary color
          "highlight": "#E67E22",       // Deep orange - for highlights and headings

          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
};

/*
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",


*/
