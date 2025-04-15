'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, Heart, ArrowRight, Sparkles } from 'lucide-react';

const Landing = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--primary)_0%,_transparent_50%)] opacity-20 animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--accent)_0%,_transparent_50%)] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--secondary)_0%,_transparent_50%)] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
            
            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-16">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Student Diary
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <Button 
                            variant="ghost" 
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => router.push('/signin')}
                        >
                            Sign In
                        </Button>
                        <Button 
                            className="button-animate"
                            onClick={() => router.push('/signup')}
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </header>

               

                {/* Footer */}
                <footer className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">
                            Made with love by Lucky Choudhary, Sujal Purohit and Hardik Jain
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
