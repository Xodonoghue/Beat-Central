import StreamLabsLogo from "../assets/streamlabs-logo.png";
import BroadcastlyLogo from "../assets/broadcastly-logo.png";
import LiveStreamerLogo from "../assets/livestreamer-logo.png";
import CloudCastLogo from "../assets/cloudcast-logo.png";

import streamImage from "../assets/streamer.jpeg";
import chart from "../assets/chart.png";
import optimize from "../assets/optimize.jpeg";
import audienceEngagementImage from "../assets/audience.jpeg";
import monetizeImage from "../assets/monetize.jpeg";
import automationImage from "../assets/automation.jpeg";
import user1 from "../assets/user1.jpeg";
import user2 from "../assets/user2.jpeg";
import user3 from "../assets/user3.jpeg";
import user4 from "../assets/user4.jpeg";
import user5 from "../assets/user5.jpeg";
import user6 from "../assets/user6.jpeg";

import {
  RiInstagramLine,
  RiMoneyDollarBoxFill,
  RiYoutubeLine,
  RiStore3Line,
} from "@remixicon/react";

export const HERO_CONTENT = {
  badgeText: "🚀 New Feature: Stream Analytics 2.0 Now Live!",
  mainHeading: "The Easiest Way \n To Sell Beats",
  subHeading:
    "Upload tracks one time and have them distributed to your store, YouTube, and across your various social media platforms",
  callToAction: {
    primary: "Start For Free",
    secondary: "View Plans",
  },
  trustedByText: "Trusted by Leading Streaming Brands & Creators",
};

export const BRAND_LOGOS = [
  { src: StreamLabsLogo, alt: "StreamLabs" },
  { src: BroadcastlyLogo, alt: "Broadcastly" },
  { src: LiveStreamerLogo, alt: "LiveStreamer" },
  { src: CloudCastLogo, alt: "CloudCast" },
];

export const HOW_IT_WORKS_CONTENT = {
  sectionTitle: "How it works!",
  sectionDescription:
    "Stream like a pro with our 6-step process. From setup to performance tracking, we've got everything you need to elevate your streaming experience.",
  steps: [
    {
      title: "Set Up Your Streaming Environment",
      description:
        "Easily configure your streaming environment with our user-friendly tools. Connect to Twitch, YouTube, and more in minutes.",
      imageSrc: streamImage,
      imageAlt: "Streaming Setup",
    },
    {
      title: "Engage with Your Audience",
      description:
        "Interact with your audience in real-time through custom alerts, chat overlays, and live notifications.",
      imageSrc: audienceEngagementImage,
      imageAlt: "Audience Engagement",
      users: [user1, user2, user3, user5],
    },
    {
      title: "Track and Analyze Performance",
      description:
        "Monitor your stream’s performance in real-time with detailed analytics and viewer engagement insights.",
      imageSrc: chart,
      imageAlt: "Performance Analytics",
    },
    {
      title: "Optimize Your Stream Settings",
      description:
        "Fine-tune your stream settings for optimal performance, ensuring smooth streams even during high traffic.",
      imageSrc: optimize,
      imageAlt: "Optimize Settings",
    },
    {
      title: "Monetize Your Streams",
      description:
        "Unlock revenue streams by adding subscriptions, donations, and sponsorships to your stream.",
      imageSrc: monetizeImage,
      imageAlt: "Monetization",
    },
    {
      title: "Automate Your Workflows",
      description:
        "Use advanced automation tools to manage your schedule, alerts, and promotions effortlessly.",
      imageSrc: automationImage,
      imageAlt: "Workflow Automation",
    },
  ],
};

export const KEY_FEATURES_CONTENT = {
  sectionTitle: "Features That Help You Make More Selling Beats",
  sectionDescription:
    "We offer a variety of features to help you get more people to buy your beats.",
  features: [
    {
      id: 1,
      icon: <RiStore3Line className="w-8 h-8" color="white"/>,
      title: "Personalized Beat Store",
      description:
        "Your own personal store to list all your beats beats, communicate with customers when necessary and make sales.",
    },
    {
      id: 2,
      icon: <RiMoneyDollarBoxFill className="w-8 h-8" color="white"/>,
      title: "Keep 100% of Your Sales",
      description:
        "You do 100% of the work to make and sell your instrumentals, so you keep 100% of the money from everything that you sell.",
    },
    {
      id: 3,
      icon: <RiYoutubeLine className="w-8 h-8" color="white"/>,
      title: "Automatic YouTube Posts",
      description:
        "After uploading beats to Beat Central you can automate the process of posting them to YouTube saving yourself hours while still driving traffic to your store.",
    },
    {
      id: 4,
      icon: <RiInstagramLine className="w-8 h-8" color="white"/>,
      title: "Automatic Social Media Posts",
      description:
        "Automate social media posts promoting your music on platforms like Instagram & TikTok to get more visitors to your store with the same amount of work.",
    },
  ],
};

