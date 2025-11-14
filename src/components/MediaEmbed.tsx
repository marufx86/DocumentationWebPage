interface MediaEmbedProps {
  src: string;
  alt?: string;
  type: 'image' | 'video' | 'youtube';
  caption?: string;
}

export function MediaEmbed({ src, alt, type, caption }: MediaEmbedProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  if (type === 'image') {
    return (
      <figure className="my-6">
        <img 
          src={src} 
          alt={alt || 'Documentation image'} 
          className="rounded-lg border border-border w-full h-auto shadow-sm"
          loading="lazy"
        />
        {caption && (
          <figcaption className="text-sm text-muted-foreground mt-2 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (type === 'youtube') {
    return (
      <figure className="my-6">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border shadow-sm">
          <iframe
            src={getYouTubeEmbedUrl(src)}
            title={alt || 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        {caption && (
          <figcaption className="text-sm text-muted-foreground mt-2 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (type === 'video') {
    return (
      <figure className="my-6">
        <video 
          src={src} 
          controls 
          className="rounded-lg border border-border w-full h-auto shadow-sm"
        >
          Your browser does not support the video tag.
        </video>
        {caption && (
          <figcaption className="text-sm text-muted-foreground mt-2 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
}
