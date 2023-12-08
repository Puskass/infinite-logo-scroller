// InfiniteLogoScroller.js

import React, { useEffect } from "react";
import "./InfiniteLogoScroller.css";

const InfiniteLogoScroller = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    // If a user hasn't opted in for reduced motion, then add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach(addAnimationToScroller);
    }

    function addAnimationToScroller(scroller) {
      // Add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute("data-animated", true);

      // Clone and append elements only if no cloned elements exist
      if (!clonedElementsExist(scroller)) {
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it, add aria-hidden, and append
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    }

    function clonedElementsExist(scroller) {
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const existingClones = Array.from(scrollerInner.children).filter(
        (item) => item.getAttribute("aria-hidden") === "true"
      );

      return existingClones.length > 0;
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1 className="text-center">Infinite Scroll Animation</h1>

      <div className="scroller" data-speed="fast">
        <ul className="tag-list scroller__inner">
          <li>HTML</li>
          <li>CSS</li>
          <li>JS</li>
          <li>SSG</li>
          <li>webdev</li>
          <li>animation</li>
          <li>UI/UX</li>
        </ul>
      </div>

      <div className="scroller" data-direction="right" data-speed="slow">
        <div className="scroller__inner">
          <img src="https://i.pravatar.cc/150?img=1" alt="" />
          <img src="https://i.pravatar.cc/150?img=2" alt="" />
          <img src="https://i.pravatar.cc/150?img=3" alt="" />
          <img src="https://i.pravatar.cc/150?img=4" alt="" />
          <img src="https://i.pravatar.cc/150?img=5" alt="" />
          <img src="https://i.pravatar.cc/150?img=6" alt="" />
        </div>
      </div>
    </div>
  );
};

export default InfiniteLogoScroller;
