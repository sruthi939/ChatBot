export const Users = [
    {
        id: 1,
        name: "Alexander Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander",
        status: "online",
        lastMessage: "How can I improve my productivity?",
        timestamp: "10:30 AM",
        unreadCount: 0
    },
    {
        id: 2,
        name: "Sophia Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
        status: "online",
        lastMessage: "Explain quantum computing",
        timestamp: "Yesterday",
        unreadCount: 3
    },
    {
        id: 3,
        name: "Liam Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
        status: "online",
        lastMessage: "Write a python code",
        timestamp: "Yesterday",
        unreadCount: 0
    },
    {
        id: 4,
        name: "Olivia Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
        status: "offline",
        lastMessage: "Best book recommendations",
        timestamp: "May 20",
        unreadCount: 5
    }
];

export const Messages = [
    {
        id: 1,
        sender: "bot",
        text: "Hello! 👋 How can I help you today?",
        timestamp: "10:30 AM"
    },
    {
        id: 2,
        sender: "user",
        text: "How can I improve my productivity?",
        timestamp: "10:31 AM"
    },
    {
        id: 3,
        sender: "bot",
        text: "Sure! Here are some tips to improve your productivity:\n\n• Prioritize your tasks\n• Use a planner or to-do list\n• Avoid multitasking\n• Take regular breaks\n• Stay organized\n\nWould you like me to explain any of these?",
        timestamp: "10:31 AM"
    },
    {
        id: 4,
        sender: "user",
        text: "Yes, explain avoiding multitasking.",
        timestamp: "10:32 AM",
        status: "read"
    },
    {
        id: 5,
        sender: "bot",
        text: "Multitasking can reduce efficiency and increase mistakes. Focus on one task at a time to get better results in less time.",
        timestamp: "10:33 AM"
    }
];

export const NavigationItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'new-chat', label: 'New Chat', icon: 'PlusSquare' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'Bookmark' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
];
