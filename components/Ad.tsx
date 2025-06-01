import Image from 'next/image'
import React from 'react'
import { MoreHorizontal, ExternalLink } from "lucide-react";
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
    return (
        <Card className="group bg-card/50 backdrop-blur-sm border border-border/70 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-border/80">
            <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 pb-3">
                    <span className="text-xs font-medium text-muted-foreground">
                        Sponsored
                    </span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted/50">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </Button>
                </div>

                {/* Image */}
                <div className="px-4 pb-4">
                    <div
                        className={`relative w-full rounded-xl overflow-hidden bg-muted/30 ${
                            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
                        }`}
                    >
                        <Image
                            src="/macbook.webp"
                            alt="MacBook M3"
                            fill
                            className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4 space-y-3">
                    <h3 className="font-semibold text-foreground text-sm">
                        MacBook M3
                    </h3>
                    
                    <p className={`text-muted-foreground leading-relaxed ${
                        size === "sm" ? "text-xs" : "text-sm"
                    }`}>
                        {size === "sm"
                            ? "Experience the power of Apple's latest M3 chip."
                            : size === "md"
                                ? "Experience the power of Apple's latest M3 chip with incredible performance and battery life."
                                : "Experience the power of Apple's latest M3 chip with incredible performance, stunning display, and all-day battery life. Perfect for professionals and creators."}
                    </p>

                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3 h-8 text-xs gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                        Learn More
                        <ExternalLink className="w-3 h-3" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Ad