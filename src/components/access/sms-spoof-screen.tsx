
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function SmsSpoofScreen() {
  const [fromNumber, setFromNumber] = useState('');
  const [toNumber, setToNumber] = useState('');
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
        description: "This is a demo. No SMS has been sent.",
      });
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
            <CardTitle className="text-xl text-center">SMS Spoofing Tool</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="from-number">From Number</Label>
                <Input
                    id="from-number"
                    placeholder="Sender's number"
                    value={fromNumber}
                    onChange={(e) => setFromNumber(e.target.value)}
                    disabled={isLoading}
                    type="tel"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="to-number">To Number</Label>
                <Input
                    id="to-number"
                    type="tel"
                    placeholder="Recipient's number"
                    value={toNumber}
                    onChange={(e) => setToNumber(e.target.value)}
                    disabled={isLoading}
                    required
                />
                </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                id="message"
                placeholder="Type your SMS here..."
                className="min-h-[120px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                />
            </div>
            <Button type="submit" className="w-full group" disabled={isLoading || !toNumber || !fromNumber || !message}>
                {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                </>
                ) : (
                <>
                    Send SMS
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
