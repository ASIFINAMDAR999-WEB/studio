
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Loader2, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface EmailSpoofScreenProps {
  planName: string;
}

export function EmailSpoofScreen({ planName }: EmailSpoofScreenProps) {
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fromName, fromEmail, toEmail, subject, message }),
        });

        const result = await response.json();

        if (response.ok) {
            toast({
                title: "Success",
                description: result.message || "Your email has been sent successfully.",
            });
            // Clear the form on success
            setFromName('');
            setFromEmail('');
            setToEmail('');
            setSubject('');
            setMessage('');
        } else {
            throw new Error(result.error || 'An unknown error occurred.');
        }
    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message || "Failed to send email. Please try again.",
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };

  const isFormInvalid = !fromName || !fromEmail || !toEmail || !subject || !message;

  return (
    <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
    >
        <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
            <CardTitle className="text-xl text-center">Email Spoofing Tool</CardTitle>
             {planName && (
                <CardDescription className="text-center pt-2">
                    <div className="flex justify-center items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-primary" />
                        Active Plan:
                        <span className="text-primary font-bold">{planName}</span>
                    </div>
                </CardDescription>
            )}
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="from-name">From Name</Label>
                <Input
                    id="from-name"
                    placeholder="e.g., Support Team"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    disabled={isLoading}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="from-email">From Email (Reply-To)</Label>
                <Input
                    id="from-email"
                    type="email"
                    placeholder="e.g., support@example.com"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    disabled={isLoading}
                    required
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="to-email">To Email</Label>
                <Input
                id="to-email"
                type="email"
                placeholder="recipient@domain.com"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                disabled={isLoading}
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                id="subject"
                placeholder="Regarding your account"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isLoading}
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-[120px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                required
                />
            </div>
            <Button type="submit" className="w-full group" disabled={isLoading || isFormInvalid}>
                {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                </>
                ) : (
                <>
                    Send Email
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
                )}
            </Button>
            </form>
        </CardContent>
        </Card>
    </motion.div>
  );
}
