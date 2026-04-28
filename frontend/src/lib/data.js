export const Users = [
    {
        id: 1,
        name: "AI Assistant",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Bot1",
        status: "online",
        lastMessage: "Multitasking can reduce efficiency...",
        timestamp: "10:33 AM",
        unreadCount: 0,
        messages: [
            { id: 1, sender: "bot", text: "Hello! 👋 How can I help you today?", timestamp: "10:30 AM" },
            { id: 2, sender: "user", text: "How can I improve my productivity?", timestamp: "10:31 AM" },
            { id: 3, sender: "bot", text: "Sure! Here are some tips to improve your productivity:\n\n• Prioritize your tasks\n• Use a planner or to-do list\n• Avoid multitasking\n• Take regular breaks\n• Stay organized", timestamp: "10:31 AM" },
            { id: 4, sender: "user", text: "Yes, explain avoiding multitasking.", timestamp: "10:32 AM" },
            { id: 5, sender: "bot", text: "Multitasking can reduce efficiency and increase mistakes. Focus on one task at a time to get better results in less time.", timestamp: "10:33 AM" }
        ]
    },
    {
        id: 2,
        name: "Code Expert",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Code",
        status: "online",
        lastMessage: "The requested Python script is ready.",
        timestamp: "Yesterday",
        unreadCount: 3,
        messages: [
            { id: 1, sender: "user", text: "Can you write a python script for web scraping?", timestamp: "Yesterday" },
            { id: 2, sender: "bot", text: "Certainly! I'll use BeautifulSoup for this task. What's the target URL?", timestamp: "Yesterday" },
            { id: 3, sender: "bot", text: "The requested Python script is ready.", timestamp: "Yesterday" }
        ]
    },
    {
        id: 3,
        name: "Research Bot",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Research",
        status: "offline",
        lastMessage: "I found 5 relevant papers on Quantum Computing.",
        timestamp: "May 20",
        unreadCount: 0,
        messages: [
            { id: 1, sender: "user", text: "Find recent papers on Quantum Computing.", timestamp: "May 20" },
            { id: 2, sender: "bot", text: "Searching through the archives...", timestamp: "May 20" },
            { id: 3, sender: "bot", text: "I found 5 relevant papers on Quantum Computing.", timestamp: "May 20" }
        ]
    },
    {
        id: 4,
        name: "Design Lead",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
        status: "online",
        lastMessage: "The new UI mockups are looking great!",
        timestamp: "Just now",
        unreadCount: 5,
        messages: [
            { id: 1, sender: "user", text: "Did you see the new dark mode designs?", timestamp: "Just now" },
            { id: 2, sender: "bot", text: "The new UI mockups are looking great!", timestamp: "Just now" }
        ]
    }
];

export const NavigationItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'new-chat', label: 'New Chat', icon: 'SquarePlus' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'Bookmark' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
];

export const Suggestions = [
    "How can I improve my productivity?",
    "Explain quantum computing",
    "Write a python code",
    "Best book recommendations",
    "What is photosynthesis?",
    "How does AI work?",
    "Tips for better sleep",
    "Travel guide for Japan"
];

export const BookmarksList = [
    { title: 'Tips to improve productivity', desc: '• Prioritize your tasks\n• Use a planner or to-do list...', date: 'May 20, 2024' },
    { title: 'Avoiding multitasking', desc: 'Multitasking can reduce efficiency and increase mistakes. Focus on one...', date: 'May 20, 2024' },
    { title: 'Python code example', desc: 'def hello():\n  print("Hello, World!")', date: 'May 19, 2024' }
];
