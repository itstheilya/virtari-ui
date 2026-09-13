import { cn } from "../../lib/utils";
import { useEffect, useState, type ReactNode } from "react";
import { Button, type ButtonSize } from "../button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
} from "../drawer";
import type { DatePickerSize } from "./context";

export type MobilePickerPresentation = "drawer" | "dialog";
export type MobilePickerSizeMode = "content" | "full";
export type PickerOverlayMode = "auto" | "popover" | "drawer" | "dialog";
export type PickerDialogSize = "sm" | "md" | "lg" | "xl";

const MOBILE_BREAKPOINT = 42;
const TWO_MONTH_BREAKPOINT: Record<DatePickerSize, number> = {
  "2xs": 34,
  xs: 34,
  sm: 38,
  md: 43,
  lg: 47,
  xl: 51,
  "2xl": 55,
};

export function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}rem)`).matches
      : false,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}rem)`);
    const update = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(query.matches);

    if ("addEventListener" in query) {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }

    const legacyQuery = query as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };
    legacyQuery.addListener?.(update);
    return () => legacyQuery.removeListener?.(update);
  }, []);

  return isMobile;
}

export function useResponsiveCalendarMonthCount(
  size: DatePickerSize,
  forceSingleMonth = false,
): 1 | 2 {
  const breakpoint = TWO_MONTH_BREAKPOINT[size];
  const [hasRoomForTwo, setHasRoomForTwo] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(min-width: ${breakpoint}rem)`).matches
      : true,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia(`(min-width: ${breakpoint}rem)`);
    const update = (event: MediaQueryListEvent) => setHasRoomForTwo(event.matches);
    setHasRoomForTwo(query.matches);

    if ("addEventListener" in query) {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }

    const legacyQuery = query as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };
    legacyQuery.addListener?.(update);
    return () => legacyQuery.removeListener?.(update);
  }, [breakpoint]);

  return forceSingleMonth || !hasRoomForTwo ? 1 : 2;
}

interface PickerActionBarProps {
  onApply: () => void;
  onCancel: () => void;
  applyDisabled?: boolean;
  applyLabel?: ReactNode;
  cancelLabel?: ReactNode;
  buttonSize?: ButtonSize;
  className?: string;
}

export function PickerActionBar({
  onApply,
  onCancel,
  applyDisabled,
  applyLabel = "Apply",
  cancelLabel = "Cancel",
  buttonSize = "md",
  className,
}: PickerActionBarProps) {
  return (
    <div className={cn("vds-picker-action-bar", className)}>
      <Button
        type="button"
        color="contrast"
        variant="soft"
        size={buttonSize}
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>
      <Button
        type="button"
        size={buttonSize}
        onClick={onApply}
        disabled={applyDisabled}
      >
        {applyLabel}
      </Button>
    </div>
  );
}

interface MobilePickerSurfaceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  leadingAction?: ReactNode;
  trailingAction?: ReactNode;
  presentation?: MobilePickerPresentation;
  sizeMode?: MobilePickerSizeMode;
  /** Dialog size when `presentation === "dialog"` and `sizeMode !== "full"`.
   * Controls how wide the desktop dialog renders. */
  dialogSize?: PickerDialogSize;
  className?: string;
  bodyClassName?: string;
  footerClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function MobilePickerSurface({
  open,
  onOpenChange,
  title,
  description,
  leadingAction,
  trailingAction,
  presentation = "drawer",
  sizeMode = "content",
  dialogSize = "sm",
  className,
  bodyClassName,
  footerClassName,
  children,
  footer,
}: MobilePickerSurfaceProps) {
  if (presentation === "dialog") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          size={sizeMode === "full" ? "full" : dialogSize}
          responsive
          backdrop="blur"
          className={cn("vds-picker-mobile-surface", "vds-picker-mobile-dialog", className)}
          onOpenAutoFocus={(event: Event) => event.preventDefault()}
        >
          <DialogHeader variant="bordered" className="vds-picker-mobile-header">
            <div className="vds-picker-mobile-header-main">
              <div
                className="vds-picker-mobile-header-slot"
                data-slot="leading"
                data-empty={leadingAction ? undefined : "true"}
              >
                {leadingAction}
              </div>
              <div className="vds-picker-mobile-header-copy">
                <DialogTitle className="vds-picker-mobile-header-title">{title}</DialogTitle>
                {description ? (
                  <DialogDescription className="vds-picker-mobile-header-description">
                    {description}
                  </DialogDescription>
                ) : null}
              </div>
              <div
                className="vds-picker-mobile-header-slot"
                data-slot="trailing"
                data-empty={trailingAction ? undefined : "true"}
              >
                {trailingAction}
              </div>
            </div>
          </DialogHeader>
          <DialogBody className={cn("vds-picker-mobile-body", bodyClassName)}>
            {children}
          </DialogBody>
          {footer ? (
            <DialogFooter className={cn("vds-picker-mobile-footer", footerClassName)}>
              {footer}
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
      sizeMode={sizeMode === "full" ? "full" : "adaptive"}
    >
      <DrawerContent
        className={cn("vds-picker-mobile-surface", "vds-picker-mobile-drawer", className)}
        onOpenAutoFocus={(event: Event) => event.preventDefault()}
      >
        <DrawerHandle />
        <DrawerHeader variant="bordered" className="vds-picker-mobile-header">
          <div className="vds-picker-mobile-header-main">
            <div
              className="vds-picker-mobile-header-slot"
              data-slot="leading"
              data-empty={leadingAction ? undefined : "true"}
            >
              {leadingAction}
            </div>
            <div className="vds-picker-mobile-header-copy">
              <DrawerTitle className="vds-picker-mobile-header-title">{title}</DrawerTitle>
              {description ? (
                <DrawerDescription className="vds-picker-mobile-header-description">
                  {description}
                </DrawerDescription>
              ) : null}
            </div>
            <div
              className="vds-picker-mobile-header-slot"
              data-slot="trailing"
              data-empty={trailingAction ? undefined : "true"}
            >
              {trailingAction}
            </div>
          </div>
        </DrawerHeader>
        <DrawerBody className={cn("vds-picker-mobile-body", bodyClassName)}>
          {children}
        </DrawerBody>
        {footer ? (
          <DrawerFooter className={cn("vds-picker-mobile-footer", footerClassName)}>
            {footer}
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
