import * as React from 'react';
import { OnChangeCallback } from './eventManager';
import { ToastContent, ToastOptions, ToastContainerProps, UpdateOptions, ClearWaitingQueueParams } from '../types';
declare const toast: {
    (content: ToastContent, options?: ToastOptions | undefined): React.ReactText;
    success(content: ToastContent, options?: ToastOptions | undefined): React.ReactText;
    info(content: ToastContent, options?: ToastOptions | undefined): React.ReactText;
    error(content: ToastContent, options?: ToastOptions | undefined): React.ReactText;
    warning(content: ToastContent, options?: ToastOptions | undefined): React.ReactText;
    dark(content: ToastContent, options?: ToastOptions | undefined): React.ReactText;
    /**
     * Maybe I should remove warning in favor of warn, I don't know
     */
    warn: (content: ToastContent, options?: ToastOptions | undefined) => React.ReactText;
    /**
     * Remove toast programmaticaly
     */
    dismiss(id?: string | number | undefined): false | void;
    /**
     * Clear waiting queue when limit is used
     */
    clearWaitingQueue(params?: ClearWaitingQueueParams): false | void;
    /**
     * return true if one container is displaying the toast
     */
    isActive(id: React.ReactText): boolean;
    update(toastId: React.ReactText, options?: UpdateOptions): void;
    /**
     * Used for controlled progress bar.
     */
    done(id: React.ReactText): void;
    /**
     * Track changes. The callback get the number of toast displayed
     *
     */
    onChange(callback: OnChangeCallback): () => void;
    /**
     * Configure the ToastContainer when lazy mounted
     */
    configure(config?: ToastContainerProps): void;
    POSITION: {
        TOP_LEFT: string;
        TOP_RIGHT: string;
        TOP_CENTER: string;
        BOTTOM_LEFT: string;
        BOTTOM_RIGHT: string;
        BOTTOM_CENTER: string;
    };
    TYPE: {
        INFO: string;
        SUCCESS: string;
        WARNING: string;
        ERROR: string;
        DEFAULT: string;
        DARK: string;
    };
};
export { toast };
