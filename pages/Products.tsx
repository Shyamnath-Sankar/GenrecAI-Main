import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import {
    Cpu,
    Database,
    Smartphone,
    Server,
    FileSpreadsheet,
    ShoppingBag,
    GraduationCap,
    Globe,
    ArrowUpRight,
    CheckCircle2
} from 'lucide-react';
import { SEO } from '../components/SEO';

// --- DATA ---
const services = [
    {
        id: "ai-websites",
        title: "AI-Integrated Websites",
        description: "Stunning websites powered by intelligent algorithms, featuring 3D models, parallax effects, and dynamic content adaptation.",
        features: ["3D WebGL Integration", "Smart Content Adaptation", "Parallax Animations", "AI-Driven UX"],
        icon: Globe,
        color: "bg-blue-500",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop"
    },
    {
        id: "crm-systems",
        title: "Intelligent CRM Systems",
        description: "Next-generation customer relationship management with predictive analytics and automated workflows.",
        features: ["Predictive Analytics", "Automated Workflows", "Smart Dashboards", "Real-time Insights"],
        icon: Database,
        color: "bg-emerald-500",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "data-science",
        title: "Data Science MVPs",
        description: "Rapid prototyping of machine learning solutions with custom pipelines and predictive models.",
        features: ["Custom ML Models", "Data Pipelines", "Predictive Analytics", "Real-time Processing"],
        icon: Cpu,
        color: "bg-purple-500",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "mobile-apps",
        title: "AI-Powered Mobile Apps",
        description: "React Native and Flutter applications with sensor integration and offline-first architecture.",
        features: ["Cross-Platform", "Sensor Integration", "Offline Sync", "Push Notifications"],
        icon: Smartphone,
        color: "bg-orange-500",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "web-services",
        title: "Web Services & APIs",
        description: "Scalable microservices architecture with REST/GraphQL APIs and Kubernetes deployment.",
        features: ["Microservices", "Auto-Scaling", "API Gateway", "Monitoring"],
        icon: Server,
        color: "bg-cyan-500",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop"
    },
    {
        id: "zen-analyzer",
        title: "Zen Analyzer",
        description: "Upload CSV/Excel files and get AI-driven insights, summaries, and interactive Q&A capabilities.",
        features: ["Natural Language Queries", "Chart Generation", "Data Export", "Interactive Analysis"],
        icon: FileSpreadsheet,
        color: "bg-pink-500",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
        id: "ecommerce",
        title: "Smart E-commerce",
        description: "Headless storefronts with AI personalization, AR product previews, and intelligent recommendations.",
        features: ["AI Personalization", "AR Previews", "Smart Recommendations", "Headless Architecture"],
        icon: ShoppingBag,
        color: "bg-indigo-500",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "educational-ai",
        title: "Educational AI",
        description: "Adaptive learning platforms with AI tutors, anonymous feedback systems, and progress tracking.",
        features: ["Adaptive Learning", "AI Tutoring", "Progress Analytics", "Anonymous Feedback"],
        icon: GraduationCap,
        color: "bg-teal-500",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2670&auto=format&fit=crop"
    }
];

// --- COMPONENTS ---

const Card = ({
    item,
    index,
    range,
    targetScale
}: {
    item: typeof services[0],
    index: number,
    range: [number, number],
    targetScale: number
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(scrollYProgress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
            <motion.div
                style={{
                    scale,
                    top: `calc(5vh + ${index * 25}px)`
                }}
                className="flex flex-col relative -top-[25%] h-[500px] md:h-[600px] w-full max-w-6xl rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden origin-top"
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        style={{ scale: imageScale }}
                        className="w-full h-full"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover opacity-10 dark:opacity-20 transition-opacity duration-500 hover:opacity-20 dark:hover:opacity-30"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white/50 to-transparent dark:from-zinc-900 dark:via-zinc-900/80 dark:to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="relative z-20 grid md:grid-cols-2 gap-12 h-full items-center">
                    <div className="flex flex-col justify-center h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-3 rounded-xl ${item.color} bg-opacity-10 text-${item.color.split('-')[1]}-500`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                                0{index + 1} / 0{services.length}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white leading-[0.9] tracking-tight">
                            {item.title}
                        </h2>

                        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {item.description}
                        </p>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm md:text-base text-zinc-500 font-mono">
                                    <CheckCircle2 className="w-4 h-4 text-nothing-red shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Decorative Number */}
                <div className="absolute -bottom-20 -right-20 text-[20rem] font-bold text-zinc-100 dark:text-zinc-900/50 z-10 pointer-events-none select-none font-glitch opacity-50">
                    {index + 1}
                </div>
            </motion.div>
        </div>
    );
};

export const Products = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={container} className="relative bg-zinc-50 dark:bg-black min-h-screen">
            <SEO
                title="Service Portfolio"
                description="Comprehensive digital solutions ranging from AI-Integrated Websites to Intelligent CRM Systems and Data Science MVPs."
            />

            {/* Featured Grid Section */}
            <div className="min-h-screen flex flex-col justify-center px-6 py-20 relative z-20 bg-white dark:bg-black">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto max-w-7xl"
                >
                    <h1 className="text-sm font-mono font-bold text-nothing-red mb-8 tracking-widest uppercase mb-12">
                        // SELECTED HIGHLIGHTS
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-auto md:h-[80vh]">
                        {services.slice(0, 4).map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 aspect-video md:aspect-auto"
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>

                                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`p-2 rounded-lg ${item.color} bg-opacity-20 backdrop-blur-sm`}>
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xs font-mono text-zinc-300 border border-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                                            PROJECT 0{index + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>
                                    <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                                        <p className="text-zinc-300 text-sm md:text-base pt-2">{item.description}</p>
                                    </div>
                                </div>

                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight className="w-6 h-6 text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center mt-12 md:mt-16"
                    >
                        <p className="text-zinc-500 text-sm font-mono animate-bounce">
                            SCROLL TO EXPLORE FULL PORTFOLIO
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Stacking Cards */}
            <div className="relative z-10 mb-[50vh] mt-[10vh]">
                {services.map((item, index) => {
                    const targetScale = 1 - ((services.length - index) * 0.05);
                    return (
                        <Card
                            key={index}
                            item={item}
                            index={index}
                            range={[index * 0.1, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>

            {/* Bottom CTA */}
            <div className="h-[50vh] flex items-center justify-center relative z-20 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Build?</h2>
                    <a href="/contact" className="inline-block bg-nothing-red text-white px-12 py-6 font-bold text-lg hover:bg-black transition-colors skew-x-[-10deg]">
                        <span className="skew-x-[10deg] block">START PROJECT</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
