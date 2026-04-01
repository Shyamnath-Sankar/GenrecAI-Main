import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Satellite, Radio, CheckCircle, AlertCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';

interface FormData {
    name: string;
    email: string;
    company: string;
    message: string;
}

const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false
}: {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative group">
            <label className={`text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${focused ? 'text-nothing-red' : 'text-zinc-500'}`}>
                {label} {required && <span className="text-nothing-red">*</span>}
            </label>
            <div className="relative mt-2">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-4 font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-700/30 focus:outline-none focus:border-nothing-red transition-all duration-500"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                <div className={`absolute bottom-0 left-0 w-2 h-[1px] bg-nothing-red transition-all duration-300 ${focused ? 'w-full' : 'w-0'}`} />
            </div>
        </div>
    );
};

export const Contact = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            const { error } = await supabase
                .from('contacts')
                .insert({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company || null,
                    message: formData.message
                });

            if (error) throw error;

            setStatus('sent');
            setFormData({ name: '', email: '', company: '', message: '' });

            // Reset after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: any) {
            console.error('Error submitting contact form:', error);
            setStatus('error');
            setErrorMessage('Failed to send message. Please try again.');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <SEO
                title="Contact Us"
                description="Initiate uplink with Genrec AI. Direct engineering collaboration for your most critical projects."
            />

            <div className="container mx-auto px-6 max-w-7xl pt-12 pb-20">
                <div className="grid md:grid-cols-12 gap-12 min-h-[70vh]">

                    {/* Left Column: Transmission Form */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                        <div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 mb-12"
                            >
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                CHANNEL: OPEN
                            </motion.div>

                            <form onSubmit={handleSubmit} className="space-y-12 max-w-xl relative">
                                <div className="grid md:grid-cols-2 gap-12">
                                    <InputField
                                        label="Identity // Name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputField
                                        label="Frequency // Email"
                                        name="email"
                                        type="email"
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <InputField
                                    label="Station // Company"
                                    name="company"
                                    placeholder="Your Company (Optional)"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                                <div className="relative group">
                                    <label className="text-xs font-mono tracking-widest uppercase text-zinc-500">
                                        Transmission // Message <span className="text-nothing-red">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        placeholder="Describe your directive..."
                                        className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-4 font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-700/30 focus:outline-none focus:border-nothing-red transition-colors duration-500 resize-none mt-2"
                                    />
                                </div>

                                {/* Error Message */}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-red-500 text-sm font-mono"
                                    >
                                        <AlertCircle size={16} />
                                        {errorMessage}
                                    </motion.div>
                                )}

                                {/* Success Message */}
                                {status === 'sent' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-emerald-500 text-sm font-mono"
                                    >
                                        <CheckCircle size={16} />
                                        Message received! We'll get back to you soon.
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="group relative px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase overflow-hidden w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={status === 'sending' || status === 'sent'}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {status === 'idle' && (
                                            <>INITIATE UPLINK <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                        )}
                                        {status === 'sending' && (
                                            <>TRANSMITTING <Radio className="w-4 h-4 animate-spin" /></>
                                        )}
                                        {status === 'sent' && (
                                            <>RECEIVED <CheckCircle className="w-4 h-4" /></>
                                        )}
                                        {status === 'error' && (
                                            <>RETRY <Send className="w-4 h-4" /></>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-nothing-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                                </motion.button>
                            </form>
                        </div>

                        <div className="mt-20 grid grid-cols-2 md:grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                            <div>
                                <h4 className="font-bold mb-2 flex items-center gap-2"><Mail className="w-4 h-4 text-nothing-red" /> COMM</h4>
                                <p className="text-sm text-zinc-500">contact@genrecai.com</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2 flex items-center gap-2"><Phone className="w-4 h-4 text-nothing-red" /> WIRE</h4>
                                <p className="text-sm text-zinc-500">Mon-Fri, 09:00 - 18:00 IST</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Feedback */}
                    <div className="hidden md:flex md:col-span-5 relative flex-col justify-between bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-12 overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        {/* Abstract Radar Visual */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <div className="w-[600px] h-[600px] border border-zinc-500 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute w-[400px] h-[400px] border border-zinc-500 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="absolute w-[200px] h-[200px] border border-zinc-500/50 rounded-full animate-pulse" />
                            <div className="absolute w-2 h-2 bg-nothing-red rounded-full" />
                            <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-nothing-red to-transparent origin-left animate-[spin_4s_linear_infinite]" />
                        </div>

                        <div className="relative z-10">
                            <Satellite className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-8" />
                            <h3 className="text-3xl font-bold mb-4">Signal Strength</h3>
                            <div className="flex gap-1 h-12 items-end">
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: "20%" }}
                                        animate={{ height: ["20%", "80%", "40%"] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.5,
                                            delay: i * 0.1,
                                            repeatType: "reverse"
                                        }}
                                        className={`w-3 rounded-sm ${i > 5 ? 'bg-nothing-red' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 font-mono text-xs text-zinc-500 space-y-2">
                            <p>{`> ENCRYPTION: AES-256`}</p>
                            <p>{`> ROUTING: DIRECT`}</p>
                            <p>{`> LATENCY: <50ms`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