export const PLANS_CONTENT = {
  sectionTitle: "Choose Your Plan",
  sectionDescription:
    "Whether your just getting started or looking to take things to the next level we have a plan for you.",
  popularBadge: "Most Popular",
  ctaText: "Get Started",
  plans: [
    {
      name: "Basic",
      price: "Free",
      description:
        "Perfect for producers just starting their journey making money online.",
      features: [
        "20 Uploads",
        "Automatic YouTube Uploads",
        "Automatic YouTube Uploads",
        "Automatic Social Media Uploads",
      ],
    },
    {
      name: "Pro",
      price: "$9.99/month",
      description:
        "For producers looking to put out beats consistently",
      features: [
        "Unlimited uploads",
        "Automatic YouTube Uploads",
        "Automatic YouTube Uploads",
        "Automatic Social Media Uploads",
      ],
      popular: true,
    },
  ],
};

export const TESTIMONIALS_CONTENT = {
  sectionTitle: "What Our Streamers Say",
  sectionDescription:
    "Hear from some of the top streamers who use Streamerzz to engage with their audience and grow their channels.",
  reviews: [
    {
      name: "Alice Johnson",
      title: "Content Creator",
      review:
        "Streamerzz has revolutionized the way we manage our content subscriptions. The intuitive dashboard and real-time analytics have made it easier to track our progress and optimize our offerings. Highly recommended!",
      image: user1,
    },
    {
      name: "Bob Smith",
      title: "Marketing Specialist",
      review:
        "The team at Streamerzz has been fantastic! Their support is responsive and knowledgeable. The platform itself is versatile and has helped us streamline our subscription management, saving us time and increasing efficiency.",
      image: user2,
    },
    {
      name: "Carla Mendes",
      title: "Product Manager",
      review:
        "Streamerzz's automated billing and comprehensive analytics have been game-changers for our product team. We can now easily track user engagement and make data-driven decisions to enhance our service offerings.",
      image: user3,
    },
    {
      name: "David Lee",
      title: "Customer Success Manager",
      review:
        "Using Streamerzz, we’ve been able to increase our customer retention rates. The platform's user-friendly interface and powerful features have provided our customers with a seamless experience, leading to higher satisfaction.",
      image: user4,
    },
    {
      name: "Ella Fernandez",
      title: "UX Designer",
      review:
        "Streamerzz's flexibility and ease of use have made it a key tool in our design process. We can quickly adjust our subscription plans and monitor the impact on user engagement, allowing for a more responsive approach.",
      image: user5,
    },
    {
      name: "Frank Wilson",
      title: "Data Analyst",
      review:
        "Streamerzz provides us with detailed insights into our subscription metrics. The advanced reporting tools have enabled us to identify trends and make informed decisions to optimize our growth strategy.",
      image: user6,
    },
  ],
};

export const FOOTER_CONTENT = {
  sections: [
    {
      title: "TOOLS & SERVICES",
      links: [
        { text: "Real-time Analytics", url: "#" },
        { text: "Customizable Alerts", url: "#" },
        { text: "Integrated Chat Systems", url: "#" },
        { text: "Instant Notifications", url: "#" },
        { text: "Overlays & Visuals", url: "#" },
        { text: "Mobile Streaming Support", url: "#" },
        { text: "4K Stream Capabilities", url: "#" },
        { text: "Stream Scheduling Tool", url: "#" },
      ],
    },
    {
      title: "SUPPORT & RESOURCES",
      links: [
        { text: "Subscription Plans", url: "#" },
        { text: "Affiliate Program", url: "#" },
        { text: "Frequently Asked Questions", url: "#" },
        { text: "Company Blog", url: "#" },
        { text: "Subscribe to Newsletter", url: "#" },
        { text: "Latest Features", url: "#" },
        { text: "Merchandise Store", url: "#" },
        { text: "Workshops & Events", url: "#" },
      ],
    },
    {
      title: "CONNECT WITH US",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Facebook", url: "#" },
        { text: "TikTok", url: "#" },
        { text: "LinkedIn", url: "#" },
        { text: "YouTube", url: "#" },
        { text: "Twitch", url: "#" },
        { text: "Discord", url: "#" },
      ],
    },
    {
      title: "LEARN & EXPLORE",
      links: [
        { text: "Engage Viewers with Custom Alerts", url: "#" },
        { text: "Top Streaming Strategies for New Streamers", url: "#" },
        { text: "How to Stream in 4K for Maximum Quality", url: "#" },
        { text: "Efficient Stream Scheduling Techniques", url: "#" },
        { text: "Using Analytics to Boost Engagement", url: "#" },
        { text: "Create Stunning Overlays for Streams", url: "#" },
        { text: "Advanced Analytics for Streamers: A Guide", url: "#" },
      ],
    },
  ],
  platformsText:
    "Streaming Platforms | Twitch | YouTube | Discord | Facebook Gaming",
  copyrightText: "© 2024 Streamerzz, Inc. All rights reserved.",
};