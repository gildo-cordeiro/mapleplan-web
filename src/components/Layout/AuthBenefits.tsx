import React from 'react'
import { LucideLeaf as MapleLeaf, Lock, ArrowRight } from 'lucide-react'

export const AuthBenefits: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col justify-center space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-lg p-2">
            <MapleLeaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Maple Plan</h1>
        </div>
        <p className="text-muted-foreground text-lg font-medium">Immigration Management for Couples</p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary/20">
              <MapleLeaf className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Coordinated Planning</h3>
            <p className="text-sm text-muted-foreground">Manage your immigration journey together as a couple</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary/20">
              <Lock className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">Your sensitive immigration documents are protected</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary/20">
              <ArrowRight className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Track Progress</h3>
            <p className="text-sm text-muted-foreground">Monitor every step of your Canadian immigration process</p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">Trusted by couples across the world in their journey to Canada</p>
      </div>
    </div>
  )
}

export default AuthBenefits
