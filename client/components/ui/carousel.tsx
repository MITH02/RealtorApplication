import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styled from "@emotion/styled";

import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const StyledCarousel = styled.div`
  position: relative;
`;

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    { orientation = "horizontal", opts, setApi, plugins, children, ...props },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <StyledCarousel
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </StyledCarousel>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContentWrapper = styled.div`
  overflow: hidden;
`;

const StyledCarouselContent = styled.div<{
  orientation: "horizontal" | "vertical";
}>`
  display: flex;

  ${(props) =>
    props.orientation === "horizontal" &&
    `
    margin-left: -1rem;
  `}

  ${(props) =>
    props.orientation === "vertical" &&
    `
    margin-top: -1rem;
    flex-direction: column;
  `}
`;

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const { carouselRef, orientation = "horizontal" } = useCarousel();

  return (
    <CarouselContentWrapper ref={carouselRef}>
      <StyledCarouselContent ref={ref} orientation={orientation} {...props} />
    </CarouselContentWrapper>
  );
});
CarouselContent.displayName = "CarouselContent";

const StyledCarouselItem = styled.div<{
  orientation: "horizontal" | "vertical";
}>`
  min-width: 0;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 100%;

  ${(props) =>
    props.orientation === "horizontal" &&
    `
    padding-left: 1rem;
  `}

  ${(props) =>
    props.orientation === "vertical" &&
    `
    padding-top: 1rem;
  `}
`;

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const { orientation = "horizontal" } = useCarousel();

  return (
    <StyledCarouselItem
      ref={ref}
      role="group"
      aria-roledescription="slide"
      orientation={orientation}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const StyledCarouselButton = styled(Button)<{
  orientation: "horizontal" | "vertical";
  direction: "previous" | "next";
}>`
  position: absolute;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;

  ${(props) =>
    props.orientation === "horizontal" &&
    props.direction === "previous" &&
    `
    left: -3rem;
    top: 50%;
    transform: translateY(-50%);
  `}

  ${(props) =>
    props.orientation === "horizontal" &&
    props.direction === "next" &&
    `
    right: -3rem;
    top: 50%;
    transform: translateY(-50%);
  `}

  ${(props) =>
    props.orientation === "vertical" &&
    props.direction === "previous" &&
    `
    top: -3rem;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  `}

  ${(props) =>
    props.orientation === "vertical" &&
    props.direction === "next" &&
    `
    bottom: -3rem;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  `}

  svg {
    height: 1rem;
    width: 1rem;
  }

  span {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ variant = "outline", size = "icon", ...props }, ref) => {
  const {
    orientation = "horizontal",
    scrollPrev,
    canScrollPrev,
  } = useCarousel();

  return (
    <StyledCarouselButton
      ref={ref}
      variant={variant}
      size={size}
      orientation={orientation}
      direction="previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span>Previous slide</span>
    </StyledCarouselButton>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ variant = "outline", size = "icon", ...props }, ref) => {
  const {
    orientation = "horizontal",
    scrollNext,
    canScrollNext,
  } = useCarousel();

  return (
    <StyledCarouselButton
      ref={ref}
      variant={variant}
      size={size}
      orientation={orientation}
      direction="next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span>Next slide</span>
    </StyledCarouselButton>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
