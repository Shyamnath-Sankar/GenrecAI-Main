import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

export const Privacy = () => {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <SEO title="Privacy Policy" description="Genrec AI Privacy Policy. We respect your data." />
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
                    <p className="text-zinc-500 mb-12">Last Updated: November 4, 2025</p>

                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-bold mb-4">Key Priorities</h3>
                        <ul className="space-y-4 list-disc pl-5 mb-8 text-zinc-600 dark:text-zinc-400">
                            <li>
                                <strong>Data Respect:</strong> We respect your privacy and only collect information necessary for service improvement.
                            </li>
                            <li>
                                <strong>Cookie Usage:</strong> We use cookies solely to enhance your browsing experience.
                            </li>
                            <li>
                                <strong>No Third-Party Sales:</strong> We do not sell your personal data to third parties. Ever.
                            </li>
                            <li>
                                <strong>Security First:</strong> We adopt industry-standard secure storage practices to protect your data.
                            </li>
                        </ul>
                        <p className="text-zinc-500">
                            For any questions regarding this policy, please contact us at <a href="mailto:contact@genrecai.com" className="text-nothing-red underline">contact@genrecai.com</a>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
