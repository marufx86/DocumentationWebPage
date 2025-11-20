import { Info } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";
import { MediaEmbed } from "./MediaEmbed";
import type { DocStep as DocStepType } from "@/data/documentation";

interface DocStepProps {
  step: DocStepType;
  stepNumber: number;
}

export function DocStep({ step, stepNumber }: DocStepProps) {
  return (
    <div className="mb-8 scroll-mt-20" id={step.id}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
          {stepNumber}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            {step.title}
          </h3>
          <div className="prose prose-slate dark:prose-invert max-w-none 
            prose-headings:text-foreground prose-headings:font-bold
            prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
            prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
            prose-p:text-foreground/90 prose-p:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded 
            prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-sm
            prose-li:text-foreground/90 prose-li:leading-relaxed prose-li:my-1
            prose-ol:space-y-2 prose-ul:space-y-2
            prose-ul:list-disc prose-ul:ml-6
            prose-ol:list-decimal prose-ol:ml-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{step.content}</ReactMarkdown>
            
            {step.code && (
              <div className="my-4">
                <CodeBlock code={step.code} />
              </div>
            )}

            {step.media?.image && (
              <MediaEmbed src={step.media.image} type="image" caption={step.media.caption} />
            )}

            {step.media?.images && step.media.images.map((img, idx) => (
              <MediaEmbed key={idx} src={img} type="image" caption={step.media.caption} />
            ))}

            {step.media?.video && (
              <MediaEmbed src={step.media.video} type="video" caption={step.media.caption} />
            )}

            {step.media?.youtubeUrl && (
              <MediaEmbed src={step.media.youtubeUrl} type="youtube" caption={step.media.caption} />
            )}
            
            {step.note && (
              <div className="flex gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg mt-4">
                <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80">{step.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
