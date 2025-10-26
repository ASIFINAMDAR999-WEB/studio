
'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function EmailSpoofScreen() {
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Demonstration",
        description: "This is a demo. No email has been sent.",
      });
      // Reset form if needed
      // setFromName('');
      // setFromEmail('');
      // setToEmail('');
      // setSubject('');
      // setMessage('');
    }, 1500);
  };

  return (
    <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
    >
        <Card className="bg-card/80 backdrop-blur-sm border-none shadow-none">
        <CardHeader>
            <CardTitle className="text-xl text-center">Email Spoofing Tool</CardTitle>
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
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="from-email">From Email</Label>
                <Input
                    id="from-email"
                    type="email"
                    placeholder="e.g., support@example.com"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    disabled={isLoading}
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
                />
            </div>
            <Button type="submit" className="w-full group" disabled={isLoading || !toEmail}>
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
