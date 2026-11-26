import { useState } from 'react';
import { cn } from '@/lib/utils';

type ProductImageProps = {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

export default function ProductImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  return (
    <div className={cn('product-photo-frame overflow-hidden', className)}>
      {showPlaceholder ? (
        <div
          className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-sm px-4 text-center"
          role="img"
          aria-label={alt || 'Image unavailable'}
        >
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={600}
          height={600}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn('h-full w-full object-contain', imgClassName)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
