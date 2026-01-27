import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    secondaryActionLabel,
    onSecondaryAction,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center py-12 px-4 text-center",
            className
        )}>
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 max-w-md mb-6">{description}</p>
            <div className="flex gap-3">
                {actionLabel && onAction && (
                    <Button
                        onClick={onAction}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                    >
                        {actionLabel}
                    </Button>
                )}
                {secondaryActionLabel && onSecondaryAction && (
                    <Button
                        onClick={onSecondaryAction}
                        variant="outline"
                        className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                    >
                        {secondaryActionLabel}
                    </Button>
                )}
            </div>
        </div>
    );
}
