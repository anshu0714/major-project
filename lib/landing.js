import { Bell, CreditCard, PieChart, Receipt, Users } from "lucide-react";

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#plans", label: "Plans" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export const FEATURES = [
  {
    title: "Organized Group Spending",
    Icon: Users,
    bg: "bg-teal-100",
    color: "text-teal-500",
    description:
      "Set up groups for events, travel, or roommates to manage expenses in one place.",
  },
  {
    title: "Optimized Settlements",
    Icon: CreditCard,
    bg: "bg-green-100",
    color: "text-teal-600",
    description:
      "Our smart system reduces the number of transactions needed to settle balances.",
  },
  {
    title: "Spending Insights",
    Icon: PieChart,
    bg: "bg-teal-100",
    color: "text-teal-500",
    description:
      "Visualize how money is spent across groups and spot trends easily.",
  },
  {
    title: "Automated Reminders",
    Icon: Bell,
    bg: "bg-amber-100",
    color: "text-amber-600",
    description:
      "Get notified about due payments and track your spending over time.",
  },
  {
    title: "Flexible Splitting Options",
    Icon: Receipt,
    bg: "bg-teal-100",
    color: "text-green-500",
    description:
      "Divide bills equally, by percentages, or enter specific amounts as needed.",
  },
  {
    title: "Live Syncing",
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 14v8M15 14v8M9 2v6M15 2v6" />
      </svg>
    ),
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Instantly see updates as friends add expenses or mark payments.",
  },
];

export const STEPS = [
  {
    label: "1",
    title: "Start or Join a Group",
    description:
      "Create a group for your activity and invite others to collaborate on expenses.",
  },
  {
    label: "2",
    title: "Log Expenses",
    description:
      "Note down who paid and how the cost should be shared among participants.",
  },
  {
    label: "3",
    title: "Clear Balances",
    description: "Check outstanding dues and record payments as they’re made.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Splitzy makes expense sharing super easy. No confusion, no stress—just a clear way to keep things fair.",
    name: "Ananya Sharma",
    image: "/profile.png",
    role: "Marketing Manager",
  },
  {
    quote:
      "Used Splitzy on a group trip—everything was smooth. Everyone knew what they owed and paid on time.",
    name: "Karan Mehta",
    image: "/profile.png",
    role: "Travel Blogger",
  },
  {
    quote:
      "Living with roommates got easier thanks to Splitzy. No more arguments over bills or forgotten payments.",
    name: "Neha Patel",
    image: "/profile.png",
    role: "Graduate Student",
  },
];

export const STATS = [
  { label: "Users", value: "12,000+" },
  { label: "Groups Created", value: "3,800+" },
  { label: "Expenses Tracked", value: "₹2.5 Cr+" },
];

export const FAQS = [
  {
    question: "Is Splitzy free to use?",
    answer:
      "Yes! Splitzy is completely free for individuals and small groups. All features are available at no cost, and we plan to keep the core experience free for everyone.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Your privacy and security are our top priorities. We use strong encryption and follow best practices to ensure your data is safe and never shared with third parties.",
  },
  {
    question: "How reliable is Splitzy?",
    answer:
      "Splitzy is built on modern, reliable infrastructure to provide fast, seamless expense tracking and notifications. We continuously monitor and improve our systems to ensure smooth performance.",
  },
  {
    question: "Can I use Splitzy for business or teams?",
    answer:
      "Absolutely! Many small teams and groups use Splitzy to manage shared expenses and recurring costs. If you have specific needs, we’re happy to hear your feedback.",
  },
  {
    question: "How does Splitzy keep me updated?",
    answer:
      "Splitzy automates email-reminder daily so you never miss an update or payment. This helps keep your group finances transparent and hassle-free.",
  },
];
