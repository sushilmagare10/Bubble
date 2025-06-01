import React from 'react'
import { Card, CardContent } from '../ui/card'

const NoPosts = () => {
    return (
        <Card className="border-border/70 bg-card/50 rounded-xl shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-medium text-foreground">
                        No posts yet
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Add new friends to see their posts in your feed, or create your first post to get started.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default NoPosts