import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface TermsDialogProps {
  termsTitle: string;
  triggerText: string;
  className?: string;
}

export default function TermsDialog({
  termsTitle,
  children,
  triggerText,
  className,
}: React.PropsWithChildren<TermsDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p
          className={
            className || 'text-sm text-blue-500 underline cursor-pointer hover:text-blue-600'
          }
        >
          {triggerText}
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{termsTitle}</DialogTitle>
        </DialogHeader>
        <div className="mb-8 prose md:prose-lg prose-headings:font-extrabold prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-headings:text-gray-900 prose-a:font-medium prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-2 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:text-gray-900 prose-strong:font-bold prose-strong:text-gray-900 prose-code:rounded prose-code:bg-transparent prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-gray-900 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:border prose-pre:border-gray-700 prose-pre:bg-gray-900 prose-blockquote:xl:-ml-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
