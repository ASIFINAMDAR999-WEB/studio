
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brush, Globe, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import { Switch } from '../ui/switch';
import { plans } from '@/lib/data';

export function ResellerSettings() {
  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-glow">
      <CardHeader>
        <CardTitle>Reseller Settings</CardTitle>
        <CardDescription>
          Customize your white-labeled service to match your brand.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="branding" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="branding"><Brush className="w-4 h-4 mr-2" />Branding</TabsTrigger>
            <TabsTrigger value="domain"><Globe className="w-4 h-4 mr-2" />Domain</TabsTrigger>
            <TabsTrigger value="pricing"><SlidersHorizontal className="w-4 h-4 mr-2" />Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="branding" className="space-y-6">
            <div className="p-6 border rounded-lg bg-background/50">
                <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="brandName">Brand Name</Label>
                        <Input id="brandName" placeholder="Your Brand Name" defaultValue="REDArmor 2.0" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="relative">
                            <Input id="primaryColor" type="color" defaultValue="#601DE2" className="p-1 h-10" />
                        </div>
                    </div>
                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="logo">Brand Logo</Label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="logo" type="file" className="pl-9" />
                        </div>
                    </div>
                </div>
                 <div className="mt-6 flex justify-end">
                    <Button>Save Branding</Button>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="domain" className="space-y-6">
            <div className="p-6 border rounded-lg bg-background/50">
                <h3 className="text-lg font-semibold mb-4">Custom Domain</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Point your domain to our servers to provide a fully white-labeled experience.
                </p>
                <div className="space-y-2">
                    <Label htmlFor="customDomain">Your Domain</Label>
                    <Input id="customDomain" placeholder="e.g., my.service.com" />
                </div>
                <div className="mt-4 p-4 bg-muted rounded-md text-sm">
                    <p className="font-semibold">Instructions:</p>
                    <p className="text-muted-foreground">
                    1. Go to your domain registrar (e.g., GoDaddy, Namecheap).
                    </p>
                    <p className="text-muted-foreground">
                    2. Create a CNAME record for your desired subdomain.
                    </p>
                    <p className="text-muted-foreground">
                    3. Point it to: <code className="bg-background px-1.5 py-0.5 rounded-sm font-mono text-primary">proxy.redarmor.net</code>
                    </p>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button>Verify & Save Domain</Button>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="pricing" className="space-y-6">
             <div className="p-6 border rounded-lg bg-background/50">
                <h3 className="text-lg font-semibold mb-4">Manage Pricing</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Set your own prices for the plans you offer to your customers. Your profit is the difference between your price and our base price.
                </p>
                <div className="space-y-4">
                    {plans.filter(p => p.name !== 'Silver Plan').map(plan => (
                        <div key={plan.name} className="grid grid-cols-3 items-center gap-4 p-3 bg-muted/50 rounded-md">
                            <Label className="col-span-1">{plan.name}</Label>
                            <div className="col-span-2">
                                <Input type="number" placeholder="Your Price" defaultValue={plan.priceString.replace('$', '')} />
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="mt-6 flex justify-end">
                    <Button>Save Pricing</Button>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
