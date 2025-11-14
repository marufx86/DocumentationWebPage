import { Info } from "lucide-react";
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
          <div className="prose prose-slate max-w-none">
            <p className="text-foreground/90 leading-relaxed mb-4">{step.content}</p>
            
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
