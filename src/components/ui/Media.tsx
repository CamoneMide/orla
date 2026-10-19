import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ImageSlot } from "@/content/types";

/**
 * Every image on the site lives at /public/orla-product-images/<key>.webp
 * (`pnpm images` converts anything dropped there), so a content module only
 * ever names a key and an alt. The files are uncropped masters; `object-cover`
 * does the slot crop.
 *
 * `quality` must be one of `images.qualities` in next.config.ts or Next coerces
 * it to the nearest allowed value. Raise it only where fine grain is the
 * subject — the optimizer's default 75 smooths the felt swatches.
 */
export function Media({
  slot,
  width,
  height,
  className,
  imgClassName,
  priority,
  sizes,
  quality,
}: {
  slot: ImageSlot;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-faint", className)}>
      <Image
        src={`/orla-product-images/${slot.key}.webp`}
        alt={slot.alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes ?? "(max-width: 900px) 100vw, 50vw"}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
