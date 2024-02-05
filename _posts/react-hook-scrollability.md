---
title: 'Building a Custom React Hook for Scroll Detection'
slug: 'custom-scroll-detection-react'
excerpt: "Let's get to work on a custom React Hook for detecting scrolling."
category: 'react'
datetime: '2024-02-05'
---

# Building a Custom React Hook for Scroll Detection

Recently, we faced a feature request for a project, we needed to display a
scroll icon when a fixed-height div element had scrollable content and hide the
icon when there was no scrollable content. Moreover, the content within the div
could change as the user navigated through different steps of the page.

To achieve this, we built a custom React Hook for scroll detection. Here's a
step by step breakdown of how we built the hook.

## 1. Setup and Imports

The hook uses `useEffect`, `useState`, `useCallback`, and `useRef` from the
React library, and a polyfill for the `ResizeObserver` to ensure compatibility
with older browsers.

```jsx
import { useEffect, useState, useCallback, useRef } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
```

## 2. Defining scrollability Interface

We defined an interface `Scrollability` to determine the scrolling state of the
element. It will have three properties: `scrollable`, `startOfScroll`, and
`endOfScroll`.

```typescript
export interface Scrollability {
  scrollable: boolean;
  startOfScroll: boolean;
  endOfScroll: boolean;
}
```

## 3. Creating the Hook

We began by declaring a reference to an HTML element using `useRef`. This will
host the target (the div element) we are observing. We also set an initial state
for `scrollStatus` to store the scrolling state.

```typescript
const ref = useRef<T | null>(null);
const endOfScroll = useState<Scrollability>({
  scrollable: false,
  startOfScroll: false,
  endOfScroll: false,
});
```

## 4. Define the Callback

We created a function named `updateScrollStatus`. This function will update
`scrollStatus` based on the current state of the referenced element.

```jsx
const updateScrollStatus = useCallback(() => {
  if (ref.current) {
    setScrollStatus({
      scrollable: ref.current.scrollHeight > ref.current.clientHeight,
      startOfScroll: ref.current.scrollTop === 0,
      endOfScroll:
        Math.ceil(ref.current.scrollTop + ref.current.clientHeight) >=
        ref.current.scrollHeight,
    });
  }
}, [ref]);
```

## 5. UseEffect Hooks

We use three `useEffect` hooks to watch for changes in the scrolling
status. First `useEffect` initializes the `ResizeObserver` to detect any size
change of the observed target. The `second` one adds an event listener to listen
for the scroll event of the element. The `third` one invokes the
`updateScrollStatus` function after a slight delay to ensure the initial state
is correct.

```jsx
// First useEffect
useEffect(() => {
  const updateWithRAF = () =>
    window.requestAnimationFrame(() =>
      window.setTimeout(() => updateScrollStatus()),
    );

  if (!ref.current) return;

  const resizeObserver = new ResizeObserver(updateWithRAF);
  resizeObserver.observe(ref.current);
  return () => resizeObserver.disconnect();
}, [ref, updateScrollStatus]);

// Second useEffect
useEffect(() => {
  const current = ref.current;

  if (current) {
    current.addEventListener('scroll', updateScrollStatus);
    return () => current.removeEventListener('scroll', updateScrollStatus);
  }
}, [updateScrollStatus]);

// Third useEffect
useEffect(() => {
  const timer = setTimeout(updateScrollStatus, 125);
  return () => clearTimeout(timer);
}, [updateScrollStatus]);
```

## 6. Return from the Hook

The custom hook will return the reference to the HTML element and its
corresponding scroll state. Any component can use this custom hook to know its
own scroll state and respond accordingly.

```jsx
return [ref, scrollStatus];
```

With the `useScrollability` hook, we were able to strategically control the
appearance of the scroll icon based on user interaction. We hope this
walkthrough helps you understand how custom hooks can provide robust solutions
to specific UI/UX needs.

## 7. Example

```jsx
import { useScrollability } from './useScrollability';

const ScrollableComponent = () => {
  const [ref, scrollStatus] = useScrollability();

  return (
    <div ref={ref} style={{ height: '300px', overflow: 'auto' }}>
      <div style={{ height: '2000px' }}>
        {/* Replace this with your actual content */}
        Scrollable Content
      </div>
      {scrollStatus.scrollable && !scrollStatus.endOfScroll && (
        <button
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          onClick={() => {
            if (ref.current) {
              ref.current.scrollTop = 0;
            }
          }}
        >
          Scroll Back to Top
        </button>
      )}
    </div>
  );
};

export default ScrollableComponent;
```
